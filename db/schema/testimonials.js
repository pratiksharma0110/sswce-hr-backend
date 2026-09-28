import * as t from "drizzle-orm/pg-core";

import { pkid, timestamps } from "./helpers.js";
import { media } from "./media.js";

export const testimonials = t.pgTable("testimonials", {
  ...pkid,
  ...timestamps,

  title: t.varchar("title", { length: 255 }).notNull(),
  name: t.varchar("name", { length: 255 }).notNull(),
  batch: t.varchar("batch", { length: 255 }).notNull(),

  image: t.uuid("image").references(() => media.id),

  description: t.text("description"),
});
