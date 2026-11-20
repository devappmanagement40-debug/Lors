---
name: Brand theme isolation
description: Scotgold brand identity and RobotPay visual isolation.
---

Apply Scotgold Resources Ltd. branding throughout the application. Preserve RobotPay's legacy appearance for its automatic provider flows. The manual mobile-money submission screen in `/robotpay` follows the supplied payment-page layout, uses the official Scotgold wordmark, and matches the blue background, white cards, and white text palette of the deposit-method selection screen. Show and copy the destination number without its country prefix, and provide a separate copy control for the account-holder name. Its 30-minute countdown starts when a manual operator is selected, remains tied to that payment session, and disables submission after expiry.

**Why:** The user asked for the platform's logo and realistic timer, the existing deposit-selection colors, a local-format destination number, and a copy control for the account-holder name.

**How to apply:** Scope the screenshot-matched styling to the manual-number confirmation component only. Keep automatic operator selection, OTP, processing, and success screens in the legacy RobotPay theme; do not change shared `.ton-theme` styles.