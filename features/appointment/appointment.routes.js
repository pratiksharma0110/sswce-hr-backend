import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../../common/authentication/auth.js";
import upload from "../media/media.middleware.js";
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} from "./appointment.controller.js";

export const router = Router();

router
  .route("/")
  .post(upload.fields([{ name: "documents", maxCount: 1 }]), createAppointment)
  .get(authenticateUser, authorizePermissions("admin"), getAppointments);

router
  .route("/:id")
  .all(authenticateUser, authorizePermissions("admin"))
  .get(getAppointment)
  .patch(updateAppointment)
  .delete(deleteAppointment);

export default router;
