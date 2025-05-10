import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp 
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from 'drizzle-orm';
import { mediaTable } from "./media";


export const brandsTable = pgTable("brands", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    code:  varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull().unique(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
});

export const brandRelations = relations(brandsTable, ({ one }) => ({
    media: one(mediaTable, {
        fields: [brandsTable.id],
        references: [mediaTable.parent_id]
    })
}));

export const createBrandSchema = z.object({
    name: z.string(),
    code: z.string(),
    media: z.object({}).array().optional()
});