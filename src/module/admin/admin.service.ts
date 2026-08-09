import { prisma } from "../../lib/prisma"

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

export const adminService = {
    getAllUsers
}