import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";
import config from "../../config";


const initilization = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const apiResponse = await paymentService.initilization(req.params.booking_id as string);
        sendResponse(res,{
            success:true,
            statusCode: 200,
            message:"Payment initilization done",
            data : {apiResponse}
        });
        // Redirect the user to payment gateway
        // res.redirect(apiResponse.GatewayPageURL);
    }
);

const successPayment = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=>{
        const booking_id = req.params.booking_id as string;
        const val_id = req.body.val_id as string;
        await paymentService.successPayment(booking_id,val_id);
        // the gateway posts here, the customer's browser follows this redirect
        res.redirect(`${config.app_url}/api/booking/${booking_id}`);
    }
);

const failPayment = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=>{
        const booking_id = req.params.booking_id as string;
        await paymentService.failPayment(booking_id);
        // the gateway posts here, the customer's browser follows this redirect
        res.redirect(`${config.app_url}/api/booking/${booking_id}`);
    }
);

const cancelPayment = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=>{
        const booking_id = req.params.booking_id as string;
        await paymentService.cancelPayment(booking_id);
        // the gateway posts here, the customer's browser follows this redirect
        res.redirect(`${config.app_url}/api/booking/${booking_id}`);
    }
);

export const paymentController = {
    initilization,
    successPayment,
    failPayment,
    cancelPayment
}