ALTER TABLE "deposits"
  ADD COLUMN IF NOT EXISTS "clapay_transaction_id" text,
  ADD COLUMN IF NOT EXISTS "clapay_signature" text;
--> statement-breakpoint
ALTER TABLE "withdrawals"
  ADD COLUMN IF NOT EXISTS "clapay_transaction_id" text,
  ADD COLUMN IF NOT EXISTS "clapay_signature" text;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "deposits_clapay_transaction_id_idx"
  ON "deposits" ("clapay_transaction_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "deposits_clapay_signature_idx"
  ON "deposits" ("clapay_signature");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "withdrawals_clapay_transaction_id_idx"
  ON "withdrawals" ("clapay_transaction_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "withdrawals_clapay_signature_idx"
  ON "withdrawals" ("clapay_signature");
