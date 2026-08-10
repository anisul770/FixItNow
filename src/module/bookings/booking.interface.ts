import { BookingStatus } from "../../../generated/prisma/enums";

export interface newBookingPayload {
    serviceId : string;
    bookingDate : string;
    startTime : string;
    address : string;
    problemDescription? : string;
}

export interface updateStatusPayload {
    status : BookingStatus;
}
