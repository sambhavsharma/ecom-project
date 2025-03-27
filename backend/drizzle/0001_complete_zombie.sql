ALTER TABLE "products" ADD COLUMN "is_deleted" boolean;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_at" timestamp;