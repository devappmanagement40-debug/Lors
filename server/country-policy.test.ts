import assert from "node:assert/strict";
import test from "node:test";
import {
  isDrcCountry,
  isNonDrcCountrySettingKey,
  keepOnlyDrcCountryCodes,
  restrictSettingsToDrc,
} from "../shared/country-policy";

test("only the DRC country code is accepted, case-insensitively", () => {
  assert.equal(isDrcCountry("CD"), true);
  assert.equal(isDrcCountry(" cd "), true);
  assert.equal(isDrcCountry("CG"), false);
  assert.equal(isDrcCountry("NE"), false);
});

test("provider country lists retain only one normalized DRC entry", () => {
  assert.equal(keepOnlyDrcCountryCodes("TG, CD, cd, BF"), "CD");
  assert.equal(keepOnlyDrcCountryCodes("TG,BF"), "");
  assert.equal(keepOnlyDrcCountryCodes(undefined), "");
});

test("country-specific settings hide other country credentials and confirmations", () => {
  assert.equal(isNonDrcCountrySettingKey("inpayMerchantId_TG"), true);
  assert.equal(isNonDrcCountrySettingKey("inpayMerchantId_CD"), false);
  assert.equal(isNonDrcCountrySettingKey("ppayprosPayinCiConfirmed"), true);

  assert.deepEqual(restrictSettingsToDrc({
    westpayCountries: "TG, CD",
    inpayMerchantId_TG: "legacy",
    inpayMerchantId_CD: "drc",
    ppayprosPayinCiConfirmed: "true",
  }), {
    westpayCountries: "CD",
    inpayMerchantId_CD: "drc",
  });
});
