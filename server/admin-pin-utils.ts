import { timingSafeEqual } from "node:crypto";
import bcrypt from "bcrypt";

const BCRYPT_ADMIN_PIN_PATTERN = /^\$2[aby]\$\d{2}\$/;

export function isValidAdminPin(value: unknown): value is string {
  return typeof value === "string" && value.length >= 4 && value.length <= 8;
}

export function isHashedAdminPin(value: string): boolean {
  return BCRYPT_ADMIN_PIN_PATTERN.test(value);
}

export function hashAdminPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 12);
}

export async function verifyAdminPin(pin: string, storedPin: string): Promise<boolean> {
  if (isHashedAdminPin(storedPin)) {
    return bcrypt.compare(pin, storedPin);
  }

  const expected = Buffer.from(storedPin, "utf8");
  const submitted = Buffer.from(pin, "utf8");
  return expected.length === submitted.length && timingSafeEqual(expected, submitted);
}
