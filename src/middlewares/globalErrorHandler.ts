import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status"
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error", err);

    let statusCode : number = httpStatus.BAD_REQUEST;
    let errorMessage = err.message || "";
    let errorName = err.name || "Internal Server Error";

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = httpStatus.BAD_REQUEST;
        errorMessage = "You have provided incorrect field type or missing field"
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Duplicate Key Error"
        } else if (err.code === "P2003") {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Foreign key constraint failed"
        } else if (err.code === "P2025") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "An operation failed because it depends on one or more records that were required but not found"
        } else {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = `Database request error (${err.code})`
        }
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P1000") {
            statusCode = httpStatus.UNAUTHORIZED;
            errorMessage = "Authentication failed against database server. Please Check yout credentials"
        } else if (err.errorCode === "P1001") {
            statusCode = httpStatus.BAD_REQUEST
            errorMessage = "Can't reach database server"
        } else {
            statusCode = httpStatus.INTERNAL_SERVER_ERROR
            errorMessage = "Could not connect to the database"
        }
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        errorMessage = "A critical database engine error occurred"
    } else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        errorMessage = "Error occurred during query execution"
    }

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        name: errorName,
        message: errorMessage,
        error: err.stack
    });
}