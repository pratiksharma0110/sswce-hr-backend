import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { notices } from "../../db/schema/notices.js";

export const createNoticeSchema = createInsertSchema(notices);
export const updateNoticeSchema = createUpdateSchema(notices);
