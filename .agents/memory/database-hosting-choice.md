---
name: Database hosting choice
description: Supabase is the sole application database for both Replit and Plesk.
---

Use Supabase PostgreSQL (`SUPABASE_DATABASE_URL`) as the sole application database for both Replit and Plesk. Plesk is a separate app runtime, not a separate data store.

Do not imply that Plesk has a separate production database or request a database migration between Replit and Plesk. Keep both app runtimes pointed at the same Supabase project. Do not run the legacy migration script that truncates Supabase tables.

Drizzle schema pushes must be limited to the application's `public` tables. Supabase has its own schemas, and the shared `public` schema also contains a session table managed outside the Drizzle schema; a broad diff can treat those unrelated tables as rename candidates.

**Why:** The user explicitly changed the hosting choice and authorized moving the application data to Supabase.

**How to apply:** Configure `SUPABASE_DATABASE_URL` in each runtime's environment, without asking the user to share its value; use that Supabase project for schema changes and application data. Keep Drizzle pushes restricted to `public` and the app-owned tables.
