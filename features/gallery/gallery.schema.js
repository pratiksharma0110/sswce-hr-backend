import { z } from "zod";


export const createAlbumSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100),

  description: z
    .string()
    .trim()
    .max(300)
    .nullable()
    .optional(),
});


export const updateAlbumSchema =
  createAlbumSchema.partial();


export const albumIdSchema = z.object({
  id: z.uuid(),
});

export const mediaIdSchema = z.object({
  id: z.uuid(),
});



export const addGalleryImageSchema = z.object({
  imageId: z.uuid(),
});


export const galleryItemIdSchema = z.object({
  id: z.uuid(),
});