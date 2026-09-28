import { db } from "../../config/db.js";
import { eq } from "drizzle-orm";
import { paginateAndSearch } from "../../common/utils/queryhelper.js";
import { appointments } from "../../db/schema/appointment.js";
import { media } from "../../db/schema/media.js";

export async function insertMedia(data) {
  const [result] = await db.insert(media).values(data).returning();
  return result;
}

export async function insertAppointment(data) {
  const [result] = await db.insert(appointments).values(data).returning();
  return result;
}

export async function findAllAppointments(query = {}) {
  return paginateAndSearch(appointments, {
    query: query.search,
    searchFields: query.searchFields,
    page: query.page,
    pageSize: query.pageSize,
    where: query.where,
  });
}

export async function findAppointmentById(id) {
  const [result] = await db
    .select()
    .from(appointments)
    .where(eq(appointments.id, id));
  return result ?? null;
}

export async function updateAppointmentById(id, data) {
  const [result] = await db
    .update(appointments)
    .set(data)
    .where(eq(appointments.id, id))
    .returning();
  return result;
}

export async function deleteAppointmentById(id) {
  const [result] = await db
    .delete(appointments)
    .where(eq(appointments.id, id))
    .returning();
  return result;
}
