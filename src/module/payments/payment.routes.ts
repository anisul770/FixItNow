import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.get('/:booking_id/init',paymentController.initilization);
router.post('/:booking_id/success',paymentController.successPayment);
router.post('/:booking_id/fail',paymentController.failPayment);
router.post('/:booking_id/cancel',paymentController.cancelPayment);


export const paymentRoutes = router