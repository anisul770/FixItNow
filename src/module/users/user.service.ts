import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma"
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoDB = async (paload: RegisterUserPayload) => {
    const { name, email, password, role } = paload;
    const isUserExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (isUserExists) {
        throw new Error("User already exists with this email");
    };
    const hashedPassword = await bcrypt.hash(password, Number(config.salt_rounds));
    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        }
    });

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: createUser.id
        },
        omit: {
            password: true
        },
        include: {
            customerBookings: true,
            technicianBookings: true,
        }
    });
    return user;
};

const getMyProfileFromDB = async(userId : string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        omit: {
            password:true
        },
        include :{
            profile:true,
            customerBookings: true,
            technicianBookings: true,
            customerReviews:true,
            technicianProfile:true,
            technicianReviews:true
        }
    });
    return user;
}

export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB
}