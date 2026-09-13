import { workingHoursPayload } from "./technician.interface";
export declare const technicianServices: {
    getTechnicianProfile: (userId: string) => Promise<{
        services: {
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
        }[];
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            startTime: string;
            endTime: string;
            technicianId: string;
            isBooked: boolean;
        }[];
        bookings: {
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
            status: import("../../../generated/prisma/enums").BookingStatus;
        }[];
        reviews: ({
            customer: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            rating: number;
            customerId: string;
            bookingId: string;
            comment: string | null;
        })[];
        user: {
            id: string;
            email: string;
            name: string;
            role: import("../../../generated/prisma/enums").Role;
            activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        skills: string[];
        location: string | null;
        experience: number;
        hourlyRate: number;
        averageRating: number;
        totalReviews: number;
        verified: boolean;
        userId: string;
    }>;
    createSlots: (payload: workingHoursPayload, userId: string) => Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    getMySlots: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        startTime: string;
        endTime: string;
        technicianId: string;
        isBooked: boolean;
    }[]>;
    deleteSlot: (slotId: string, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        startTime: string;
        endTime: string;
        technicianId: string;
        isBooked: boolean;
    }>;
    getAvailabilityByService: (serviceId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        startTime: string;
        endTime: string;
        technicianId: string;
        isBooked: boolean;
    }[]>;
    getAllTechnician: () => Promise<({
        user: {
            id: string;
            email: string;
            name: string;
            role: import("../../../generated/prisma/enums").Role;
            activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        skills: string[];
        location: string | null;
        experience: number;
        hourlyRate: number;
        averageRating: number;
        totalReviews: number;
        verified: boolean;
        userId: string;
    })[]>;
};
//# sourceMappingURL=technician.service.d.ts.map