import { prisma } from "../../lib/prisma";
import { newServicePayload } from "./service.interface"

// used in technician routes but kept here for consistency
const createService = async(payload:newServicePayload,userId:string) => {
    const {title,price,description,duration,categoryId} = payload;
    const isExist = await prisma.service.findFirst({
        where:{
            technician : { userId },
            categoryId,
            title,
            price,
            description,
            duration
        }
    });
    if(isExist){
        throw new Error("You already have the same service with the same information");
    };
    const createdService = await prisma.service.create({
        data:{
            title,
            description,
            price,
            duration,
            technician : {connect : {userId}},
            category   : { connect : { id : categoryId } }
        },
        include : {
            technician : {
                include: {
                    user : {
                        omit:{
                            password:true
                        },
                        include : {
                            profile: true
                        }
                    }
                }
            },
            category:true
        }
    });
    return createdService;
}

export const serviceSerivce = {
    createService
}