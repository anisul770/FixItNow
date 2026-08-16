import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";

const router = Router();

router.post("/:bookingId",auth(Role.CUSTOMER),reviewController.createReview);
router.get("/my_reviews",auth(Role.CUSTOMER),reviewController.getMyReviews);
router.get("/technician/:technicianId",reviewController.getTechnicianReviews);
router.get("/service/:serviceId",reviewController.getServiceReviews);
router.patch("/:reviewId",auth(Role.CUSTOMER),reviewController.updateReview);

export const reviewRoutes = router;
