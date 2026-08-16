import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { categoryController } from "../categories/category.controller";
import { bookingController } from "../bookings/booking.controller";

const router = Router();

router.get("/users",auth(Role.ADMIN),adminController.getAllUsers);
router.post("/new_category",auth(Role.ADMIN),categoryController.createCategory);
router.put("/:id/verify_technician",auth(Role.ADMIN),adminController.verifyTechnician);
router.get("/bookings",auth(Role.ADMIN),bookingController.getAllBookings);
router.patch("/:id/status",auth(Role.ADMIN),adminController.updateUserStatus);

export const adminRoutes = router;