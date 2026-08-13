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
        const booking_id = req.params.booking_id
        const booking = await paymentService.successPayment(booking_id as string);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"Booking paid successfully",
            data:{booking}
        });
        res.redirect(`${config.app_url}/api/booking/${booking_id}`);
    }
);

export const paymentController = {
    initilization,
    successPayment
}