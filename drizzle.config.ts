import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("SUPABASE_DATABASE_URL or DATABASE_URL is not configured.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  schemaFilter: ["public"],
  tablesFilter: [
    "admin_audit_log",
    "countries",
    "deposits",
    "fortune_wheel_spin_requests",
    "gift_code_claims",
    "gift_codes",
    "payment_channels",
    "payment_numbers",
    "platform_settings",
    "products",
    "referral_commissions",
    "staking_products",
    "tasks",
    "transactions",
    "user_products",
    "user_stakings",
    "user_tasks",
    "users",
    "withdrawals",
    "withdrawal_wallets",
  ],
  dbCredentials: {
    url: databaseUrl,
  },
});
