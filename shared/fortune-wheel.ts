export const FORTUNE_WHEEL_PRIZES = [
  100,
  200,
  300,
  500,
  1500,
  5000,
  7000,
  30000,
  35000,
] as const;

export const FORTUNE_WHEEL_LOSS_CHANCE_PERCENT = 20;

export type FortuneWheelPrize =
  | {
      id: string;
      type: "cash";
      amount: number;
      probabilityPercent: number;
      enabled: boolean;
    }
  | {
      id: string;
      type: "product";
      productId: number;
      probabilityPercent: number;
      enabled: boolean;
    };

export type FortuneWheelConfig = {
  lossProbabilityPercent: number;
  prizes: FortuneWheelPrize[];
};

export type FortuneWheelSegment = {
  id: string;
  type: "cash" | "product";
  label: string;
  amount: number | null;
  productId: number | null;
  enabled: boolean;
};

export const DEFAULT_FORTUNE_WHEEL_CONFIG: FortuneWheelConfig = {
  lossProbabilityPercent: FORTUNE_WHEEL_LOSS_CHANCE_PERCENT,
  prizes: [
    { id: "cash-100", type: "cash", amount: 100, probabilityPercent: 36, enabled: true },
    { id: "cash-200", type: "cash", amount: 200, probabilityPercent: 24, enabled: true },
    { id: "cash-300", type: "cash", amount: 300, probabilityPercent: 16, enabled: true },
    { id: "cash-500", type: "cash", amount: 500, probabilityPercent: 4, enabled: true },
    { id: "cash-1500", type: "cash", amount: 1500, probabilityPercent: 0, enabled: false },
    { id: "cash-5000", type: "cash", amount: 5000, probabilityPercent: 0, enabled: false },
    { id: "cash-7000", type: "cash", amount: 7000, probabilityPercent: 0, enabled: false },
    { id: "cash-30000", type: "cash", amount: 30000, probabilityPercent: 0, enabled: false },
    { id: "cash-35000", type: "cash", amount: 35000, probabilityPercent: 0, enabled: false },
  ],
};

export const MAX_FORTUNE_WHEEL_PRIZES = 12;
const MAX_CASH_PRIZE = 2_147_483_647;

export function validateFortuneWheelConfig(value: unknown): FortuneWheelConfig {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("La configuration de la roue est invalide.");
  }

  const raw = value as Record<string, unknown>;
  const lossProbabilityPercent = raw.lossProbabilityPercent;
  if (
    !Number.isInteger(lossProbabilityPercent) ||
    Number(lossProbabilityPercent) < 0 ||
    Number(lossProbabilityPercent) > 100
  ) {
    throw new Error("La probabilité de perte doit être comprise entre 0 et 100 %.");
  }
  if (!Array.isArray(raw.prizes) || raw.prizes.length < 1 || raw.prizes.length > MAX_FORTUNE_WHEEL_PRIZES) {
    throw new Error(`La roue doit contenir entre 1 et ${MAX_FORTUNE_WHEEL_PRIZES} gains.`);
  }

  const ids = new Set<string>();
  const prizes = raw.prizes.map((item): FortuneWheelPrize => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error("Un gain de la roue est invalide.");
    }
    const prize = item as Record<string, unknown>;
    const id = typeof prize.id === "string" ? prize.id.trim() : "";
    const enabled = prize.enabled;
    const probabilityPercent = prize.probabilityPercent;
    if (!/^[a-zA-Z0-9_-]{1,80}$/.test(id) || ids.has(id)) {
      throw new Error("Chaque gain doit avoir un identifiant unique valide.");
    }
    ids.add(id);
    if (typeof enabled !== "boolean") {
      throw new Error("Le statut d’activation d’un gain est invalide.");
    }
    if (
      !Number.isInteger(probabilityPercent) ||
      Number(probabilityPercent) < 0 ||
      Number(probabilityPercent) > 100
    ) {
      throw new Error("La probabilité de chaque gain doit être comprise entre 0 et 100 %.");
    }
    if (!enabled && probabilityPercent !== 0) {
      throw new Error("Un gain désactivé doit avoir une probabilité de 0 %.");
    }

    if (prize.type === "cash") {
      if (
        !Number.isSafeInteger(prize.amount) ||
        Number(prize.amount) < 1 ||
        Number(prize.amount) > MAX_CASH_PRIZE
      ) {
        throw new Error("Chaque montant en CDF doit être un entier positif valide.");
      }
      return {
        id,
        type: "cash",
        amount: Number(prize.amount),
        probabilityPercent: Number(probabilityPercent),
        enabled,
      };
    }

    if (prize.type === "product") {
      if (!Number.isSafeInteger(prize.productId) || Number(prize.productId) < 1) {
        throw new Error("Sélectionnez un produit valide pour ce gain.");
      }
      return {
        id,
        type: "product",
        productId: Number(prize.productId),
        probabilityPercent: Number(probabilityPercent),
        enabled,
      };
    }

    throw new Error("Le type d’un gain doit être un montant ou un produit.");
  });

  const winningProbability = prizes.reduce(
    (sum, prize) => sum + (prize.enabled ? prize.probabilityPercent : 0),
    0,
  );
  if (Number(lossProbabilityPercent) + winningProbability !== 100) {
    throw new Error("La probabilité de perte et celles des gains doivent totaliser 100 %.");
  }

  return {
    lossProbabilityPercent: Number(lossProbabilityPercent),
    prizes,
  };
}

export function parseFortuneWheelConfig(value: string | null): FortuneWheelConfig {
  if (!value) return validateFortuneWheelConfig(DEFAULT_FORTUNE_WHEEL_CONFIG);
  try {
    return validateFortuneWheelConfig(JSON.parse(value));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("La configuration enregistrée de la roue ne peut pas être lue.");
    }
    throw error;
  }
}

export type FortuneWheelOutcome =
  | { won: true; prizeIndex: number; prize: FortuneWheelPrize }
  | { won: false; lossBoundaryIndex: number };

export function selectFortuneWheelOutcome(
  probabilityRoll: number,
  lossBoundaryRoll: number,
  config: FortuneWheelConfig = DEFAULT_FORTUNE_WHEEL_CONFIG,
): FortuneWheelOutcome {
  if (!Number.isInteger(probabilityRoll) || probabilityRoll < 0 || probabilityRoll >= 100) {
    throw new RangeError("Tirage de roue invalide.");
  }
  const checkedConfig = validateFortuneWheelConfig(config);
  if (
    !Number.isInteger(lossBoundaryRoll) ||
    lossBoundaryRoll < 0 ||
    lossBoundaryRoll >= checkedConfig.prizes.length
  ) {
    throw new RangeError("Séparation de roue invalide.");
  }
  if (probabilityRoll < checkedConfig.lossProbabilityPercent) {
    return { won: false, lossBoundaryIndex: lossBoundaryRoll };
  }

  let probabilityLimit = checkedConfig.lossProbabilityPercent;
  for (let prizeIndex = 0; prizeIndex < checkedConfig.prizes.length; prizeIndex += 1) {
    const prize = checkedConfig.prizes[prizeIndex];
    if (!prize.enabled) continue;
    probabilityLimit += prize.probabilityPercent;
    if (probabilityRoll < probabilityLimit) {
      return { won: true, prizeIndex, prize };
    }
  }

  throw new RangeError("La configuration de la roue ne permet pas ce tirage.");
}

export function getFortuneWheelRotationDegrees(
  prizeIndex: number,
  fullTurns = 5,
  segmentCount: number = FORTUNE_WHEEL_PRIZES.length,
): number {
  if (!Number.isInteger(segmentCount) || segmentCount < 1) {
    throw new RangeError("Nombre de segments de roue invalide.");
  }
  if (
    !Number.isInteger(prizeIndex) ||
    prizeIndex < 0 ||
    prizeIndex >= segmentCount
  ) {
    throw new RangeError("Indice de gain de roue invalide.");
  }

  const turns = Math.max(1, Math.floor(fullTurns));
  const degreesPerSegment = 360 / segmentCount;
  const segmentCenter = (prizeIndex * degreesPerSegment) + (degreesPerSegment / 2);
  const alignment = (360 - segmentCenter) % 360;
  return turns * 360 + alignment;
}

export function getFortuneWheelLossRotationDegrees(
  boundaryIndex: number,
  fullTurns = 5,
  segmentCount: number = FORTUNE_WHEEL_PRIZES.length,
): number {
  if (!Number.isInteger(segmentCount) || segmentCount < 1) {
    throw new RangeError("Nombre de segments de roue invalide.");
  }
  if (
    !Number.isInteger(boundaryIndex) ||
    boundaryIndex < 0 ||
    boundaryIndex >= segmentCount
  ) {
    throw new RangeError("Indice de séparation de roue invalide.");
  }

  const turns = Math.max(1, Math.floor(fullTurns));
  const degreesPerSegment = 360 / segmentCount;
  const boundaryAngle = boundaryIndex * degreesPerSegment;
  const alignment = (360 - boundaryAngle) % 360;
  return turns * 360 + alignment;
}

export function getFortuneWheelSpinRotation(
  currentRotation: number,
  targetRotation: number,
  fullTurns = 5,
): number {
  if (!Number.isFinite(currentRotation) || !Number.isFinite(targetRotation)) {
    throw new RangeError("Rotation de roue invalide.");
  }
  const turns = Math.max(1, Math.floor(fullTurns));
  const currentAngle = ((currentRotation % 360) + 360) % 360;
  const targetAngle = ((targetRotation % 360) + 360) % 360;
  const correction = (targetAngle - currentAngle + 360) % 360;
  return currentRotation + (turns * 360) + correction;
}
