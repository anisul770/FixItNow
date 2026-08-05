import { Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const registerUser = async(req:Request,res:Response) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res,{
        success:true,
        statusCode : httpStatus.CREATED,
        message : "User registered successfully",
        data : {user}
    });
};

export const userController = {
    registerUser
};