import { StatusCodes } from "http-status-codes";
import { parseBody } from "../../common/utils/parse.js";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "./appointment.schema.js";
import {
  createAppointmentService,
  getAppointmentsService,
  getAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
} from "./appointment.service.js";

export async function createAppointment(req, res) {
  const data = parseBody(createAppointmentSchema, {
    ...req.body,
    declarationAccepted:
      req.body.declarationAccepted === "true" ||
      req.body.declarationAccepted === true,
  });

  const appointment = await createAppointmentService(data, req.files?.documents?.[0]);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Application submitted successfully.",
    appointment,
  });
}

export async function getAppointments(req, res) {
  const result = await getAppointmentsService(req.query);

  res.status(StatusCodes.OK).json({
    success: true,
    resource: "appointments",
    ...result,
  });
}

export async function getAppointment(req, res) {
  const appointment = await getAppointmentService(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    item: appointment,
  });
}

export async function updateAppointment(req, res) {
  const data = parseBody(updateAppointmentSchema, req.body);
  const appointment = await updateAppointmentService(req.params.id, data);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Appointment updated successfully.",
    appointment,
  });
}

export async function deleteAppointment(req, res) {
  await deleteAppointmentService(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Appointment deleted successfully.",
  });
}
