import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.get('/:booking_id/init',paymentController.initilization);
router.post('/:booking_id/success',paymentController.successPayment);


export const paymentRoutes = router