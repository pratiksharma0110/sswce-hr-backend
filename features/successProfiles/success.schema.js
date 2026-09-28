import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { successProfiles } from "../../db/schema/successProfiles.js";

export const createSuccessSchema = createInsertSchema(successProfiles);
export const updateSuccessSchema = createUpdateSchema(successProfiles);
