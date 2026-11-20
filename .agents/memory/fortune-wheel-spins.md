---
name: Fortune wheel turns
description: Eligibility and wallet rules for free fortune-wheel turns and prizes.
---

The wheel is not a daily check-in reward. A referred user receives one free turn for each paid stable-product purchase; their sponsor receives one turn only when that user makes their first paid stable-product purchase. Free products, admin-assigned products, and activity products do not earn turns. Administrators can grant turns to an individual user. Each play consumes one turn. Cash prizes are credited to the deposit balance; product prizes are assigned automatically without a balance debit. The selected result and turn consumption must be atomic and idempotent.

The wheel page should display these exact informational messages without changing the eligibility rules:

> Chaque investissement réussi vous donne droit à une participation au tirage au sort.
>
> Si vous parvenez à inviter un utilisateur à s'inscrire, vous gagnez un tour de roue chanceux

The home-page button label is “Wheel of Fortune”.

Super administrators can configure cash amounts, product prizes, whether each prize is enabled, and each probability. The loss chance plus enabled prize chances must total exactly 100%. The initial configuration preserves the previous effective odds: 20% loss, then 100/200/300/500 CDF at 36/24/16/4 percentage points; the larger 1,500–35,000 CDF labels remain disabled until enabled. Up to twelve segments may be shown. Losses stop on a divider and never credit a balance.

**Why:** the user kept the existing turn-earning rules but later requested configurable prize amounts and probabilities, including automatic product awards. This supersedes the earlier fixed 500 CDF payout cap and cash-only rule; the prior odds remain the initial defaults. The user also confirmed that daily check-in stays separate.

**How to apply:** enforce spin eligibility in the paid stable-purchase transaction regardless of the displayed copy; keep configuration access super-admin-only and audited; save a unique request record in the same transaction as consuming a turn and crediting cash or assigning a product. Animate against the exact configuration snapshot used for that result.
