import { Request, Response } from "express";
import { userService } from "./user.service";

const registerUser = async(req:Request,res:Response) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    
};

export const userController = {
    registerUser
};