import * as t from "drizzle-orm/pg-core";

import { timestamp } from "drizzle-orm/pg-core";

import { pkid, timestamps } from "./helpers.js";
import { media } from "./media.js";

export const events = t.pgTable("events", {
  ...pkid,
  ...timestamps,

  content: t.uuid("content").references(() => media.id),
  title: t.varchar("title", { length: 255 }).notNull(),
  slug: t.varchar("slug", { length: 255 }).notNull().unique(),
  description: t.text("description"),
  time: timestamp("time", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  location: t
    .text("location")
    .notNull()
    .default("Narayan Gopal Chowk,Kathmandu"),
});
