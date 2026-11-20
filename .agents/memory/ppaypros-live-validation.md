---
name: PPayPros live validation
description: Country-specific PPayPros account, phone, payment-code, amount-scale, and payout requirements.
---

PPayPros payins must use the authenticated user's account phone; do not ask for a separate phone on the deposit page. Use a separate merchant number, app ID, and private key for every country; verify callbacks with the credentials selected from the transaction's stored country. Published payin codes: BJ 850, TG 710, CI 837, and CM 890. No BF code is published, so omit wayCode only when its merchant account has one payment channel.

Phone rules documented by PPayPros: BJ accepts eight local digits or `01` plus eight digits and normalizes to `01` plus eight digits; TG requires eight wallet digits; CI requires a 10-digit local number starting with 0 and that same number in extParam; CM accepts nine digits without an initial 0 or ten digits with an initial 0. The published docs give no BF-specific phone rule. Never reinterpret a phone as belonging to a different country.

PPayPros documents Côte d’Ivoire payouts as `BANK_CARD` with operator account codes: `1` Orange, `2` MTN/MoMo, `3` Moov, and `6` Wave. Keep CI payout disabled until the XOF amount scale is confirmed with the merchant.

When correcting a country-specific PPayPros pay-in flow, change only that country's validation path; preserve the Benin phone validation and formatting unless the user explicitly asks to change it.

If PPayPros returns “Signature verification failed” after the phone passes validation, stop changing phone formatting and verify that the merchant number, app ID, signing key, and documented signing method all belong together. Never log or request the credential values in chat.

PPayPros' portal documents MD5 over non-empty parameters sorted by ASCII key, followed by `&key=<private key>`, then uppercase hex. Saving a regenerated merchant private key invalidates the previous one. Its published sample signature is internally inconsistent, so trust the written formula over that sample hash.

After reporting that the PPayPros credentials had been updated, the user confirmed the integration worked after the application was restarted.

Do not enable real PPayPros payins until the merchant confirms that XOF amounts should be multiplied by 100. Do not enable payouts for a country until that country's mobile-money payout method is confirmed.

**Why:** The user requested one source of truth for the PPayPros phone and accurate Benin registration numbers, and later asked to fix Togo without changing Benin; refusing to reinterpret numbers from other countries avoids routing payments to the wrong wallet. Provider-side signature rejection after valid phone normalization points to credentials or signing protocol instead. The merchant portal also invalidates the old signing key when a regenerated one is saved, and its sample hash does not match its own sample input. The API documentation uses a minor-unit amount but does not establish the correct XOF scale in this integration, and its payout mode may not support mobile money. A mismatch could reject, mischarge, or misroute a payment.

**How to apply:** Use the authenticated profile phone for each PPayPros payin and validate/normalize it on both client and server. Route Côte d’Ivoire payout by the published operator code. For signature rejections, verify the current coherent credential set and follow the documented algorithm without logging values; update the Secret after regenerating a key, restart the application, then retest. Keep CI activation blocked until a controlled test verifies XOF scaling, payin callback, payout to an approved test wallet, and payout status reconciliation. Never put merchant credentials in app settings or source code.