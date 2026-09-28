import * as t from "drizzle-orm/pg-core";
import { pkid, timestamps } from "./helpers.js";
import { media } from "./media.js";

export const appointmentStatusEnum = t.pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

export const appointments = t.pgTable(
  "appointments",
  {
    ...pkid,
    ...timestamps,

    position: t.varchar("position", { length: 255 }),
    preferredCountry: t.varchar("preferred_country", { length: 255 }),
    applicationType: t.varchar("application_type", { length: 50 }), // "full-time" | "part-time"

    firstName: t.varchar("first_name", { length: 255 }).notNull(),
    lastName: t.varchar("last_name", { length: 255 }).notNull(),
    email: t.varchar("email", { length: 255 }).notNull(),
    phone: t.varchar("phone", { length: 20 }).notNull(),
    location: t.varchar("location", { length: 255 }),
    dateOfBirth: t.varchar("date_of_birth", { length: 20 }),

    highestQualification: t.varchar("highest_qualification", { length: 255 }),
    fieldOfStudy: t.varchar("field_of_study", { length: 255 }),
    institutionName: t.varchar("institution_name", { length: 255 }),
    graduationYear: t.varchar("graduation_year", { length: 10 }),

    totalExperience: t.varchar("total_experience", { length: 50 }),
    currentPosition: t.varchar("current_position", { length: 255 }),
    companyName: t.varchar("company_name", { length: 255 }),
    relevantExperience: t.text("relevant_experience"),

    cvMediaId: t
      .uuid("cv_media_id")
      .references(() => media.id, { onDelete: "set null" }),

    declarationAccepted: t
      .boolean("declaration_accepted")
      .notNull()
      .default(false),

    status: appointmentStatusEnum("status").notNull().default("pending"),
  },
  (table) => ({
    emailIdx: t.index("appointments_email_idx").on(table.email),
    statusIdx: t.index("appointments_status_idx").on(table.status),
    createdAtIdx: t.index("appointments_created_at_idx").on(table.createdAt),
    cvMediaIdx: t.index("appointments_cv_media_idx").on(table.cvMediaId),
  }),
);
