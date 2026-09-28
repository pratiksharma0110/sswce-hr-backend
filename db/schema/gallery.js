import * as t from "drizzle-orm/pg-core";

import { pkid, timestamps } from "./helpers.js";

import { media } from "./media.js";
import { albums } from "./albums.js";

export const gallery = t.pgTable("gallery", {
  ...pkid,

  ...timestamps,

  image: t
    .uuid("image")
    .notNull()
    .references(() => media.id, {
      onDelete: "cascade",
    }),

  album: t
    .uuid("album")
    .references(() => albums.id, {
      onDelete: "set null",
    }),
});