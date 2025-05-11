import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp,
    date,
    text 
} from "drizzle-orm/pg-core";
import {createUpdateSchema} from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';
import { productsTable } from "./products";
import { mediaTable } from "./media";


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    first_name: varchar({ length: 255 }),
    last_name: varchar({ length: 255 }),
    email: varchar({ length: 255 }).unique().notNull(),
    phone:  varchar({ length: 50 }),
    dob: date({mode: "date"}),
    bio: text(),
    password: varchar({ length: 255 }),
    email_verified: boolean().default(false).notNull(),
    phone_verified: boolean().default(false).notNull(),
    is_deleted: boolean().default(false).notNull(),
    last_login: timestamp({ withTimezone: true }),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date()).notNull()

});

export const usersRelations = relations(usersTable, ({ many }) => ({
	products: many(productsTable),
    media: many(mediaTable)
}));


export const createUserSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string(),
    phone:  z.string().optional(),
    dob: z.string().date().optional(),
    bio: z.string().optional(),
    password: z.string().optional(),
    addresses: z.object({}).array().optional()
}).strict();

//createUserSchema.transform((user) => new Date(user.dob));
export const updateUserSchema = createUpdateSchema(usersTable).strict();