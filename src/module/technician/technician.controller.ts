import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianServices } from "./technician.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getTechnicianProfile = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        // have to control technician id from customer side 
        const profile = await technicianServices.getTechnicianProfile(req.user?.id as string);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK, 
            message: "Technician profile is retrived successfully",
            data : {profile}
        })
    }
)

const createSlots = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const payload = req.body;
        const createdSlots = await technicianServices.createSlots(payload,req.user?.id as string);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.CREATED,
            message: `${createdSlots.count} slots are created successfully`,
            data : {createdSlots}
        })
    }
)

const getMySlots = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const slots = await technicianServices.getMySlots(req.user?.id as string);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Your slots are retrived successfully",
            data : {slots}
        })
    }
)

const deleteSlot = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const id = req.params.id as string;
        const deletedSlot = await technicianServices.deleteSlot(id,req.user?.id as string);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Slot is deleted successfully",
            data : {deletedSlot}
        })
    }
)

const getAvailabilityByService = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const serviceId = req.params.serviceId as string;
        const slots = await technicianServices.getAvailabilityByService(serviceId);
        sendResponse(res,{
            success: true,
            statusCode : httpStatus.OK,
            message: "Availability is retrived successfully",
            data : {slots}
        })
    }
)

export const technicianController = {
    getTechnicianProfile,
    createSlots,
    getMySlots,
    deleteSlot,
    getAvailabilityByService
}