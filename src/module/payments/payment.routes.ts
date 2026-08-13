import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.get('/:booking_id/init',paymentController.initilization);

export const paymentRoutes = router