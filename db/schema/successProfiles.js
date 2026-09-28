import * as t from "drizzle-orm/pg-core";

import { pkid, timestamps } from "./helpers.js";
import { media } from "./media.js";

export const successProfiles = t.pgTable("success_profiles", {
  ...pkid,
  ...timestamps,

  name: t.varchar("name", { length: 255 }).notNull(),
  batch: t.varchar("batch", { length: 255 }).notNull(),
  profilePic: t.uuid("profile_picture").references(() => media.id),

  description: t.text("description"),
});
