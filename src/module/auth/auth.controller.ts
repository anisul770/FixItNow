import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginUser = async(req:Request,res:Response)=> {
    const payload = req.body;
    const {accessToken,refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken",accessToken,{
        httpOnly : true,
        secure:true,
        sameSite: "none",
        maxAge : 1000*60*60*24
    });
    res.cookie("refreshToken",refreshToken,{
        httpOnly : true,
        secure:true,
        sameSite: "none",
        maxAge : 1000*60*60*24*7
    });
    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message : "User is login successfully",
        data : {
            accessToken,
            refreshToken
        }
    });
}

export const authController = {
    loginUser
}