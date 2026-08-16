import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";
import httpStatus from "http-status";

const createReview = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const bookingId = req.params.bookingId as string;
        const review = await reviewService.createReview(bookingId,req.user?.id as string,req.body);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.CREATED,
            message: "Review is submitted successfully",
            data : {review}
        })
    }
);

const getMyReviews = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const reviews = await reviewService.getMyReviews(req.user?.id as string);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Your reviews are retrived successfully",
            data : {reviews}
        })
    }
);

const updateReview = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const reviewId = req.params.reviewId as string;
        const review = await reviewService.updateReview(reviewId,req.user?.id as string,req.body);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Review is updated successfully",
            data : {review}
        })
    }
);

const getTechnicianReviews = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const technicianId = req.params.technicianId as string;
        const reviews = await reviewService.getTechnicianReviews(technicianId);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Reviews are retrived successfully",
            data : {reviews}
        })
    }
);

const getServiceReviews = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const serviceId = req.params.serviceId as string;
        const reviews = await reviewService.getServiceReviews(serviceId);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Reviews are retrived successfully",
            data : {reviews}
        })
    }
);

export const reviewController = {
    createReview,
    getMyReviews,
    updateReview,
    getTechnicianReviews,
    getServiceReviews
};
