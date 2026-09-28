import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { events } from "#/db/schema/events.js";

import { z } from "zod";

export const insertEventSchema = createInsertSchema(events, {
  time: z.coerce.date(),
});

export const updateEventSchema = createUpdateSchema(events, {
  time: z.coerce.date(),
});
