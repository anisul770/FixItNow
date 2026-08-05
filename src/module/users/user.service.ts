import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma"
import config from "../../config";

const registerUserIntoDB = async(paload:any) => {
    const {name,email,password} = paload;
    const hashedPassword = await bcrypt.hash(password,Number(config.salt_rounds));
    const createUser = await prisma.user.create({
        data :{
            name,
            email,
            password : hashedPassword
        }
    });

    const user = await prisma.user.findUniqueOrThrow({
        where : {
            id : createUser.id
        },
        omit:{
            password:true
        },
        include : {
            customerBookings:true,
            technicianBookings:true,
        }
    })
    return user;
};

export const userService = {
    registerUserIntoDB,
}