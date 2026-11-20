---
name: Manual deposit availability
description: Manual payment fallback and administrator-notification behavior.
---

An active manual payment number keeps deposits available when no automatic provider is configured. Manual deposits should still be recorded if administrator Telegram notification is unavailable; report the notification failure after saving instead of rejecting the deposit. Preserve specific API validation errors for manual RobotPay requests rather than replacing them with the generic bank-closed message.

**Why:** Users can pay to the configured number and administrators can review the saved deposit in the application even when a separate notification channel is down.

**How to apply:** When changing provider selection, manual deposit creation, or payment error handling, keep manual-number availability independent from automatic provider and Telegram configuration.
