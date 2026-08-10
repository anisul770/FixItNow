import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { serviceSerivce } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// used in technician routes but kept here for consistency
const createService = catchAsync(
    async(req:Request,res:Response,next:NextFunction)=> {
        const payload = req.body;
        console.log(payload,req.user?.id);
        const createdService = await serviceSerivce.createService(payload,req.user?.id as string);
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            message : `${payload.title} service is created successfully`,
            data:{createdService}
        })
    }
);

const getAllServices = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const services = await serviceSerivce.getAllServices();
        sendResponse(res,{
            success: true,
            statusCode: httpStatus.OK,
            message: "All the services are retrieved successfully",
            data : {services}
        });
    }
)

export const serviceController = {
    createService,
    getAllServices
}