import { commonFindById } from "../../common/feature/common.repository.js";
import { commonGetSingleService } from "../../common/feature/common.services.js";
import { albums } from "../../db/schema/albums.js";
import { media } from "../../db/schema/media.js";

import { associateMediaToAlbum } from "./gallery.respository.js";

export async function getSinlgeAlbumService(albumId) {
    const album = await commonGetSingleService(
        albums,
        albumId
    );

    const albumImages = await findImagesByAlbumId(album.id);

    return albumImages;
}


export async function createGalleryService(mediaId, albumId){

    const albumExists = await commonGetSingleService(albums, albumId);
    const mediaExists = await commonGetSingleService(media, mediaId)

    const gallery = await associateMediaToAlbum(mediaId, albumId)

    return gallery;

}