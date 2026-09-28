import path from "path";
import HttpError from "../../common/errors/HttpError.js";
import { StatusCodes } from "http-status-codes";
import {
  insertMedia,
  insertAppointment,
  findAllAppointments,
  findAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} from "./appointment.repository.js";
import { appointments } from "../../db/schema/appointment.js";
import { buildWhereFromQuery } from "../../common/utils/queryhelper.js";

const CV_MIME_TO_TYPE = {
  ".pdf": "pdf",
  ".docx": "docx",
  ".doc": "docx",
};

export async function createAppointmentService(data, cvFile) {
  let cvMediaId = null;

  if (cvFile) {
    const ext = path.extname(cvFile.originalname).toLowerCase();
    const mediaType = CV_MIME_TO_TYPE[ext] ?? "pdf";
    const url = "/" + cvFile.path.split("/").slice(-3).join("/");

    const createdMedia = await insertMedia({
      url,
      alt: cvFile.originalname,
      title: cvFile.originalname,
      type: mediaType,
      caption: "CV / Resume",
    });

    cvMediaId = createdMedia.id;
  }

  const appointment = await insertAppointment({ ...data, cvMediaId });
  return appointment;
}

export async function getAppointmentsService(query) {
  return findAllAppointments({
    search: query.search,
    page: query.page,
    pageSize: query.limit,
    searchFields: [
      appointments.firstName,
      appointments.lastName,
      appointments.email,
      appointments.phone,
    ],
    where: buildWhereFromQuery(appointments, query, ["status"]),
  });
}

export async function getAppointmentService(id) {
  const appointment = await findAppointmentById(id);
  if (!appointment) {
    throw new HttpError(`Appointment not found`, StatusCodes.NOT_FOUND);
  }
  return appointment;
}

export async function updateAppointmentService(id, data) {
  await getAppointmentService(id);
  return updateAppointmentById(id, data);
}

export async function deleteAppointmentService(id) {
  await getAppointmentService(id);
  return deleteAppointmentById(id);
}
