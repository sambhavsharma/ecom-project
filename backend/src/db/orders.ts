import * as _ from "lodash";
import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    timestamp 
} from "drizzle-orm/pg-core";
import { createUpdateSchema} from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { usersTable } from "./users";
import { orderProductsTable } from "./order_products";
import { addressesTable } from "./addresses";

import { ORDER_STATUSES, CURRENCIES} from "../lib/constants";


export const ordersTable = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: varchar().notNull().default('new'),
    user_id: integer().references(() => usersTable.id).notNull(),  
    seller_id: integer().references(() => usersTable.id).notNull(),
    price: doublePrecision().notNull(),
    currency: varchar({ length: 3 }).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
});

export const orderRelations = relations(ordersTable, ({ many, one }) => ({
    products: many(orderProductsTable),
    address: one(addressesTable, {
        fields: [ordersTable.id],
        references: [addressesTable.parent_id]
    }),
    seller: one(usersTable, {
        fields: [ordersTable.seller_id],
        references: [usersTable.id]
    })
}));

export const createOrderSchema = z.object({
    status: z.enum(ORDER_STATUSES),
    user_id: z.number(),
    seller_id: z.number(),
    price: z.number(),
    currency: z.enum(Object.keys(CURRENCIES))
});;
export const updateOrderSchema = createUpdateSchema(ordersTable).strict();