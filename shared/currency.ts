import { isDrcCountry } from "./country-policy";

export { DRC_COUNTRY_CODE, isDrcCountry } from "./country-policy";

export function getCurrencyLabel(countryCode: string, configuredCurrency?: string): string {
  if (isDrcCountry(countryCode)) return "CDF";
  return configuredCurrency?.trim() || "FCFA";
}
