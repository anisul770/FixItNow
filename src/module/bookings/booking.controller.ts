import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBooking = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const payload = req.body;
        const createdBooking = await bookingService.createBooking(payload,req.user?.id as string);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message : "Booking request is created successfully",
            data:{createdBooking}
        })
    }
);

const getMyBookings = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const bookings = await bookingService.getMyBookings(req.user?.id as string);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message : "Your bookings are retrieved successfully",
            data:{bookings}
        })
    }
);

const getTechnicianBookings = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const bookings = await bookingService.getTechnicianBookings(req.user?.id as string);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message : "Your incoming bookings are retrieved successfully",
            data:{bookings}
        })
    }
);

const getSingleBooking = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const id = req.params.id as string;
        const booking = await bookingService.getSingleBooking(id,req.user?.id as string);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message : "Booking is retrieved successfully",
            data:{booking}
        })
    }
);

const updateBookingStatus = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const id = req.params.id as string;
        const { status } = req.body;
        const updatedBooking = await bookingService.updateBookingStatus(id,req.user?.id as string,status);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message : `Booking status is updated to ${status}`,
            data:{updatedBooking}
        })
    }
);

const cancelBooking = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const id = req.params.id as string;
        const cancelledBooking = await bookingService.cancelBooking(id,req.user?.id as string);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message : "Booking is cancelled successfully",
            data:{cancelledBooking}
        })
    }
);

const getAllBookings = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const bookings = await bookingService.getAllBookings();
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message : "All bookings are retrieved successfully",
            data:{bookings}
        })
    }
);

export const bookingController = {
    createBooking,
    getMyBookings,
    getTechnicianBookings,
    getSingleBooking,
    updateBookingStatus,
    cancelBooking,
    getAllBookings
}
