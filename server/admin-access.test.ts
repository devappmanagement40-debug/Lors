import assert from "node:assert/strict";
import test from "node:test";
import {
  canNonSuperAdminAccessAdminRoute,
  canNonSuperAdminAccessBankerRoute,
} from "./admin-access";

test("non-super admins can use only admin withdrawal routes", () => {
  assert.equal(canNonSuperAdminAccessAdminRoute("GET", "/api/admin/withdrawals?status=all"), true);
  assert.equal(canNonSuperAdminAccessAdminRoute("POST", "/api/admin/withdrawals/18/approve"), true);
  assert.equal(canNonSuperAdminAccessAdminRoute("POST", "/api/admin/withdrawals/18/ppaypros/status"), true);
  assert.equal(canNonSuperAdminAccessAdminRoute("POST", "/api/admin/withdrawals/18/drimpay/status/"), true);

  assert.equal(canNonSuperAdminAccessAdminRoute("GET", "/api/admin/settings"), false);
  assert.equal(canNonSuperAdminAccessAdminRoute("POST", "/api/admin/settings"), false);
  assert.equal(canNonSuperAdminAccessAdminRoute("GET", "/api/admin/fortune-wheel/config"), false);
  assert.equal(canNonSuperAdminAccessAdminRoute("PUT", "/api/admin/fortune-wheel/config"), false);
  assert.equal(canNonSuperAdminAccessAdminRoute("GET", "/api/admin/deposits"), false);
  assert.equal(canNonSuperAdminAccessAdminRoute("POST", "/api/admin/withdrawals/18/not-a-withdrawal-action"), false);
  assert.equal(canNonSuperAdminAccessAdminRoute("DELETE", "/api/admin/withdrawals/18/reject"), false);
});

test("non-super admins cannot access banker deposit routes", () => {
  assert.equal(canNonSuperAdminAccessBankerRoute("GET", "/api/banker/withdrawals"), true);
  assert.equal(canNonSuperAdminAccessBankerRoute("POST", "/api/banker/withdrawals/18/reject"), true);
  assert.equal(canNonSuperAdminAccessBankerRoute("GET", "/api/banker/deposits"), false);
  assert.equal(canNonSuperAdminAccessBankerRoute("POST", "/api/banker/deposits/18/approve"), false);
});
