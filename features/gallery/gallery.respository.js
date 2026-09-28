import { asc, eq } from "drizzle-orm";

import { db } from "../../config/db.js";

import {
  albums,
  gallery,
  media,
} from "../../db/schema/index.js";


export async function findImagesByAlbumId(albumId) {
  return db
    .select({
      id: media.id,
      title: media.title,
      alt: media.alt,
      type: media.type,
      url: media.url,
    })
    .from(gallery)
    .innerJoin(
      media,
      eq(gallery.image, media.id),
    )
    .where(
      eq(gallery.album, albumId),
    );
}

export async function associateMediaToAlbum(mediaId, albumId) {

    return db.insert(gallery).values({

        image: mediaId,
        album: albumId

    }).returning()
    
}