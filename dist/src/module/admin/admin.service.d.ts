import { ActiveStatus } from "../../../generated/prisma/enums";
export declare const adminService: {
    getAllUsers: () => Promise<({
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
    } & {
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        activeStatus: ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    verifyTechnician: (technicianId: string) => Promise<{
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
    updateUserStatus: (userId: string, activeStatus: ActiveStatus) => Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        activeStatus: ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map