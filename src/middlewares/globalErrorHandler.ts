import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status"

export const globalErrorHandler = (err: any,req:Request,res:Response,next:NextFunction) => {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = err.message || "";
    let errorName = err.name || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode : statusCode,
        name: errorName,
        message : errorMessage,
        error : err.stack
    })
}