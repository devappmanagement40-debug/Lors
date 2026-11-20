import test from "node:test";
import assert from "node:assert/strict";
import {
  hashAdminPin,
  isHashedAdminPin,
  isValidAdminPin,
  verifyAdminPin,
} from "./admin-pin-utils";

test("admin PINs are stored as bcrypt hashes and verified against the hash", async () => {
  const pin = "4826";
  const hash = await hashAdminPin(pin);

  assert.notEqual(hash, pin);
  assert.equal(isHashedAdminPin(hash), true);
  assert.equal(await verifyAdminPin(pin, hash), true);
  assert.equal(await verifyAdminPin("0000", hash), false);
});

test("legacy plain admin PINs remain verifiable for migration", async () => {
  assert.equal(await verifyAdminPin("4826", "4826"), true);
  assert.equal(await verifyAdminPin("4827", "4826"), false);
});

test("admin PIN length stays between four and eight characters", () => {
  assert.equal(isValidAdminPin("1234"), true);
  assert.equal(isValidAdminPin("12345678"), true);
  assert.equal(isValidAdminPin("123"), false);
  assert.equal(isValidAdminPin("123456789"), false);
});
