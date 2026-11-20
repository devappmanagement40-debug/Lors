---
name: RDC-only country scope
description: The product should offer only the Democratic Republic of the Congo and preserve user records during country cleanup.
---

For this app, keep `CD` (the Democratic Republic of the Congo) as the only active and selectable country, with CDF as its displayed currency label. When cleaning country configuration, preserve user accounts, balances, personal withdrawal wallets, and historical deposits, withdrawals, and transactions. Remove only non-`CD` country records, country-specific payment numbers, and country-scoped settings.

**Why:** The user requested RDC-only login and registration and approved removing other country settings while retaining account and transaction data.

**How to apply:** Restrict country APIs, selectors, and editable country settings to `CD`. Perform database cleanup only through an explicit reviewed operation, never during startup seeding.
