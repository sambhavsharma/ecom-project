ALTER TABLE "orders_products" RENAME TO "order_products";--> statement-breakpoint
ALTER TABLE "order_products" DROP CONSTRAINT "orders_products_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "order_products" DROP CONSTRAINT "orders_products_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;