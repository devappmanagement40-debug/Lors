import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import {
  filterConfiguredClapayOperators,
  isClapayCountry,
  mapClapayStatus,
  normalizeClapayPhone,
  validateClapayPaymentUrl,
  verifyClapayWebhookSignature,
  type ClapayOperator,
} from "./clapay";

test("Clapay country support is case-insensitive and rejects unsupported codes", () => {
  assert.equal(isClapayCountry("ne"), true);
  assert.equal(isClapayCountry("TG"), true);
  assert.equal(isClapayCountry("XX"), false);
});

test("operator list is restricted to active operators configured for the app country", () => {
  const operators: ClapayOperator[] = [
    {
      name: "MyNita",
      codeoperator: "MYNITA",
      active: true,
      code: { MERCHANT: "merchant-ne", CASHIN: "cashin-ne" },
      otpstarter: { MERCHANT: true, CASHIN: false },
    },
    {
      name: "Orange Money",
      codeoperator: "OM",
      active: false,
      code: { MERCHANT: "merchant-ci", CASHIN: "cashin-ci" },
    },
  ];
  assert.deepEqual(
    filterConfiguredClapayOperators(
      ["NITA TRANSFERT", "Orange Burkina", "Unknown Wallet"],
      operators,
      "MERCHANT",
    ),
    [{ id: "MYNITA", name: "NITA TRANSFERT", requiresOtp: true }],
  );
});

test("payout operators requiring an operator OTP are clearly identified", () => {
  const operators: ClapayOperator[] = [{
    name: "Airtel",
    codeoperator: "AIRTEL",
    active: true,
    code: { MERCHANT: "payin", CASHIN: "payout" },
    otpstarter: { CASHIN: true },
  }];
  assert.deepEqual(
    filterConfiguredClapayOperators(["Airtel"], operators, "CASHIN"),
    [{ id: "AIRTEL", name: "Airtel", requiresOtp: true }],
  );
});

test("Clapay payment links must use secure external HTTPS URLs", () => {
  assert.equal(validateClapayPaymentUrl("https://pay.wave.com/cashout/123"), "https://pay.wave.com/cashout/123");
  assert.equal(validateClapayPaymentUrl("http://pay.wave.com/cashout/123"), undefined);
  assert.equal(validateClapayPaymentUrl("javascript:alert(1)"), undefined);
  assert.equal(validateClapayPaymentUrl("https://user:pass@example.com/payment"), undefined);
});

test("national phone numbers are normalized without changing a provided purchase number", () => {
  assert.equal(normalizeClapayPhone("081234567", "227", 8), "81234567");
  assert.equal(normalizeClapayPhone("+22781234567", "227", 8), "81234567");
  assert.throws(() => normalizeClapayPhone("8123456", "227", 8), /8 chiffres/);
});

test("only documented successful and terminal failure statuses are mapped as final", () => {
  assert.equal(mapClapayStatus("SUCCESS"), "approved");
  assert.equal(mapClapayStatus("SUCCESSFUL"), "approved");
  assert.equal(mapClapayStatus("FAILED"), "rejected");
  assert.equal(mapClapayStatus("CLOSED"), "rejected");
  assert.equal(mapClapayStatus("UNKNOWN"), "pending");
  assert.equal(mapClapayStatus("UNCOMPLETED"), "pending");
});

test("Clapay webhook validation checks the documented two-key HMAC", () => {
  const body = { event: "payment.completed", transaction_id: "SCOTGOLD-PAYIN-7" };
  const webhookKey = "key-id";
  const uniqueKey = "unique-secret";
  const webhookSecret = "webhook-secret";
  const encryptedKey = createHmac("sha256", uniqueKey).update(webhookKey).digest("hex");
  const signature = createHmac("sha256", webhookSecret)
    .update(encryptedKey + JSON.stringify(body))
    .digest("hex");

  assert.equal(
    verifyClapayWebhookSignature(body, `key=${webhookKey},signature=${signature}`, webhookSecret, uniqueKey),
    true,
  );
  assert.equal(
    verifyClapayWebhookSignature({ ...body, amount: 1 }, `key=${webhookKey},signature=${signature}`, webhookSecret, uniqueKey),
    false,
  );
  assert.equal(
    verifyClapayWebhookSignature(body, `key=${webhookKey},signature=${signature}`, webhookSecret, "wrong-key"),
    false,
  );
});
