import { prisma } from "../../lib/prisma"
import { ActiveStatus } from "../../../generated/prisma/enums"

const getAllUsers = async() =>{
    const users = await prisma.user.findMany({
        omit : {
            password : true,
        },
        orderBy : {
            createdAt : "desc"
        },
        include: {
            profile :true,
            technicianProfile: true
        }
    });
    return users
}

const verifyTechnician = async(technicianId : string) => {
    const isExistTechnician = await prisma.technicianProfile.findUniqueOrThrow({
        where: {
            id: technicianId
        }
    });
    if(!isExistTechnician){
        throw new Error("The technician is not exist");
    };
    const verifiedTechnician = await prisma.technicianProfile.update({
        where:{
            id:technicianId
        },
        data:{
            verified:true
        }
    });
    return verifiedTechnician;
};

const updateUserStatus = async(userId : string, activeStatus : ActiveStatus) => {
    const updatedUser = await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            activeStatus
        },
        omit : {
            password : true
        }
    });
    return updatedUser;
};

export const adminService = {
    getAllUsers,
    verifyTechnician,
    updateUserStatus
}