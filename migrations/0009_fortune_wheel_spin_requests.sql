CREATE TABLE IF NOT EXISTS public."fortune_wheel_spin_requests" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" integer NOT NULL REFERENCES public."users"("id") ON DELETE CASCADE,
  "request_id" varchar(80) NOT NULL,
  "outcome_type" text NOT NULL,
  "prize_id" text,
  "prize_index" integer,
  "loss_boundary_index" integer,
  "amount" integer,
  "product_id" integer,
  "product_name" text,
  "segments_snapshot" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "fortune_wheel_spin_requests_user_request_unique"
  ON public."fortune_wheel_spin_requests" USING btree ("user_id", "request_id");
