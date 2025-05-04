import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { ordersTable } from "./orders";

const PARENT_TYPES = ["user", "seller", "order"] as const;
const COUNTRY = ["IN", "US", "GB", "SG", "UAE"] as const;

export const addressesTable = pgTable("addresses", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    address1: varchar({ length: 255 }).notNull(),
    address2: varchar({ length: 255 }),
    address3: varchar({ length: 255 }),
    postcode: varchar({ length: 20 }).notNull(),
    city: varchar({ length: 100 }).notNull(),
    state: varchar({ length: 100 }).notNull(),
    country: varchar({ length: 100 }).notNull(),
    parent_id: integer().notNull(),
    parent_type: varchar({ length: 20 }).notNull(),
    is_deleted: boolean().default(false),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const addressRelations = relations(addressesTable, ({ one }) => ({
    order: one(addressesTable, {
        fields: [ordersTable.id],
        references: [addressesTable.parent_id]
    }),
}));


//export const createUserSchema = createInsertSchema(usersTable).strict();
export const createAddressSchema = z.object({
    address1: z.string(),
    address2: z.string(),
    address3: z.string().optional(),
    postcode: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.enum(COUNTRY),
    parent_id: z.number(),
    parent_type:  z.enum(PARENT_TYPES)
});


//createUserSchema.transform((user) => new Date(user.dob));
//export const updateUserSchema = createUpdateSchema(addressesTable).strict();