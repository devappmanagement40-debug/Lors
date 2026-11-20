import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_FORTUNE_WHEEL_CONFIG,
  FORTUNE_WHEEL_LOSS_CHANCE_PERCENT,
  FORTUNE_WHEEL_PRIZES,
  getFortuneWheelLossRotationDegrees,
  getFortuneWheelRotationDegrees,
  getFortuneWheelSpinRotation,
  parseFortuneWheelConfig,
  selectFortuneWheelOutcome,
  validateFortuneWheelConfig,
} from "../shared/fortune-wheel";
import { getStablePurchaseSpinAwards } from "./fortune-wheel-policy";

test("fortune wheel uses the nine prize amounts shown to users", () => {
  assert.deepEqual(FORTUNE_WHEEL_PRIZES, [
    100,
    200,
    300,
    500,
    1500,
    5000,
    7000,
    30000,
    35000,
  ]);
  assert.ok(FORTUNE_WHEEL_PRIZES.every((amount) => amount >= 100));
});

test("default configuration preserves the current enabled prizes and loss chance", () => {
  const config = validateFortuneWheelConfig(DEFAULT_FORTUNE_WHEEL_CONFIG);
  assert.equal(config.lossProbabilityPercent, 20);
  assert.deepEqual(
    config.prizes.filter((prize) => prize.enabled).map((prize) =>
      prize.type === "cash" ? [prize.amount, prize.probabilityPercent] : null,
    ),
    [
      [100, 36],
      [200, 24],
      [300, 16],
      [500, 4],
    ],
  );
  assert.deepEqual(
    config.prizes.filter((prize) => !prize.enabled).map((prize) =>
      prize.type === "cash" ? prize.amount : null,
    ),
    FORTUNE_WHEEL_PRIZES.slice(4),
  );
});

test("default wheel probabilities preserve the previous effective cash odds", () => {
  const counts = new Map<number, number>();
  for (let roll = 0; roll < 100; roll += 1) {
    const outcome = selectFortuneWheelOutcome(roll, 0);
    const result = outcome.won
      ? outcome.prize.type === "cash" ? outcome.prize.amount : -1
      : 0;
    counts.set(result, (counts.get(result) ?? 0) + 1);
  }

  assert.deepEqual([...counts.entries()], [
    [0, 20],
    [100, 36],
    [200, 24],
    [300, 16],
    [500, 4],
  ]);
});

test("custom product prize probability selects the product segment", () => {
  const config = {
    lossProbabilityPercent: 25,
    prizes: [
      { id: "cash-1", type: "cash" as const, amount: 250, probabilityPercent: 50, enabled: true },
      { id: "product-1", type: "product" as const, productId: 7, probabilityPercent: 25, enabled: true },
    ],
  };

  assert.deepEqual(selectFortuneWheelOutcome(75, 0, config), {
    won: true,
    prizeIndex: 1,
    prize: config.prizes[1],
  });
  assert.deepEqual(selectFortuneWheelOutcome(24, 0, config), {
    won: false,
    lossBoundaryIndex: 0,
  });
});

test("a super-admin can configure a different CDF amount and chance", () => {
  const config = validateFortuneWheelConfig({
    lossProbabilityPercent: 15,
    prizes: [
      { id: "custom-cdf", type: "cash", amount: 1200, probabilityPercent: 85, enabled: true },
    ],
  });
  const outcome = selectFortuneWheelOutcome(50, 0, config);

  assert.equal(outcome.won, true);
  if (outcome.won) {
    assert.equal(outcome.prize.type, "cash");
    assert.equal(outcome.prize.amount, 1200);
    assert.equal(outcome.prize.probabilityPercent, 85);
  }
});

test("wheel configuration rejects probability totals other than 100 percent", () => {
  assert.throws(() => validateFortuneWheelConfig({
    lossProbabilityPercent: 20,
    prizes: [
      { id: "cash-1", type: "cash", amount: 100, probabilityPercent: 79, enabled: true },
    ],
  }), /totaliser 100 %/);
  assert.throws(() => parseFortuneWheelConfig("{invalid"), /ne peut pas être lue/);
});

test("configuration can assign all probability to loss when the administrator chooses", () => {
  const config = validateFortuneWheelConfig({
    lossProbabilityPercent: 100,
    prizes: [
      { id: "inactive-cash", type: "cash", amount: 100, probabilityPercent: 0, enabled: false },
    ],
  });
  assert.deepEqual(selectFortuneWheelOutcome(99, 0, config), {
    won: false,
    lossBoundaryIndex: 0,
  });
});

test("one in five wheel turns loses without selecting a prize amount", () => {
  assert.equal(FORTUNE_WHEEL_LOSS_CHANCE_PERCENT, 20);
  const outcomes = Array.from({ length: 100 }, (_, lossRoll) =>
    selectFortuneWheelOutcome(lossRoll, lossRoll % FORTUNE_WHEEL_PRIZES.length),
  );
  const losses = outcomes.filter((outcome) => !outcome.won);
  const wins = outcomes.filter((outcome) => outcome.won);

  assert.equal(losses.length, 20);
  assert.equal(wins.length, 80);
  assert.ok(losses.every((outcome) => !outcome.won && outcome.lossBoundaryIndex >= 0));
});

test("wheel loss animation stops on a divider between prize segments", () => {
  const segmentDegrees = 360 / FORTUNE_WHEEL_PRIZES.length;

  for (let boundaryIndex = 0; boundaryIndex < FORTUNE_WHEEL_PRIZES.length; boundaryIndex += 1) {
    const rotation = getFortuneWheelLossRotationDegrees(boundaryIndex);
    const normalized = rotation % 360;
    const expected = (360 - (boundaryIndex * segmentDegrees)) % 360;
    assert.equal(normalized, expected);
  }

  assert.throws(
    () => getFortuneWheelLossRotationDegrees(FORTUNE_WHEEL_PRIZES.length),
    RangeError,
  );
});

test("wheel rotation supports a dynamically configured segment count", () => {
  const segmentCount = 5;
  const segmentDegrees = 360 / segmentCount;
  const rotation = getFortuneWheelRotationDegrees(3, 5, segmentCount);
  assert.equal(
    rotation % 360,
    (360 - ((3 * segmentDegrees) + (segmentDegrees / 2))) % 360,
  );
  assert.throws(() => getFortuneWheelRotationDegrees(5, 5, segmentCount), RangeError);
});

test("successive spins align to the new result instead of the prior angle", () => {
  const firstTarget = getFortuneWheelRotationDegrees(3, 5, 5);
  const firstFinal = getFortuneWheelSpinRotation(0, firstTarget, 5);
  const secondTarget = getFortuneWheelRotationDegrees(1, 5, 5);
  const secondFinal = getFortuneWheelSpinRotation(firstFinal, secondTarget, 5);

  assert.equal(firstFinal % 360, firstTarget % 360);
  assert.equal(secondFinal % 360, secondTarget % 360);
  assert.ok(secondFinal > firstFinal);
});

test("the selected wheel segment aligns with the fixed pointer after full rotations", () => {
  const segmentDegrees = 360 / FORTUNE_WHEEL_PRIZES.length;

  FORTUNE_WHEEL_PRIZES.forEach((_, prizeIndex) => {
    const rotation = getFortuneWheelRotationDegrees(prizeIndex);
    const normalized = rotation % 360;
    const expected = (360 - ((prizeIndex * segmentDegrees) + (segmentDegrees / 2))) % 360;
    assert.equal(normalized, expected);
  });
});

test("fortune wheel rotation rejects an invalid prize index", () => {
  assert.throws(() => getFortuneWheelRotationDegrees(-1), RangeError);
  assert.throws(
    () => getFortuneWheelRotationDegrees(FORTUNE_WHEEL_PRIZES.length),
    RangeError,
  );
});

test("a referred user earns one spin for every paid stable purchase, and the sponsor only on the first", () => {
  assert.deepEqual(getStablePurchaseSpinAwards({
    productType: "stable",
    isPaidPurchase: true,
    assignedByAdmin: false,
    isFirstStableProductPurchase: true,
    isReferred: true,
  }), { buyerSpins: 1, sponsorSpins: 1 });

  assert.deepEqual(getStablePurchaseSpinAwards({
    productType: "stable",
    isPaidPurchase: true,
    assignedByAdmin: false,
    isFirstStableProductPurchase: false,
    isReferred: true,
  }), { buyerSpins: 1, sponsorSpins: 0 });
});

test("free, admin-assigned, activity, and non-referred purchases do not award wheel spins", () => {
  const ineligiblePurchases = [
    { productType: "stable" as const, isPaidPurchase: false, assignedByAdmin: false, isFirstStableProductPurchase: true, isReferred: true },
    { productType: "stable" as const, isPaidPurchase: true, assignedByAdmin: true, isFirstStableProductPurchase: true, isReferred: true },
    { productType: "activity" as const, isPaidPurchase: true, assignedByAdmin: false, isFirstStableProductPurchase: false, isReferred: true },
    { productType: "stable" as const, isPaidPurchase: true, assignedByAdmin: false, isFirstStableProductPurchase: true, isReferred: false },
  ];

  for (const purchase of ineligiblePurchases) {
    assert.deepEqual(getStablePurchaseSpinAwards(purchase), {
      buyerSpins: 0,
      sponsorSpins: 0,
    });
  }
});
