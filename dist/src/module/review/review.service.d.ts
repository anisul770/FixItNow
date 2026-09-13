import { newReviewPayload, updateReviewPayload } from "./review.interface";
export declare const reviewService: {
    createReview: (bookingId: string, customerId: string, payload: newReviewPayload) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        rating: number;
        customerId: string;
        bookingId: string;
        comment: string | null;
    }>;
    getMyReviews: (customerId: string) => Promise<({
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        rating: number;
        customerId: string;
        bookingId: string;
        comment: string | null;
    })[]>;
    updateReview: (reviewId: string, customerId: string, payload: updateReviewPayload) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        rating: number;
        customerId: string;
        bookingId: string;
        comment: string | null;
    }>;
    getTechnicianReviews: (technicianId: string) => Promise<({
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
    })[]>;
    getServiceReviews: (serviceId: string) => Promise<({
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
    })[]>;
};
//# sourceMappingURL=review.service.d.ts.map