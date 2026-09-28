import { Router } from "express";
import { join } from "#/common/utils/queryhelper.js";
import { desc, eq } from "drizzle-orm";
import { media } from "#/db/schema/media.js";
import { getTableColumns } from "drizzle-orm";
import {
  commonCreateController,
  commonGetController,
  commonGetSingleController,
} from "#/common/feature/common.controller.js";

import {
  authenticateUser,
  authorizePermissions,
} from "#/common/authentication/auth.js";
import {
  commonDeleteController,
  commonGetSingleBySlugController,
  commonUpdateController,
} from "../../common/feature/common.controller.js";
import { successProfiles } from "../../db/schema/successProfiles.js";
import { createSuccessSchema, updateSuccessSchema } from "./success.schema.js";

const router = Router();

router
  .route("/")
  .get((req, res) =>
    commonGetController(
      req,
      res,
      join(successProfiles, media, {
        on: eq(successProfiles.profilePic, media.id),
        name: "successProfiles",
        fields: {
          ...getTableColumns(successProfiles),
          mediaUrl: media.url,
          mediaType: media.type,
          mediaAlt: media.alt,
        },
        type: "left",
      }),
      [],
      desc(successProfiles.createdAt),
    ),
  )
  .post(authenticateUser, authorizePermissions("admin"), (req, res) =>
    commonCreateController(req, res, successProfiles, createSuccessSchema),
  );

router.route("/:id").get((req, res) =>
  commonGetSingleController(
    req,
    res,
    join(successProfiles, media, {
      on: eq(successProfiles.profilePic, media.id),
      name: "successProfiles",
      fields: {
        ...getTableColumns(successProfiles),
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
    join(successProfiles, media, {
      on: eq(successProfiles.profilePic, media.id),
      name: "successProfiles",
      fields: {
        ...getTableColumns(successProfiles),
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
  .patch((req, res) =>
    commonUpdateController(req, res, successProfiles, updateSuccessSchema),
  )
  .delete((req, res) => commonDeleteController(req, res, successProfiles));

export default router;
