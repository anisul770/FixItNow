import { prisma } from "../../lib/prisma"

const getTechnicianProfile = async(userId:string) => {
    const profile = await prisma.technicianProfile.findUniqueOrThrow({
        where :{
            userId
        },
        include: {
            user : {
                omit : {
                    password : true,
                }
            },
            services: true,
            availability: true,
            bookings : true,
            reviews : true
        }
    });
    return profile
}

export const technicianServices = {
    getTechnicianProfile,
}