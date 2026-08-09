import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// used in admin routes but kept here for consistency
const createCategory = catchAsync(
    async(req:Request,res:Response,next:NextFunction) => {
        const {name} = req.body;
        const category = await categoryService.createCategory(name);
        sendResponse(res,{
            success:true,
            statusCode: httpStatus.CREATED,
            message: `${name} created successfully`,
            data:{category}
        })
    }
);



export const categoryController = {
    createCategory
}