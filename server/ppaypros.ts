import crypto from "node:crypto";
import {
  normalizeBeninPhone,
  normalizePpayProsPhone,
  PPAYPROS_COUNTRY_CODES,
} from "@shared/phone";

const PPAYPROS_API_BASE = "https://pay.ppaypros.com";
const PPAYPROS_AMOUNT_SCALE = 100;

export interface PpayProsCredentials {
  merchantNo: string;
  appId: string;
  privateKey: string;
}

export type PpayProsCountryCode = typeof PPAYPROS_COUNTRY_CODES[number];

const PPAYPROS_WAY_CODES: Partial<Record<PpayProsCountryCode, string>> = {
  BJ: "850",
  TG: "710",
  CI: "837",
  CM: "890",
};

export interface PpayProsPayinResult {
  payOrderId?: string;
  mchOrderNo?: string;
  payDataType?: string;
  payData?: string;
  orderState?: number | string;
  [key: string]: unknown;
}

export interface PpayProsPayoutResult {
  transferId?: string;
  mchOrderNo?: string;
  state?: number | string;
  [key: string]: unknown;
}

export class PpayProsApiError extends Error {
  constructor(
    message: string,
    readonly providerRejected = false,
  ) {
    super(message);
    this.name = "PpayProsApiError";
  }
}

export function getPpayProsCredentials(country = "BJ"): PpayProsCredentials {
  const normalizedCountry = country.trim().toUpperCase();
  if (!PPAYPROS_COUNTRY_CODES.includes(normalizedCountry as PpayProsCountryCode)) {
    throw new Error(`PPayPros n'est pas configuré pour le pays ${normalizedCountry || "indiqué"}.`);
  }

  const suffix = normalizedCountry;
  const merchantNo = process.env[`PPAYPROS_MCH_NO_${suffix}`]?.trim() ||
    (normalizedCountry === "BJ" ? process.env.PPAYPROS_MCH_NO?.trim() : "") || "";
  const appId = process.env[`PPAYPROS_APP_ID_${suffix}`]?.trim() ||
    (normalizedCountry === "BJ" ? process.env.PPAYPROS_APP_ID?.trim() : "") || "";
  const privateKey = process.env[`PPAYPROS_PRIVATE_KEY_${suffix}`]?.trim() ||
    (normalizedCountry === "BJ" ? process.env.PPAYPROS_PRIVATE_KEY?.trim() : "") || "";
  if (!merchantNo || !appId || !privateKey) {
    throw new Error(
      `PPayPros n'est pas configuré pour ${normalizedCountry} : ajoutez PPAYPROS_MCH_NO_${suffix}, PPAYPROS_APP_ID_${suffix} et PPAYPROS_PRIVATE_KEY_${suffix} dans les Secrets.`,
    );
  }
  return { merchantNo, appId, privateKey };
}

export function getPpayProsWayCode(country: string): string | undefined {
  const normalizedCountry = country.trim().toUpperCase();
  if (!PPAYPROS_COUNTRY_CODES.includes(normalizedCountry as PpayProsCountryCode)) {
    throw new Error(`PPayPros ne prend pas en charge le pays ${normalizedCountry || "indiqué"}.`);
  }
  return PPAYPROS_WAY_CODES[normalizedCountry as PpayProsCountryCode];
}

export function getPpayProsEnabledCountries(settings: Record<string, string>): string[] {
  const configured = settings.ppayprosPayinCountries === undefined
    ? []
    : settings.ppayprosPayinCountries.split(",");
  return Array.from(new Set(configured
    .map((country) => country.trim().toUpperCase())
    .filter((country) => PPAYPROS_COUNTRY_CODES.includes(country as PpayProsCountryCode))));
}

export function isPpayProsPayinEnabledForCountry(
  country: string,
  settings: Record<string, string>,
): boolean {
  const normalizedCountry = country.trim().toUpperCase();
  if (settings.ppayprosPayinEnabled !== "true" ||
      !getPpayProsEnabledCountries(settings).includes(normalizedCountry)) return false;
  return normalizedCountry !== "CI" || settings.ppayprosPayinCiConfirmed === "true";
}

export function isPpayProsPayoutEnabledForCountry(
  country: string,
  settings: Record<string, string>,
): boolean {
  const normalizedCountry = country.trim().toUpperCase();
  if (settings.ppayprosPayoutEnabled !== "true") return false;
  if (normalizedCountry === "BJ") return true;
  if (normalizedCountry === "TG") return settings.ppayprosPayoutTgConfirmed === "true";
  return normalizedCountry === "CI" && settings.ppayprosPayoutCiConfirmed === "true";
}

export function canAdminUpdatePpayProsCountryConfirmation(
  isSuperAdmin: boolean,
  currentValue: string | undefined,
  requestedValue: string,
): boolean {
  return isSuperAdmin || requestedValue === (currentValue ?? "false");
}

export const canAdminUpdatePpayProsPayoutConfirmation =
  canAdminUpdatePpayProsCountryConfirmation;
export const canAdminUpdatePpayProsTgPayoutConfirmation =
  canAdminUpdatePpayProsCountryConfirmation;

const PPAYPROS_CI_PAYOUT_BANK_CODES = [
  { match: /orange/, code: "1" },
  { match: /mtn|momo/, code: "2" },
  { match: /moov/, code: "3" },
  { match: /wave/, code: "6" },
] as const;

export function getPpayProsPayoutAccountCode(country: string, paymentMethod: string): string {
  const normalizedCountry = country.trim().toUpperCase();
  if (normalizedCountry === "CI") {
    const operator = paymentMethod.trim().toLowerCase();
    const bankCode = PPAYPROS_CI_PAYOUT_BANK_CODES.find(({ match }) => match.test(operator))?.code;
    if (!bankCode) {
      throw new Error("L’opérateur de retrait n’a pas de code PPayPros documenté pour la Côte d’Ivoire.");
    }
    return bankCode;
  }
  if (normalizedCountry === "BJ" || normalizedCountry === "TG") return "Bank";
  throw new Error(`Le payout PPayPros n’est pas pris en charge pour ${normalizedCountry || "ce pays"}.`);
}

function signedValueString(params: Record<string, unknown>, privateKey: string): string {
  const fields = Object.entries(params)
    .filter(([key, value]) => key !== "sign" && value !== null && value !== undefined && value !== "")
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([key, value]) => `${key}=${String(value)}`);
  return `${fields.join("&")}&key=${privateKey}`;
}

export function createPpayProsSignature(
  params: Record<string, unknown>,
  privateKey: string,
): string {
  return crypto.createHash("md5").update(signedValueString(params, privateKey), "utf8").digest("hex").toUpperCase();
}

export function verifyPpayProsSignature(
  params: Record<string, unknown>,
  signature: unknown,
  privateKey: string,
): boolean {
  if (typeof signature !== "string" || !/^[a-f\d]{32}$/i.test(signature) || !privateKey) return false;
  const expected = createPpayProsSignature(params, privateKey);
  const expectedBytes = Buffer.from(expected, "hex");
  const receivedBytes = Buffer.from(signature, "hex");
  return receivedBytes.length === expectedBytes.length && crypto.timingSafeEqual(receivedBytes, expectedBytes);
}

export function toPpayProsAmount(amountXof: number): number {
  if (!Number.isSafeInteger(amountXof) || amountXof <= 0) {
    throw new Error("Le montant doit être un nombre entier positif.");
  }
  const scaled = amountXof * PPAYPROS_AMOUNT_SCALE;
  if (!Number.isSafeInteger(scaled)) throw new Error("Montant trop élevé pour PPayPros.");
  return scaled;
}

export function formatPpayProsBeninPhone(phone: string): string {
  const normalized = normalizeBeninPhone(phone);
  if (!normalized) {
    throw new Error("Le numéro du Bénin doit commencer par 01 et contenir 10 chiffres.");
  }
  return normalized;
}

export function formatPpayProsPhone(phone: string, country: string): string {
  const normalized = normalizePpayProsPhone(phone, country);
  if (!normalized) {
    const messages: Record<string, string> = {
      BJ: "Le numéro du Bénin doit commencer par 01 et contenir 10 chiffres.",
      TG: "Le numéro du Togo doit contenir 8 chiffres.",
      CI: "Le numéro de Côte d’Ivoire doit commencer par 0 et contenir 10 chiffres.",
      BF: "Le numéro du Burkina Faso est invalide.",
      CM: "Le numéro du Cameroun doit contenir 9 chiffres sans 0 initial, ou 10 chiffres avec 0 initial.",
    };
    throw new Error(messages[country.trim().toUpperCase()] || "Le numéro de téléphone PPayPros est invalide.");
  }
  return normalized;
}

export function createPpayProsMerchantOrderNo(kind: "payin" | "payout", recordId: number): string {
  if (!Number.isSafeInteger(recordId) || recordId <= 0) throw new Error("Référence de paiement invalide.");
  return `${kind === "payin" ? "PPIN" : "PPOUT"}-${recordId}`;
}

export function parsePpayProsMerchantOrderNo(
  kind: "payin" | "payout",
  value: unknown,
): number | null {
  if (typeof value !== "string") return null;
  const prefix = kind === "payin" ? "PPIN" : "PPOUT";
  const match = value.match(new RegExp(`^${prefix}-(\\d+)$`));
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function parseResponseData(value: unknown): Record<string, unknown> {
  let parsed = value;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      throw new PpayProsApiError("Réponse PPayPros illisible.");
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new PpayProsApiError("Réponse PPayPros sans données exploitables.");
  }
  return parsed as Record<string, unknown>;
}

async function postSigned(
  endpoint: string,
  payload: Record<string, unknown>,
  country = "BJ",
): Promise<Record<string, unknown>> {
  const credentials = getPpayProsCredentials(country);
  const unsigned = {
    ...payload,
    mchNo: credentials.merchantNo,
    appId: credentials.appId,
  };
  const requestBody = {
    ...unsigned,
    sign: createPpayProsSignature(unsigned, credentials.privateKey),
  };

  let response: Response;
  try {
    response = await fetch(`${PPAYPROS_API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error: any) {
    throw new PpayProsApiError(error?.message || "PPayPros est inaccessible.");
  }

  let result: Record<string, unknown>;
  try {
    result = await response.json() as Record<string, unknown>;
  } catch {
    throw new PpayProsApiError(`Réponse PPayPros invalide (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new PpayProsApiError(
      String(result.msg || `Erreur PPayPros HTTP ${response.status}.`),
    );
  }
  if (Number(result.code) !== 0) {
    throw new PpayProsApiError(String(result.msg || "La demande PPayPros a été refusée."), true);
  }

  const data = parseResponseData(result.data);
  if (typeof result.sign === "string" && result.sign &&
      !verifyPpayProsSignature(data, result.sign, credentials.privateKey)) {
    throw new PpayProsApiError("Signature de réponse PPayPros invalide.");
  }
  return data;
}

export async function createPpayProsPayin(params: {
  country: string;
  merchantOrderNo: string;
  amountXof: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notifyUrl: string;
  returnUrl: string;
}): Promise<PpayProsPayinResult> {
  const country = params.country.trim().toUpperCase();
  const customerPhone = formatPpayProsPhone(params.customerPhone, country);
  const data = await postSigned("/api/pay/pay", {
    mchOrderNo: params.merchantOrderNo,
    amount: toPpayProsAmount(params.amountXof),
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    customerPhone,
    wayCode: getPpayProsWayCode(country),
    ...(country === "CI" ? { extParam: customerPhone } : {}),
    notifyUrl: params.notifyUrl,
    returnUrl: params.returnUrl,
  }, country);
  return data as PpayProsPayinResult;
}

export async function createPpayProsPayout(params: {
  country?: string;
  merchantOrderNo: string;
  amountXof: number;
  accountName: string;
  accountNumber: string;
  paymentMethod: string;
  accountPhone: string;
  accountEmail: string;
  notifyUrl: string;
}): Promise<PpayProsPayoutResult> {
  const country = (params.country || "BJ").trim().toUpperCase();
  if (country !== "BJ" && country !== "TG" && country !== "CI") {
    throw new Error("Les retraits PPayPros sont pris en charge uniquement au Bénin, au Togo et en Côte d’Ivoire.");
  }
  const formatPayoutPhone = (phone: string) => country === "BJ"
    ? formatPpayProsBeninPhone(phone)
    : formatPpayProsPhone(phone, country);
  const accountNumber = formatPayoutPhone(params.accountNumber);
  // PPayPros documents BANK_CARD for other countries. Côte d’Ivoire provides
  // wallet-specific account codes; Benin and Togo use the documented Bank fallback.
  const data = await postSigned("/api/payout/pay", {
    mchOrderNo: params.merchantOrderNo,
    amount: toPpayProsAmount(params.amountXof),
    entryType: "BANK_CARD",
    accountNo: accountNumber,
    accountCode: getPpayProsPayoutAccountCode(country, params.paymentMethod),
    accountName: params.accountName,
    accountEmail: params.accountEmail,
    accountPhone: formatPayoutPhone(params.accountPhone),
    notifyUrl: params.notifyUrl,
  }, country);
  return data as PpayProsPayoutResult;
}

export async function queryPpayProsPayout(params: {
  country?: string;
  merchantOrderNo: string;
  transferId?: string | null;
}): Promise<PpayProsPayoutResult> {
  const country = (params.country || "BJ").trim().toUpperCase();
  const data = await postSigned("/api/payout/query", params.transferId
    ? { transferId: params.transferId }
    : { mchOrderNo: params.merchantOrderNo }, country);
  return data as PpayProsPayoutResult;
}