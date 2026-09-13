import { IServiceQuery, newServicePayload } from "./service.interface";
export declare const serviceSerivce: {
    createService: (payload: newServicePayload, userId: string) => Promise<{
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
    }>;
    getAllServices: (query: IServiceQuery) => Promise<({
        technician: {
            user: {
                name: string;
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
        };
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            icon: string | null;
        };
    } & {
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
    })[]>;
};
//# sourceMappingURL=service.service.d.ts.map