import assert from "node:assert/strict";
import test from "node:test";
import {
  createPpayProsPayin,
  createPpayProsPayout,
  canAdminUpdatePpayProsPayoutConfirmation,
  canAdminUpdatePpayProsTgPayoutConfirmation,
  getPpayProsCredentials,
  getPpayProsEnabledCountries,
  getPpayProsPayoutAccountCode,
  getPpayProsWayCode,
  isPpayProsPayinEnabledForCountry,
  isPpayProsPayoutEnabledForCountry,
} from "./ppaypros";
import { normalizePpayProsPhone, PPAYPROS_COUNTRY_CODES } from "@shared/phone";

const credentialEnvNames = [
  ...PPAYPROS_COUNTRY_CODES.flatMap((country) => [
    `PPAYPROS_MCH_NO_${country}`,
    `PPAYPROS_APP_ID_${country}`,
    `PPAYPROS_PRIVATE_KEY_${country}`,
  ]),
  "PPAYPROS_MCH_NO",
  "PPAYPROS_APP_ID",
  "PPAYPROS_PRIVATE_KEY",
];

async function withPpayProsEnvironment(
  values: Record<string, string>,
  run: () => Promise<void>,
) {
  const originalValues = new Map(
    credentialEnvNames.map((name) => [name, process.env[name]]),
  );
  const originalFetch = globalThis.fetch;
  try {
    for (const name of credentialEnvNames) delete process.env[name];
    Object.assign(process.env, values);
    await run();
  } finally {
    for (const [name, value] of originalValues) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    globalThis.fetch = originalFetch;
  }
}

function countryCredentials(country: string) {
  return {
    [`PPAYPROS_MCH_NO_${country}`]: `merchant-${country}`,
    [`PPAYPROS_APP_ID_${country}`]: `app-${country}`,
    [`PPAYPROS_PRIVATE_KEY_${country}`]: `private-${country}`,
  };
}

test("PPayPros selects a separate credential set for each country", async () => {
  await withPpayProsEnvironment({
    ...countryCredentials("TG"),
    ...countryCredentials("CI"),
  }, async () => {
    assert.deepEqual(getPpayProsCredentials("tg"), {
      merchantNo: "merchant-TG",
      appId: "app-TG",
      privateKey: "private-TG",
    });
    assert.deepEqual(getPpayProsCredentials("CI"), {
      merchantNo: "merchant-CI",
      appId: "app-CI",
      privateKey: "private-CI",
    });
    assert.throws(() => getPpayProsCredentials("BF"), /PPAYPROS_MCH_NO_BF/);
  });
});

test("legacy unsuffixed PPayPros credentials are accepted for Benin only", async () => {
  await withPpayProsEnvironment({
    PPAYPROS_MCH_NO: "legacy-merchant",
    PPAYPROS_APP_ID: "legacy-app",
    PPAYPROS_PRIVATE_KEY: "legacy-private",
  }, async () => {
    assert.equal(getPpayProsCredentials("BJ").merchantNo, "legacy-merchant");
    assert.throws(() => getPpayProsCredentials("TG"), /PPAYPROS_MCH_NO_TG/);
  });
});

test("PPayPros enabled-country settings ignore unsupported and duplicate codes", () => {
  assert.deepEqual(
    getPpayProsEnabledCountries({ ppayprosPayinCountries: "bj,TG,XX,tg,CI" }),
    ["BJ", "TG", "CI"],
  );
  assert.deepEqual(getPpayProsEnabledCountries({}), []);
  assert.deepEqual(getPpayProsEnabledCountries({ ppayprosPayinCountries: "" }), []);
  assert.equal(isPpayProsPayinEnabledForCountry("TG", {
    ppayprosPayinEnabled: "true",
    ppayprosPayinCountries: "BJ,TG",
  }), true);
  assert.equal(isPpayProsPayinEnabledForCountry("TG", {
    ppayprosPayinEnabled: "false",
    ppayprosPayinCountries: "BJ,TG",
  }), false);
  assert.equal(isPpayProsPayinEnabledForCountry("CI", {
    ppayprosPayinEnabled: "true",
    ppayprosPayinCountries: "BJ,TG",
  }), false);
  assert.equal(isPpayProsPayinEnabledForCountry("CI", {
    ppayprosPayinEnabled: "true",
    ppayprosPayinCountries: "BJ,TG,CI",
  }), false);
  assert.equal(isPpayProsPayinEnabledForCountry("CI", {
    ppayprosPayinEnabled: "true",
    ppayprosPayinCountries: "BJ,TG,CI",
    ppayprosPayinCiConfirmed: "true",
  }), true);
});

test("PPayPros uses documented payin codes and omits Burkina code for a single-channel account", () => {
  assert.equal(getPpayProsWayCode("BJ"), "850");
  assert.equal(getPpayProsWayCode("TG"), "710");
  assert.equal(getPpayProsWayCode("CI"), "837");
  assert.equal(getPpayProsWayCode("CM"), "890");
  assert.equal(getPpayProsWayCode("BF"), undefined);
  assert.throws(() => getPpayProsWayCode("SN"), /ne prend pas en charge/);
});

test("PPayPros phone formats follow country-specific published rules", () => {
  assert.equal(normalizePpayProsPhone("90123456", "BJ"), "0190123456");
  assert.equal(normalizePpayProsPhone("+228 90 12 34 56", "TG"), "90123456");
  assert.equal(normalizePpayProsPhone("+225 01 02 03 04 05", "CI"), "0102030405");
  assert.equal(normalizePpayProsPhone("+226 12 34 56 78", "BF"), "12345678");
  assert.equal(normalizePpayProsPhone("+237 123 456 789", "CM"), "123456789");
  assert.equal(normalizePpayProsPhone("0123456789", "CM"), "0123456789");
  assert.equal(normalizePpayProsPhone("9012345", "TG"), null);
  assert.equal(normalizePpayProsPhone("1234567890", "CI"), null);
});

test("PPayPros payout country gates keep Togo disabled until separately confirmed", () => {
  assert.equal(isPpayProsPayoutEnabledForCountry("BJ", {
    ppayprosPayoutEnabled: "true",
  }), true);
  assert.equal(isPpayProsPayoutEnabledForCountry("TG", {
    ppayprosPayoutEnabled: "true",
  }), false);
  assert.equal(isPpayProsPayoutEnabledForCountry("TG", {
    ppayprosPayoutEnabled: "true",
    ppayprosPayoutTgConfirmed: "true",
  }), true);
  assert.equal(isPpayProsPayoutEnabledForCountry("TG", {
    ppayprosPayoutEnabled: "false",
    ppayprosPayoutTgConfirmed: "true",
  }), false);
  assert.equal(isPpayProsPayoutEnabledForCountry("CI", {
    ppayprosPayoutEnabled: "true",
    ppayprosPayoutTgConfirmed: "true",
  }), false);
  assert.equal(isPpayProsPayoutEnabledForCountry("CI", {
    ppayprosPayoutEnabled: "true",
    ppayprosPayoutCiConfirmed: "true",
  }), true);
  assert.equal(isPpayProsPayoutEnabledForCountry("CI", {
    ppayprosPayoutEnabled: "false",
    ppayprosPayoutCiConfirmed: "true",
  }), false);
});

test("only super admins can change Togo payout confirmation", () => {
  assert.equal(canAdminUpdatePpayProsTgPayoutConfirmation(false, undefined, "false"), true);
  assert.equal(canAdminUpdatePpayProsTgPayoutConfirmation(false, "true", "true"), true);
  assert.equal(canAdminUpdatePpayProsTgPayoutConfirmation(false, "false", "true"), false);
  assert.equal(canAdminUpdatePpayProsTgPayoutConfirmation(false, "true", "false"), false);
  assert.equal(canAdminUpdatePpayProsTgPayoutConfirmation(true, "false", "true"), true);
});

test("only super admins can change Côte d’Ivoire payout confirmation", () => {
  assert.equal(canAdminUpdatePpayProsPayoutConfirmation(false, undefined, "false"), true);
  assert.equal(canAdminUpdatePpayProsPayoutConfirmation(false, "true", "true"), true);
  assert.equal(canAdminUpdatePpayProsPayoutConfirmation(false, "false", "true"), false);
  assert.equal(canAdminUpdatePpayProsPayoutConfirmation(true, "false", "true"), true);
});

test("Côte d’Ivoire PPayPros payout uses the documented wallet codes", () => {
  assert.equal(getPpayProsPayoutAccountCode("CI", "Orange Money"), "1");
  assert.equal(getPpayProsPayoutAccountCode("CI", "MTN MoMo"), "2");
  assert.equal(getPpayProsPayoutAccountCode("CI", "Moov Money"), "3");
  assert.equal(getPpayProsPayoutAccountCode("CI", "Wave"), "6");
  assert.equal(getPpayProsPayoutAccountCode("BJ", "MTN Benin"), "Bank");
  assert.throws(() => getPpayProsPayoutAccountCode("CI", "Unknown operator"), /code PPayPros documenté/);
});

test("PPayPros Togo payout uses its own credentials and 8-digit wallet number", async () => {
  let request: Record<string, unknown> | undefined;
  await withPpayProsEnvironment(countryCredentials("TG"), async () => {
    globalThis.fetch = async (_input, init) => {
      request = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({
        code: 0,
        data: { transferId: "TGO-TEST-1", state: 1 },
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    };

    await createPpayProsPayout({
      country: "TG",
      merchantOrderNo: "PPOUT-TG-1",
      amountXof: 1000,
      accountName: "Test Wallet",
      accountNumber: "+228 90 12 34 56",
      paymentMethod: "Moov Africa Togo",
      accountPhone: "90123456",
      accountEmail: "user@example.test",
      notifyUrl: "https://merchant.example.test/api/webhooks/ppaypros/payout",
    });
  });

  assert.equal(request?.mchNo, "merchant-TG");
  assert.equal(request?.entryType, "BANK_CARD");
  assert.equal(request?.accountCode, "Bank");
  assert.equal(request?.accountNo, "90123456");
  assert.equal(request?.accountPhone, "90123456");
  assert.equal(request?.amount, 100000);
  assert.equal(typeof request?.sign, "string");
});

test("PPayPros Benin payout keeps its existing credentials and phone normalization", async () => {
  let request: Record<string, unknown> | undefined;
  await withPpayProsEnvironment(countryCredentials("BJ"), async () => {
    globalThis.fetch = async (_input, init) => {
      request = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({
        code: 0,
        data: { transferId: "BEN-TEST-1", state: 1 },
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    };

    await createPpayProsPayout({
      country: "BJ",
      merchantOrderNo: "PPOUT-BJ-1",
      amountXof: 1000,
      accountName: "Test Wallet",
      accountNumber: "90123456",
      paymentMethod: "MTN Benin",
      accountPhone: "90123456",
      accountEmail: "user@example.test",
      notifyUrl: "https://merchant.example.test/api/webhooks/ppaypros/payout",
    });
  });

  assert.equal(request?.mchNo, "merchant-BJ");
  assert.equal(request?.accountNo, "0190123456");
  assert.equal(request?.accountPhone, "0190123456");
  assert.equal(request?.entryType, "BANK_CARD");
  assert.equal(request?.accountCode, "Bank");
});

test("PPayPros Côte d’Ivoire payout sends normalized phone and documented operator code", async () => {
  let request: Record<string, unknown> | undefined;
  await withPpayProsEnvironment(countryCredentials("CI"), async () => {
    globalThis.fetch = async (_input, init) => {
      request = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({
        code: 0,
        data: { transferId: "CIV-TEST-1", state: 1 },
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    };

    await createPpayProsPayout({
      country: "CI",
      merchantOrderNo: "PPOUT-CI-1",
      amountXof: 1000,
      accountName: "Test Wallet",
      accountNumber: "+225 01 02 03 04 05",
      paymentMethod: "Wave",
      accountPhone: "+225 01 02 03 04 05",
      accountEmail: "user@example.test",
      notifyUrl: "https://merchant.example.test/api/webhooks/ppaypros/payout",
    });
  });

  assert.equal(request?.mchNo, "merchant-CI");
  assert.equal(request?.entryType, "BANK_CARD");
  assert.equal(request?.accountCode, "6");
  assert.equal(request?.accountNo, "0102030405");
  assert.equal(request?.accountPhone, "0102030405");
  assert.equal(request?.amount, 100000);
});

test("PPayPros payins use the country account, route code, and Côte d’Ivoire extParam", async () => {
  const requests: Record<string, unknown>[] = [];
  const countryPhones: Record<string, string> = {
    TG: "90123456",
    CI: "0102030405",
    BF: "12345678",
    CM: "123456789",
  };
  const environment = Object.assign(
    {},
    ...Object.keys(countryPhones).map(country => countryCredentials(country)),
  );

  await withPpayProsEnvironment(environment, async () => {
    globalThis.fetch = async (_input, init) => {
      requests.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      return new Response(JSON.stringify({
        code: 0,
        data: { payDataType: "payUrl", payData: "https://checkout.example.test/pay" },
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    };

    for (const [country, customerPhone] of Object.entries(countryPhones)) {
      await createPpayProsPayin({
        country,
        merchantOrderNo: `PPIN-${country}`,
        amountXof: 1000,
        customerName: "Client",
        customerPhone,
        customerEmail: "client@example.test",
        notifyUrl: "https://merchant.example.test/api/webhooks/ppaypros/payin",
        returnUrl: "https://merchant.example.test/api/ppaypros/return",
      });
    }
  });

  assert.equal(requests.length, 4);
  const byMerchant = new Map(requests.map((request) => [request.mchNo, request]));
  assert.equal(byMerchant.get("merchant-TG")?.wayCode, "710");
  assert.equal(byMerchant.get("merchant-CI")?.wayCode, "837");
  assert.equal(byMerchant.get("merchant-CI")?.extParam, "0102030405");
  assert.equal(byMerchant.get("merchant-CM")?.wayCode, "890");
  assert.equal(byMerchant.get("merchant-BF")?.wayCode, undefined);
  assert.equal(byMerchant.get("merchant-TG")?.amount, 100000);
});
