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

export const adminController = {
    getAllUsers
}