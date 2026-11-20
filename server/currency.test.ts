import assert from "node:assert/strict";
import test from "node:test";
import { getCurrencyLabel, isDrcCountry } from "../shared/currency";

test("uses CDF for DRC accounts without changing other country currencies", () => {
  assert.equal(isDrcCountry("CD"), true);
  assert.equal(isDrcCountry("cd"), true);
  assert.equal(isDrcCountry("CG"), false);
  assert.equal(getCurrencyLabel("CD", "XOF"), "CDF");
  assert.equal(getCurrencyLabel("cd", "CDF"), "CDF");
  assert.equal(getCurrencyLabel("TG", "XOF"), "XOF");
  assert.equal(getCurrencyLabel("CM", "XAF"), "XAF");
  assert.equal(getCurrencyLabel("CI"), "FCFA");
});
