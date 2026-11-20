import test from "node:test";
import assert from "node:assert/strict";
import {
  buildReferralShareTargets,
  REFERRAL_SHARE_MESSAGE,
} from "../client/src/lib/referral-share";

test("referral share links include the user's personal URL and professional invitation", () => {
  const referralLink = "https://scotgold.example/#/pages/index/scotgold?invite=ABC123";
  const targets = buildReferralShareTargets(referralLink);

  const whatsapp = new URL(targets.whatsapp);
  assert.equal(whatsapp.origin, "https://wa.me");
  assert.equal(whatsapp.searchParams.get("text"), `${REFERRAL_SHARE_MESSAGE}\n\n${referralLink}`);

  const telegram = new URL(targets.telegram);
  assert.equal(telegram.origin, "https://t.me");
  assert.equal(telegram.pathname, "/share/url");
  assert.equal(telegram.searchParams.get("url"), referralLink);
  assert.equal(telegram.searchParams.get("text"), REFERRAL_SHARE_MESSAGE);

  const facebook = new URL(targets.facebook);
  assert.equal(facebook.origin, "https://www.facebook.com");
  assert.equal(facebook.searchParams.get("u"), referralLink);
  assert.equal(facebook.searchParams.get("quote"), REFERRAL_SHARE_MESSAGE);
});
