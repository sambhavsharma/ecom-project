import { 
    integer, 
    pgTable, 
    varchar, 
    timestamp,
    time 
} from "drizzle-orm/pg-core";
import {createUpdateSchema} from "drizzle-zod";
import { z } from "zod";

const TYPES = ["reset_password","verify_email"] as const;
const PARENT_TYPES = ["user","seller"] as const;
const STATUSES = ["new", "used"] as const;

export const authTokensTable = pgTable("auth_tokens", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    code: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 50 }).notNull(),
    parent_id: integer().notNull(),
    parent_type: varchar({ length: 20 }).notNull(),
    status: varchar({ length: 20 }).notNull(),
    expires_at: time({ withTimezone: true }),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
});

export const createAuthTokensSchema = z.object({
    code: z.string(),
    type:  z.enum(TYPES),
    parent_id: z.string(),
    parent_type: z.enum(PARENT_TYPES),
    status:  z.enum(STATUSES),
    expires_at: z.string().time()
}).strict();

export const updateAuthTokensSchema = createUpdateSchema(authTokensTable).strict();