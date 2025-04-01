CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"seller_id" varchar(255) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"price" double precision NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url" varchar(255) NOT NULL,
	"type" varchar(255),
	"parent_id" varchar(255) NOT NULL,
	"parent_type" varchar(20) NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "addresses" ALTER COLUMN "parent_id" SET DATA TYPE varchar(255);