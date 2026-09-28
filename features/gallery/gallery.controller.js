import { StatusCodes } from "http-status-codes";
import { commonGetSingleService } from "../../common/feature/common.services.js";
import { parseBody } from "../../common/utils/parse.js";
import { albums } from "../../db/schema/albums.js";
import { associateMediaToAlbum, findImagesByAlbumId } from "./gallery.respository.js";
import { albumIdSchema, mediaIdSchema } from "./gallery.schema.js";
import { createGalleryService, getSinlgeAlbumService } from "./gallery.service.js";

export async function getSingleAlbumController(req, res){

    const images = await getSinlgeAlbumService(parseBody(albumIdSchema, req.params))

    res.status(StatusCodes.OK).json({
        success: true,
        ...images
    })

}


export async function createGalleryController(req, res){

    const mediaId = parseBody(mediaIdSchema, req.body)
    const albumId = parseBody(albumIdSchema, req.params)

    const gallery = await createGalleryService(mediaId, albumId)

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Image added to album",
        ...gallery
    })

}