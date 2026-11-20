import assert from "node:assert/strict";
import test from "node:test";
import { validateUserDeletion } from "./user-deletion-policy";
import { canNonSuperAdminAccessAdminRoute } from "./admin-access";

const actor = { id: 1, isAdmin: true, isSuperAdmin: true, isBanned: false };
const target = { id: 2, isSuperAdmin: false, phone: "90000000" };

test("only active super administrators can delete accounts", () => {
  for (const invalid of [undefined, { ...actor, isSuperAdmin: false }, { ...actor, isAdmin: false }, { ...actor, isBanned: true }]) {
    assert.throws(() => validateUserDeletion(invalid, target, target.phone));
  }
  assert.equal(canNonSuperAdminAccessAdminRoute("DELETE", "/api/admin/users/2"), false);
  assert.doesNotThrow(() => validateUserDeletion(actor, target, target.phone));
});

test("deletion requires exact confirmation and protects super administrators", () => {
  for (const confirmation of [undefined, "", "90000001", { phone: target.phone }]) {
    assert.throws(() => validateUserDeletion(actor, target, confirmation));
  }
  assert.throws(() => validateUserDeletion(actor, undefined, target.phone));
  assert.throws(() => validateUserDeletion(actor, { ...target, id: actor.id }, target.phone));
  assert.throws(() => validateUserDeletion(actor, { ...target, isSuperAdmin: true }, target.phone));
});
