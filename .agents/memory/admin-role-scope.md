---
name: Admin role scope
description: Access boundaries between ordinary administrators and super administrators.
---

Non-super administrators may access withdrawal management only. All other administration pages, settings, and actions are reserved for super administrators. Banker-only accounts remain a separate role; an account that is also a non-super administrator must not gain deposit access through the banker area.

**Why:** The user explicitly clarified that ordinary administrators should be limited to withdrawals, including access to settings and other admin pages.

**How to apply:** Enforce this boundary in both the admin interface and server authorization. When adding admin routes, allow ordinary administrators only the withdrawal functions they need; hiding a tab without blocking its API is insufficient.

Permanent account deletion is reserved for super administrators. The user explicitly authorized irreversible removal of the selected account and its associated financial data, while preserving other accounts. Protect super-administrator accounts from this action, and require the target's exact phone number as confirmation.

**Why:** The user requested real database deletion, not banning or hiding accounts. Super-administrator protection prevents accidental loss of administrative access.

**How to apply:** Delete atomically, invalidate the target's sessions, and preserve other users' balances and accounts. Retain gift codes already shared with others by transferring their administrative ownership rather than deleting other users' claims.
