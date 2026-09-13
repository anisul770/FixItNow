import { BookingStatus } from "../../../generated/prisma/enums";
import { newBookingPayload } from "./booking.interface";
export declare const bookingService: {
    createBooking: (payload: newBookingPayload, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        startTime: string;
        endTime: string;
        technicianId: string;
        serviceId: string;
        customerId: string;
        bookingDate: Date;
        problemDescription: string | null;
        totalPrice: number;
        status: BookingStatus;
    }>;
    getMyBookings: (userId: string) => Promise<({
        technician: {
            user: {
                name: string;
            };
        };
        service: {
            title: string;
            duration: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        startTime: string;
        endTime: string;
        technicianId: string;
        serviceId: string;
        customerId: string;
        bookingDate: Date;
        problemDescription: string | null;
        totalPrice: number;
        status: BookingStatus;
    })[]>;
    getTechnicianBookings: (userId: string) => Promise<({
        service: {
            title: string;
            duration: number;
        };
        customer: {
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        startTime: string;
        endTime: string;
        technicianId: string;
        serviceId: string;
        customerId: string;
        bookingDate: Date;
        problemDescription: string | null;
        totalPrice: number;
        status: BookingStatus;
    })[]>;
    getSingleBooking: (bookingId: string, userId: string) => Promise<{
        technician: {
            user: {
                name: string;
            };
            userId: string;
        };
        service: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            categoryId: string;
            title: string;
            description: string;
            price: number;
            duration: number;
            rating: number;
            isActive: boolean;
        };
        customer: {
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        startTime: string;
        endTime: string;
        technicianId: string;
        serviceId: string;
        customerId: string;
        bookingDate: Date;
        problemDescription: string | null;
        totalPrice: number;
        status: BookingStatus;
    }>;
    updateBookingStatus: (bookingId: string, userId: string, status: BookingStatus) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        startTime: string;
        endTime: string;
        technicianId: string;
        serviceId: string;
        customerId: string;
        bookingDate: Date;
        problemDescription: string | null;
        totalPrice: number;
        status: BookingStatus;
    }>;
    cancelBooking: (bookingId: string, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        startTime: string;
        endTime: string;
        technicianId: string;
        serviceId: string;
        customerId: string;
        bookingDate: Date;
        problemDescription: string | null;
        totalPrice: number;
        status: BookingStatus;
    }>;
    getAllBookings: () => Promise<({
        technician: {
            user: {
                name: string;
            };
        };
        service: {
            title: string;
            duration: number;
        };
        customer: {
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        startTime: string;
        endTime: string;
        technicianId: string;
        serviceId: string;
        customerId: string;
        bookingDate: Date;
        problemDescription: string | null;
        totalPrice: number;
        status: BookingStatus;
    })[]>;
};
//# sourceMappingURL=booking.service.d.ts.map