import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/new_booking",auth(Role.CUSTOMER,Role.TECHNICIAN),bookingController.createBooking);
router.get("/my_bookings",auth(Role.CUSTOMER,Role.TECHNICIAN,Role.ADMIN),bookingController.getMyBookings);
router.get("/technician_bookings",auth(Role.TECHNICIAN),bookingController.getTechnicianBookings);
router.get("/:id",auth(Role.CUSTOMER,Role.TECHNICIAN),bookingController.getSingleBooking);
router.patch("/:id/status",auth(Role.TECHNICIAN),bookingController.updateBookingStatus);
router.patch("/:id/cancel",auth(Role.CUSTOMER),bookingController.cancelBooking);

export const bookingRoutes = router;
