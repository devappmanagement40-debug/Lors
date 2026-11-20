export const DRC_COUNTRY_CODE = "CD";

export const COUNTRY_LIST_SETTING_KEYS = [
  "soleaspayCountries",
  "westpayCountries",
  "ppayprosPayinCountries",
  "ppayprosPayoutCountries",
  "ashtechCountries",
  "drimpayPayinCountries",
  "drimpayPayoutCountries",
  "inpayCountries",
  "clapayPayinCountries",
  "clapayPayoutCountries",
] as const;

export const COUNTRY_SPECIFIC_SETTING_PREFIXES = ["inpayMerchantId_"] as const;
export const NON_DRC_COUNTRY_SETTING_KEYS = [
  "ppayprosPayinCiConfirmed",
  "ppayprosPayoutTgConfirmed",
  "ppayprosPayoutCiConfirmed",
] as const;

export function isDrcCountry(countryCode: string): boolean {
  return countryCode.trim().toUpperCase() === DRC_COUNTRY_CODE;
}

export function keepOnlyDrcCountryCodes(value: string | undefined): string {
  if (!value) return "";
  return Array.from(new Set(
    value.split(",").map((code) => code.trim().toUpperCase()).filter(isDrcCountry),
  )).join(",");
}

export function isNonDrcCountrySettingKey(key: string): boolean {
  return NON_DRC_COUNTRY_SETTING_KEYS.includes(key as typeof NON_DRC_COUNTRY_SETTING_KEYS[number]) ||
    COUNTRY_SPECIFIC_SETTING_PREFIXES.some((prefix) =>
      key.startsWith(prefix) && !isDrcCountry(key.slice(prefix.length)),
    );
}

export function restrictSettingsToDrc(
  settings: Record<string, string>,
): Record<string, string> {
  const restricted = { ...settings };
  for (const key of COUNTRY_LIST_SETTING_KEYS) {
    if (restricted[key] !== undefined) {
      restricted[key] = keepOnlyDrcCountryCodes(restricted[key]);
    }
  }
  for (const key of Object.keys(restricted)) {
    if (isNonDrcCountrySettingKey(key)) delete restricted[key];
  }
  return restricted;
}
