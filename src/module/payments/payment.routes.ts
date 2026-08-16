import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get('/:booking_id/init',auth(Role.CUSTOMER),paymentController.initilization);
router.post('/:booking_id/success',paymentController.successPayment);
router.post('/:booking_id/fail',paymentController.failPayment);
router.post('/:booking_id/cancel',paymentController.cancelPayment);
router.get('/my_payments',auth(Role.CUSTOMER),paymentController.getMyPayments);
router.get('/:booking_id/details',auth(Role.CUSTOMER,Role.ADMIN),paymentController.getPaymentDetails);


export const paymentRoutes = router