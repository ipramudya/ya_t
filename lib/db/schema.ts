import { relations, sql } from "drizzle-orm";
import {
    pgEnum,
    pgTable,
    timestamp,
    uuid,
    varchar,
    integer,
    text
} from "drizzle-orm/pg-core";

const timestamps = {
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
};

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar({ length: 255 }).notNull(),
    username: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    ...timestamps
});

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const profilesTable = pgTable("profiles", {
    id: uuid().primaryKey().defaultRandom(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    gender: genderEnum().notNull(),
    birthdate: timestamp("birthdate").notNull(),
    height: integer().notNull(),
    weight: integer().notNull(),
    interests: text()
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),
    profileURL: varchar("profile_url", { length: 255 }).notNull(),
    ...timestamps,
    userId: uuid("user_id")
        .references(() => usersTable.id, { onDelete: "cascade" })
        .notNull()
});

export const usersRelation = relations(usersTable, ({ one }) => ({
    profiles: one(profilesTable)
}));
