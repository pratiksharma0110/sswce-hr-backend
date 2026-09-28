import { Router } from "express";

import authRoutes from "./auth/auth.routes.js";
import contactRoutes from "./contact/contact.routes.js";
import userRoutes from "./users/users.routes.js";
import noticeRoutes from "./notices/notices.routes.js";
import mediaRoutes from "./media/media.routes.js";
import blogRoutes from "./blogs/blogs.routes.js";
import authorRoutes from "./authors/authors.routes.js";
import eventRoutes from "./events/events.routes.js";
import layoutRoutes from "./layouts/layouts.routes.js";
import appointmentRoutes from "./appointment/appointment.routes.js";
import successRoutes from "./successProfiles/succes.routes.js";
import testimonialsRoutes from "./testimonials/testimonials.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
router.use("/events", eventRoutes);

router.use("/users", userRoutes);
router.use("/notices", noticeRoutes);
router.use("/media", mediaRoutes);
router.use("/blogs", blogRoutes);
router.use("/authors", authorRoutes);
router.use("/layouts", layoutRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/success", successRoutes);
router.use("/testimonials", testimonialsRoutes);

export default router;
