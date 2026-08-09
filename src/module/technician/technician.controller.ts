import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianServices } from "./technician.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getTechnicianProfile = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const profile = await technicianServices.getTechnicianProfile(req.user?.id as string);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Technician profile is retrived successfully",
            data : {profile}
        })
    }
)

export const technicianController = {
    getTechnicianProfile
}