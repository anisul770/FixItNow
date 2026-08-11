import { prisma } from "../../lib/prisma";
import { BookingStatus, Role } from "../../../generated/prisma/enums";
import { newBookingPayload } from "./booking.interface";

// which status a technician is allowed to move a booking into
const allowedTransitions : Record<string,BookingStatus[]> = {
    REQUESTED : [BookingStatus.ACCEPTED, BookingStatus.DECLINED],
    ACCEPTED : [BookingStatus.IN_PROGRESS, BookingStatus.CANCELLED],
    PAID : [BookingStatus.IN_PROGRESS],
    IN_PROGRESS : [BookingStatus.COMPLETED]
};

// have to check technician is verified or not before create a booking
const createBooking = async(payload:newBookingPayload,userId:string) => {
    const {serviceId,bookingDate,startTime,address,problemDescription} = payload;

    const service = await prisma.service.findUniqueOrThrow({
        where : {
            id : serviceId
        },
        include : {
            technician : {
                select : {
                    userId : true
                }
            }
        }
    });
    if(!service.isActive){
        throw new Error("This service is not available right now");
    };
    if(service.technician.userId === userId){
        throw new Error("You can not book your own service");
    };

    const [startHour,startMinute] = startTime.split(":").map(Number);
    if(startHour === undefined || startMinute === undefined || Number.isNaN(startHour) || Number.isNaN(startMinute)){
        throw new Error("startTime must be in HH:mm format");
    };
    const endsAt = startHour * 60 + startMinute + service.duration;
    const endTime = `${String(Math.floor(endsAt / 60) % 24).padStart(2,"0")}:${String(endsAt % 60).padStart(2,"0")}`;

    const createdBooking = await prisma.booking.create({
        data : {
            customerId : userId,
            technicianId : service.technicianId,
            serviceId : service.id,
            bookingDate : new Date(bookingDate),
            startTime,
            endTime,
            address,
            problemDescription,
            totalPrice : service.price
        }
    });
    return createdBooking;
};

const getMyBookings = async(userId:string) => {
    const bookings = await prisma.booking.findMany({
        where : {
            customerId : userId
        },
        include : {
            service : {
                select : {
                    title : true,
                    duration : true
                }
            },
            technician : {
                select : {
                    user : {
                        select : {
                            name : true
                        }
                    }
                }
            }
        },
        orderBy : {
            bookingDate : "desc"
        }
    });
    return bookings;
};

const getTechnicianBookings = async(userId:string) => {
    const bookings = await prisma.booking.findMany({
        where : {
            technician : {
                userId
            }
        },
        include : {
            service : {
                select : {
                    title : true,
                    duration : true
                }
            },
            customer : {
                select : {
                    name : true,
                    email : true
                }
            }
        },
        orderBy : {
            bookingDate : "desc"
        }
    });
    return bookings;
};

const getSingleBooking = async(bookingId:string,userId:string) => {
    const booking = await prisma.booking.findUniqueOrThrow({
        where : {
            id : bookingId
        },
        include : {
            service : true,
            technician : {
                select : {
                    userId : true,
                    user : {
                        select : {
                            name : true
                        }
                    }
                }
            },
            customer : {
                select : {
                    name : true,
                    email : true
                }
            }
        }
    });
    if(booking.customerId !== userId && booking.technician.userId !== userId){
        throw new Error("You are not allowed to see this booking");
    };
    return booking;
};

const updateBookingStatus = async(bookingId:string,userId:string,status:BookingStatus) => {
    const booking = await prisma.booking.findUniqueOrThrow({
        where : {
            id : bookingId
        },
        include : {
            technician : {
                select : {
                    userId : true
                }
            }
        }
    });
    if(booking.technician.userId !== userId){
        throw new Error("You are not allowed to update this booking");
    };

    const nextStatuses = allowedTransitions[booking.status] || [];
    if(!nextStatuses.includes(status)){
        throw new Error(`A ${booking.status} booking can not be moved to ${status}`);
    };

    const updatedBooking = await prisma.booking.update({
        where : {
            id : bookingId
        },
        data : {
            status
        }
    });
    return updatedBooking;
}

const cancelBooking = async(bookingId:string,userId:string) => {
    const booking = await prisma.booking.findUniqueOrThrow({
        where : {
            id : bookingId
        }
    });
    if(booking.customerId !== userId){
        throw new Error("You are not allowed to cancel this booking");
    };
    if(booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CANCELLED){
        throw new Error(`A ${booking.status} booking can not be cancelled`);
    };

    const cancelledBooking = await prisma.booking.update({
        where : {
            id : bookingId
        },
        data : {
            status : BookingStatus.CANCELLED
        }
    });
    return cancelledBooking;
}

export const bookingService = {
    createBooking,
    getMyBookings,
    getTechnicianBookings,
    getSingleBooking,
    updateBookingStatus,
    cancelBooking
}
