import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { appointments } from "../../db/schema/appointment.js";
import { z } from "zod";

const phoneRegex = /^(\d{10}|\+\d{1,13}|\+\d{1,3} \d{10})$/;

const phoneSchema = z
  .string()
  .trim()
  .regex(phoneRegex, {
    message:
      "Phone number must be exactly 10 digits, or a '+' followed by country code (e.g. +911234567890 or +91 1234567890)",
  });

export const createAppointmentSchema = createInsertSchema(appointments, {
  phone: phoneSchema,
  declarationAccepted: z.coerce.boolean(),
  cvMediaId: z.string().uuid().optional().nullable(),
}).omit({ status: true, id: true, createdAt: true, updatedAt: true });

export const updateAppointmentSchema = createUpdateSchema(appointments).pick({
  status: true,
});