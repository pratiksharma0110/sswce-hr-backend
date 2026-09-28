import * as t from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { pkid, timestamps } from "./helpers.js";
import { media } from "./media.js";

export const jobs = t.pgTable("jobs", {
  ...pkid,
  ...timestamps,

  title: t.varchar("title", { length: 255 }).notNull(),
  slug: t
    .varchar("slug", { length: 255 })
    .notNull()
    .generatedAlwaysAs(
      sql`lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\\s-]', '', 'g'), '\\s+', '-', 'g'))`,
    )
    .unique(),
  description: t.text("description").notNull(),
  salary: t.varchar("salary", { length: 255 }).notNull(),
  experience: t.varchar("experience", { length: 255 }),
  content: t.uuid("content").references(() => media.id),
  workingHours: t.varchar("workingHours", { length: 255 }),
  details: t.jsonb("details"),
});
