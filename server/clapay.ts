import crypto from "node:crypto";

export const CLAPAY_COUNTRY_CODES = [
  "DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG",
  "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW",
  "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "YT", "MA", "MZ", "NA",
  "NE", "NG", "RE", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD",
  "SZ", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW",
] as const;

export type ClapayCountryCode = (typeof CLAPAY_COUNTRY_CODES)[number];
export type ClapayMethod = "MERCHANT" | "CASHIN";
export const CLAPAY_API_BASE = "https://nw-api.clapay.app/nowallet/api/v3";

export interface ClapayOperator {
  name: string;
  codeoperator: string;
  active: boolean;
  code?: Record<string, unknown>;
  otpstarter?: Record<string, unknown>;
  [key: string]: unknown;
}

export class ClapayApiError extends Error {
  constructor(message: string, readonly status: number, readonly providerRejected: boolean) {
    super(message);
    this.name = "ClapayApiError";
  }
}

export function isClapayCountry(value: string): value is ClapayCountryCode {
  return (CLAPAY_COUNTRY_CODES as readonly string[]).includes(value.trim().toUpperCase());
}

export function isClapayConfigured() {
  return Boolean(process.env.CLAPAY_API_TOKEN?.trim());
}

export function isClapayWebhookConfigured() {
  return Boolean(
    process.env.CLAPAY_WEBHOOK_SECRET?.trim() &&
    process.env.CLAPAY_WEBHOOK_UNIQUE_KEY?.trim(),
  );
}

function getApiToken() {
  const token = process.env.CLAPAY_API_TOKEN?.trim();
  if (!token) throw new Error("Clapay n'est pas configuré : CLAPAY_API_TOKEN est manquante.");
  return token;
}

export function getClapayWebhookSecrets() {
  const secret = process.env.CLAPAY_WEBHOOK_SECRET?.trim();
  const uniqueKey = process.env.CLAPAY_WEBHOOK_UNIQUE_KEY?.trim();
  if (!secret || !uniqueKey) {
    throw new Error("Les secrets webhook Clapay ne sont pas configurés sur le serveur.");
  }
  return { secret, uniqueKey };
}

async function clapayRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${CLAPAY_API_BASE}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getApiToken()}`,
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
      signal: init.signal || AbortSignal.timeout(20_000),
    });
  } catch {
    throw new ClapayApiError("Clapay est momentanément inaccessible.", 0, false);
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && typeof payload === "object"
      ? String((payload as Record<string, unknown>).message || (payload as Record<string, unknown>).error || "")
      : "";
    throw new ClapayApiError(
      message || `Erreur HTTP ${response.status} renvoyée par Clapay.`,
      response.status,
      response.status >= 400 && response.status < 500,
    );
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ClapayApiError("Réponse Clapay invalide.", response.status, false);
  }
  const result = payload as Record<string, unknown>;
  const logicalStatus = Number(result.statusCode ?? result.status_code);
  if (Number.isFinite(logicalStatus) && logicalStatus >= 400) {
    throw new ClapayApiError(
      String(result.message || result.error || "Clapay a refusé la requête."),
      logicalStatus,
      true,
    );
  }
  return result as T;
}

function normalizeOperator(value: unknown) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function isProviderBoolean(value: unknown) {
  return value === true || value === 1 || String(value || "").trim().toLowerCase() === "true";
}

const CLAPAY_OPERATOR_ALIASES: Record<string, string[]> = {
  MYNITA: ["mynita", "nita", "nitatransfert"],
  AMANATA: ["amanata", "amana", "amanatransfert"],
  ZAMANI: ["zamani"],
  WAVE: ["wave"],
  OM: ["orange", "orangemoney", "orange money"],
  MTN: ["mtn"],
  MOOV: ["moov"],
  TMONEY: ["tmoney", "togocel", "t money"],
  TELECEL: ["telecel"],
  AIRTEL: ["airtel"],
  AIRTELTIGO: ["airteltigo"],
  VODAFONE: ["vodafone"],
  TIGO: ["tigo"],
  HALOTEL: ["halotel"],
  SAFARICOM: ["safaricom"],
  MPS: ["mps", "mpesa"],
  FREEMONEY: ["freemoney"],
  EMONEY: ["emoney"],
  WIZALL: ["wizall"],
};

export function mapConfiguredClapayOperator(
  localOperator: string,
  providerOperators: ClapayOperator[],
  method: ClapayMethod = "MERCHANT",
): ClapayOperator | undefined {
  const local = normalizeOperator(localOperator);
  if (!local) return undefined;
  const providerOperator = providerOperators.find((operator) => {
    if (!operator.active || !operator.codeoperator) return false;
    const methodCode = operator.code?.[method];
    if (!operator.code || !(method in operator.code)) return false;
    if (
      methodCode === undefined ||
      methodCode === null ||
      methodCode === false ||
      !String(methodCode).trim() ||
      String(methodCode).trim().toLowerCase() === "none"
    ) return false;
    const code = String(operator.codeoperator).trim().toUpperCase();
    const aliases = CLAPAY_OPERATOR_ALIASES[code] || [code.toLowerCase()];
    return aliases.some((alias) => {
      const normalizedAlias = normalizeOperator(alias);
      return normalizedAlias && (
        local === normalizedAlias ||
        local.includes(normalizedAlias) ||
        normalizedAlias.includes(local)
      );
    });
  });
  return providerOperator;
}

export function filterConfiguredClapayOperators(
  configuredOperators: string[],
  providerOperators: ClapayOperator[],
  method: ClapayMethod = "MERCHANT",
) {
  const found = new Map<string, { id: string; name: string; requiresOtp: boolean }>();
  for (const localName of configuredOperators) {
    const provider = mapConfiguredClapayOperator(localName, providerOperators, method);
    if (!provider || found.has(provider.codeoperator)) continue;
    found.set(provider.codeoperator, {
      id: provider.codeoperator,
      name: localName,
      requiresOtp: isProviderBoolean(provider.otpstarter?.[method]),
    });
  }
  return Array.from(found.values());
}

function unwrapList(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  for (const key of ["data", "operators", "countries", "result"]) {
    if (Array.isArray(record[key])) return record[key] as unknown[];
    if (record[key] && typeof record[key] === "object") {
      const nested = record[key] as Record<string, unknown>;
      if ("codeoperator" in nested || "code" in nested) return [nested];
      if ("country_code" in nested || "phone_length" in nested || "phoneLength" in nested) return [nested];
    }
  }
  return "codeoperator" in record || "code" in record ? [record] : [];
}

export async function clapayGetCountryData(country: string): Promise<Record<string, unknown>> {
  const normalized = country.trim().toUpperCase();
  if (!isClapayCountry(normalized)) throw new Error("Pays non pris en charge par Clapay.");
  const result = await clapayRequest<unknown>(`/countries/data?country=${encodeURIComponent(normalized)}`);
  const countryData = unwrapList(result).find((entry) =>
    entry && typeof entry === "object" &&
    String(
      (entry as Record<string, unknown>).code ||
      (entry as Record<string, unknown>).country_code ||
      (entry as Record<string, unknown>).countryCode ||
      "",
    ).toUpperCase() === normalized,
  );
  if (countryData) return countryData as Record<string, unknown>;
  if (String(
    (result as Record<string, unknown>).code ||
    (result as Record<string, unknown>).country_code ||
    (result as Record<string, unknown>).countryCode ||
    "",
  ).toUpperCase() === normalized) {
    return result as Record<string, unknown>;
  }
  throw new Error("Clapay ne reconnaît pas ce pays pour ce compte.");
}

export async function clapayGetOperators(country: string): Promise<ClapayOperator[]> {
  const normalized = country.trim().toUpperCase();
  if (!isClapayCountry(normalized)) throw new Error("Pays non pris en charge par Clapay.");
  const result = await clapayRequest<unknown>(`/operators/data?country=${encodeURIComponent(normalized)}`);
  return unwrapList(result).flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const record = entry as Record<string, unknown>;
    if (typeof record.codeoperator !== "string" || typeof record.name !== "string") return [];
    return [{
      ...record,
      code: record.code && typeof record.code === "object" ? record.code as Record<string, unknown> : {},
      otpstarter: record.otpstarter && typeof record.otpstarter === "object"
        ? record.otpstarter as Record<string, unknown>
        : {},
      active: isProviderBoolean(record.active),
      codeoperator: record.codeoperator.trim().toUpperCase(),
    } as ClapayOperator];
  });
}

export function normalizeClapayPhone(phone: string, dialCode: string, expectedLength?: number) {
  let digits = phone.trim().replace(/\D/g, "");
  const dial = dialCode.replace(/\D/g, "");
  if (digits.startsWith(dial) && digits.length > dial.length) digits = digits.slice(dial.length);
  if (expectedLength && digits.startsWith("0") && digits.length === expectedLength + 1) {
    digits = digits.slice(1);
  }
  if (!/^\d{6,12}$/.test(digits)) throw new Error("Numéro Mobile Money invalide.");
  if (expectedLength && digits.length !== expectedLength) {
    throw new Error(`Le numéro doit contenir ${expectedLength} chiffres après l’indicatif du pays.`);
  }
  return digits;
}

export function validateClapayPaymentUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      !url.hostname.includes(".") ||
      url.hostname === "localhost"
    ) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export async function clapayInitiatePayment(payload: Record<string, unknown>) {
  return clapayRequest<Record<string, any>>("/init/payment", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function clapayCheckStatus(signature: string) {
  if (!signature.trim() || signature.length > 250) throw new Error("Signature de paiement invalide.");
  return clapayRequest<Record<string, any>>("/check/status/payment", {
    method: "POST",
    body: JSON.stringify({ signature }),
  });
}

export async function clapayGetBalance(country: string) {
  const normalized = country.trim().toUpperCase();
  if (!isClapayCountry(normalized)) throw new Error("Pays non pris en charge par Clapay.");
  return clapayRequest<Record<string, any>>(
    `/check/transactions/single/balances/${encodeURIComponent(normalized)}`,
  );
}

export function mapClapayStatus(value: unknown): "approved" | "rejected" | "pending" {
  const status = String(value || "").trim().toUpperCase().replace(/[\s-]+/g, "_");
  if (["SUCCESS", "SUCCESSFUL", "COMPLETED", "APPROVED"].includes(status)) return "approved";
  if (["FAILED", "REJECTED", "CANCELLED", "CANCELED", "EXPIRED", "CLOSED", "SIGNATURE_DESTROYED"].includes(status)) {
    return "rejected";
  }
  return "pending";
}

export function verifyClapayWebhookSignature(
  body: unknown,
  header: unknown,
  secret: string,
  uniqueKey: string,
): boolean {
  if (typeof header !== "string" || !secret || !uniqueKey) return false;
  const keyMatch = header.match(/(?:^|,)\s*key\s*=\s*([^,]+)/i);
  if (!keyMatch) return false;
  const signatures = header.split(",")
    .map((part) => part.trim().match(/^signature\s*=\s*([a-f\d]{64})$/i)?.[1].toLowerCase())
    .filter((signature): signature is string => Boolean(signature));
  if (!signatures.length) return false;

  const encryptedKey = crypto.createHmac("sha256", uniqueKey).update(keyMatch[1].trim()).digest("hex");
  const payload = encryptedKey + JSON.stringify(body);
  const expected = crypto.createHmac("sha256", secret).update(payload).digest();
  return signatures.some((signature) => {
    const received = Buffer.from(signature, "hex");
    return received.length === expected.length && crypto.timingSafeEqual(received, expected);
  });
}
