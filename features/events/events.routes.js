import { Router } from "express";

import { insertEventSchema } from "./events.schema.js";
import {
  createEventController,
  getEventsController,
  updateEventController,
  deleteEventController,
  getSingleEventController,
} from "./events.controller.js";
import {
  authenticateUser,
  authorizePermissions,
} from "#/common/authentication/auth.js";
import {
  commonCreateController,
  commonGetController,
  commonGetSingleBySlugController,
  commonGetSingleController,
} from "../../common/feature/common.controller.js";
import { events } from "../../db/schema/events.js";
import { join } from "../../common/utils/queryhelper.js";
import { media } from "../../db/schema/media.js";
import { desc, eq, getTableColumns } from "drizzle-orm";

export const router = Router();

router
  .route("/")
  .get((req, res) =>
    commonGetController(
      req,
      res,
      join(events, media, {
        on: eq(events.content, media.id),
        name: "events",
        fields: {
          ...getTableColumns(events),
          mediaUrl: media.url,
          mediaType: media.type,
          mediaAlt: media.alt,
        },
        type: "left",
      }),
      [],
      desc(events.createdAt),
    ),
  )
  .post(authenticateUser, authorizePermissions("admin"), (req, res) =>
    commonCreateController(req, res, events, insertEventSchema),
  );

router.route("/");

router.route("/:id").get((req, res) =>
  commonGetSingleController(
    req,
    res,
    join(events, media, {
      on: eq(events.content, media.id),
      name: "events",
      fields: {
        ...getTableColumns(events),
        mediaUrl: media.url,
        mediaType: media.type,
      },
      type: "left",
    }),
  ),
);

router.route("/slug/:slug").get((req, res) =>
  commonGetSingleBySlugController(
    req,
    res,
    join(events, media, {
      on: eq(events.content, media.id),
      name: "events",
      fields: {
        ...getTableColumns(events),
        mediaUrl: media.url,
        mediaType: media.type,
      },
      type: "left",
    }),
  ),
);

router
  .route("/:id")
  .all(authenticateUser, authorizePermissions("admin"))
  .patch(updateEventController)
  .delete(deleteEventController);

export default router;
