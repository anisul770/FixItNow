import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";
import config from "../../config";
const initilization = catchAsync(async (req, res, next) => {
    const apiResponse = await paymentService.initilization(req.params.booking_id, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment initilization done",
        data: { apiResponse }
    });
    // Redirect the user to payment gateway
    // res.redirect(apiResponse.GatewayPageURL);
});
const successPayment = catchAsync(async (req, res, next) => {
    const booking_id = req.params.booking_id;
    const val_id = req.body.val_id;
    await paymentService.successPayment(booking_id, val_id);
    // the gateway posts here, the customer's browser follows this redirect
    res.redirect(`${config.app_url}/api/booking/${booking_id}`);
});
const failPayment = catchAsync(async (req, res, next) => {
    const booking_id = req.params.booking_id;
    await paymentService.failPayment(booking_id);
    // the gateway posts here, the customer's browser follows this redirect
    res.redirect(`${config.app_url}/api/booking/${booking_id}`);
});
const cancelPayment = catchAsync(async (req, res, next) => {
    const booking_id = req.params.booking_id;
    await paymentService.cancelPayment(booking_id);
    // the gateway posts here, the customer's browser follows this redirect
    res.redirect(`${config.app_url}/api/booking/${booking_id}`);
});
const getMyPayments = catchAsync(async (req, res, next) => {
    const payments = await paymentService.getMyPayments(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your payments are retrieved successfully",
        data: { payments }
    });
});
const getPaymentDetails = catchAsync(async (req, res, next) => {
    const booking_id = req.params.booking_id;
    const payment = await paymentService.getPaymentDetails(booking_id, req.user?.id, req.user?.role);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment details are retrieved successfully",
        data: { payment }
    });
});
const getAllPayments = catchAsync(async (req, res, next) => {
    const payments = await paymentService.getAllPayments();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All payments are retrieved successfully",
        data: { payments }
    });
});
export const paymentController = {
    initilization,
    successPayment,
    failPayment,
    cancelPayment,
    getMyPayments,
    getPaymentDetails,
    getAllPayments
};
//# sourceMappingURL=payment.controller.js.map