import express from "express";
import {
    commonCreateController,
    commonGetController,
} from "../../common/feature/common.controller.js";
import { albums } from "../../db/schema/albums.js";
import { createAlbumSchema } from "./gallery.schema.js";
import {
    createGalleryController,
    getSingleAlbumController,
} from "./gallery.controller.js";
import {
    authenticateUser,
    authorizePermissions,
} from "../../common/authentication/auth.js";
import { gallery } from "../../db/schema/gallery.js";

const router = express.Router();

// Get all albums
// Create an album
router
    .route("/")
    .get((req, res) => commonGetController(req, res, albums))
    .post(authenticateUser, authorizePermissions("admin"), (req, res) =>
        commonCreateController(req, res, albums, createAlbumSchema),
    );

// Get single album (all images in it)
// Insert a media to specified album
router
    .route("/:id")
    .get(getSingleAlbumController)
    .post(
        authenticateUser,
        authorizePermissions("admin"),
        createGalleryController,
    );

export default router;
