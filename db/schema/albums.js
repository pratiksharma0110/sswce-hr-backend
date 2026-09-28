import * as t from "drizzle-orm/pg-core";

import { pkid, timestamps } from "./helpers.js";

export const albums = t.pgTable("albums", {
  ...pkid,

  ...timestamps,

  name: t
    .varchar("name", { length: 100 })
    .notNull(),

  description: t.varchar("description", {
    length: 300,
  }),
});