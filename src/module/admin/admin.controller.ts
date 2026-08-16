import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status";

const getAllUsers = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const users = await adminService.getAllUsers();
        sendResponse(res,{
            success: true,
            statusCode : httpstatus.OK,
            message: "All Users are fetched successfully",
            data : {users}
        })
    }
);

const verifyTechnician = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const technicianId = req.params.id;
        const verifiedTechnician = await adminService.verifyTechnician(technicianId as string);
        sendResponse(res,{
            success: true,
            statusCode:httpstatus.OK,
            message:"Technician verified successfully",
            data : {verifiedTechnician}
        });
    }
)

const updateUserStatus = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const userId = req.params.id as string;
        const { activeStatus } = req.body;
        const updatedUser = await adminService.updateUserStatus(userId,activeStatus);
        sendResponse(res,{
            success: true,
            statusCode:httpstatus.OK,
            message:"User status updated successfully",
            data : {updatedUser}
        });
    }
)

export const adminController = {
    getAllUsers,
    verifyTechnician,
    updateUserStatus
}