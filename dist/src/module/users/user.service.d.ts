import { RegisterUserPayload } from "./user.interface";
export declare const userService: {
    registerUserIntoDB: (paload: RegisterUserPayload) => Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            phone: string | null;
            address: string | null;
            userId: string;
        } | null;
        technicianProfile: {
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
        } | null;
        customerBookings: {
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
    } & {
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMyProfileFromDB: (userId: string) => Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            phone: string | null;
            address: string | null;
            userId: string;
        } | null;
        technicianProfile: ({
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
            reviews: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                technicianId: string;
                rating: number;
                customerId: string;
                bookingId: string;
                comment: string | null;
            }[];
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
        }) | null;
        customerBookings: {
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
        customerReviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            rating: number;
            customerId: string;
            bookingId: string;
            comment: string | null;
        }[];
    } & {
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMyProfile: (userId: string, payload: any) => Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            phone: string | null;
            address: string | null;
            userId: string;
        } | null;
        customerBookings: {
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
        customerReviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            rating: number;
            customerId: string;
            bookingId: string;
            comment: string | null;
        }[];
    } & {
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map