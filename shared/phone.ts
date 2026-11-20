/**
 * Returns the canonical Benin national mobile number used by PPayPros.
 * Accepts eight local digits, the national 01 + eight-digit form, or either
 * form with Benin's 229 country code.
 */
export function normalizeBeninPhone(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;

  let digits = String(value).replace(/\D/g, "");
  if (digits.startsWith("00229")) digits = digits.slice(5);
  else if (digits.startsWith("229")) digits = digits.slice(3);

  if (/^\d{8}$/.test(digits)) return `01${digits}`;
  if (/^01\d{8}$/.test(digits)) return digits;
  return null;
}

export const PPAYPROS_COUNTRY_CODES = ["BJ", "TG", "CI", "BF", "CM"] as const;

function stripInternationalPrefix(digits: string, dialCode: string, nationalLength: number): string {
  if (digits.startsWith(`00${dialCode}`) && digits.length > nationalLength + 2) {
    return digits.slice(dialCode.length + 2);
  }
  if (digits.startsWith(dialCode) && digits.length > nationalLength) {
    return digits.slice(dialCode.length);
  }
  return digits;
}

/**
 * Normalizes the customer phone formats documented by PPayPros.
 * Burkina Faso has no country-specific phone format in the published API docs,
 * so only its international dialing prefix is removed.
 */
export function normalizePpayProsPhone(value: unknown, country: string): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const digits = String(value).replace(/\D/g, "");
  const normalizedCountry = country.trim().toUpperCase();

  if (normalizedCountry === "BJ") return normalizeBeninPhone(value);

  if (normalizedCountry === "TG") {
    const national = stripInternationalPrefix(digits, "228", 8);
    return /^\d{8}$/.test(national) ? national : null;
  }

  if (normalizedCountry === "CI") {
    const national = stripInternationalPrefix(digits, "225", 10);
    return /^0\d{9}$/.test(national) ? national : null;
  }

  if (normalizedCountry === "CM") {
    const national = stripInternationalPrefix(digits, "237", 10);
    return (/^[1-9]\d{8}$/.test(national) || /^0\d{9}$/.test(national))
      ? national
      : null;
  }

  if (normalizedCountry === "BF") {
    const national = stripInternationalPrefix(digits, "226", 8);
    return national.length >= 6 && national.length <= 12 ? national : null;
  }

  return null;
}