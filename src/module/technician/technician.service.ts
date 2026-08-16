import { prisma } from "../../lib/prisma"
import { workingHoursPayload } from "./technician.interface"
import { toMinutes,toHHmm } from "../../utils/time"

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

// the technician posts a working window, it is cut into slots of slotDuration minutes
const createSlots = async(payload:workingHoursPayload,userId:string) => {
    const { date, startTime, endTime, slotDuration } = payload;

    if(slotDuration <= 0){
        throw new Error("slotDuration must be greater than 0");
    };
    // Availability.technicianId is a TechnicianProfile id, not a User id
    const technician = await prisma.technicianProfile.findUniqueOrThrow({
        where : {
            userId
        },
        select : {
            id : true
        }
    });

    const startsAt = toMinutes(startTime);
    const endsAt = toMinutes(endTime);
    if(endsAt <= startsAt){
        throw new Error("endTime must be after startTime");
    };

    const slots = [];
    for(let cursor = startsAt; cursor + slotDuration <= endsAt; cursor += slotDuration){
        slots.push({
            technicianId : technician.id,
            date : new Date(date),
            startTime : toHHmm(cursor),
            endTime : toHHmm(cursor + slotDuration)
        });
    };
    if(!slots.length){
        throw new Error("The working hour is shorter than one slot");
    };

    const createdSlots = await prisma.availability.createMany({
        data : slots
    });
    return createdSlots;
}

const getMySlots = async(userId:string) => {
    const slots = await prisma.availability.findMany({
        where : {
            technician : {
                userId
            }
        },
        orderBy : [
            { date : "asc" },
            { startTime : "asc" }
        ]
    });
    return slots;
}

const deleteSlot = async(slotId:string,userId:string) => {
    const slot = await prisma.availability.findUniqueOrThrow({
        where : {
            id : slotId
        },
        include : {
            technician : {
                select : {
                    userId : true
                }
            }
        }
    });
    if(slot.technician.userId !== userId){
        throw new Error("You are not allowed to delete this slot");
    };
    if(slot.isBooked){
        throw new Error("A booked slot can not be deleted");
    };

    const deletedSlot = await prisma.availability.delete({
        where : {
            id : slotId
        }
    });
    return deletedSlot;
}

// customer looking for free upcoming slots of the technician who owns a service
const getAvailabilityByService = async(serviceId:string) => {
    const service = await prisma.service.findUniqueOrThrow({
        where : {
            id : serviceId
        },
        select : {
            technicianId : true,
            duration : true
        }
    });
    const today = new Date();
    today.setHours(0,0,0,0);

    const slots = await prisma.availability.findMany({
        where : {
            technicianId : service.technicianId,
            isBooked : false,
            date : {
                gte : today
            }
        },
        orderBy : [
            { date : "asc" },
            { startTime : "asc" }
        ]
    });

    // only the slots that start a free run long enough for the whole service,
    // otherwise the customer picks a slot that createBooking will reject
    const bookableSlots = slots.filter((slot,index)=>{
        let covered = 0;
        let previousEnd = slot.startTime;
        for(let next = index; next < slots.length && covered < service.duration; next++){
            const candidate = slots[next];
            // the run breaks at a gap, at a booked slot, or at the end of the day
            if(!candidate || candidate.date.getTime() !== slot.date.getTime() || candidate.startTime !== previousEnd){
                break;
            };
            covered += toMinutes(candidate.endTime) - toMinutes(candidate.startTime);
            previousEnd = candidate.endTime;
        };
        return covered >= service.duration;
    });
    return bookableSlots;
}

const getAllTechnician = async() => {
    const technicians = await prisma.technicianProfile.findMany({
        include : {
            user : {
                omit : {
                    password : true
                }
            }
        }
    });
    return technicians;
}

export const technicianServices = {
    getTechnicianProfile,
    createSlots,
    getMySlots,
    deleteSlot,
    getAvailabilityByService,
    getAllTechnician
}