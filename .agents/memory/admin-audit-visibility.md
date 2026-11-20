---
name: Admin audit visibility
description: Who can view the admin action journal and which actions and account details it contains.
---

The administrator settings journal is for super administrators and must show actions performed by non-super administrators, including the actor, affected account, and relevant account numbers.

**Why:** The user asked super administrators to review account credits and other administrative actions while excluding super-administrator actions from the journal.

**How to apply:** Restrict the journal API and UI to super administrators, filter out super-administrator actors, and keep account numbers visible only in this restricted audit view.
