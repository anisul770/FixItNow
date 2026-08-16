import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";
import { newReviewPayload, updateReviewPayload } from "./review.interface";

const createReview = async(bookingId:string,customerId:string,payload:newReviewPayload) => {
    const { rating, comment } = payload;
    if(rating < 1 || rating > 5){
        throw new Error(`rating must be between 1 and 5. You gave ${rating}`);
    };

    const booking = await prisma.booking.findUniqueOrThrow({
        where : {
            id : bookingId
        }
    });
    if(booking.customerId !== customerId){
        throw new Error("You can't review others booking");
    };
    if(booking.status !== BookingStatus.COMPLETED){
        throw new Error("Only a completed booking can be reviewed");
    };

    const existingReview = await prisma.review.findUnique({
        where : {
            bookingId
        }
    });
    if(existingReview){
        throw new Error("This booking is already reviewed");
    };

    const review = await prisma.$transaction(async(tx)=>{
        const createdReview = await tx.review.create({
            data : {
                bookingId,
                customerId,
                technicianId : booking.technicianId,
                rating,
                comment
            }
        });

        const technician = await tx.technicianProfile.findUniqueOrThrow({
            where : {
                id : booking.technicianId
            },
            select : {
                averageRating : true,
                totalReviews : true
            }
        });
        const totalReviews = technician.totalReviews + 1;
        const averageRating = (technician.averageRating * technician.totalReviews + rating) / totalReviews;

        await tx.technicianProfile.update({
            where : {
                id : booking.technicianId
            },
            data : {
                averageRating,
                totalReviews
            }
        });

        return createdReview;
    });
    return review;
};

const getMyReviews = async(customerId:string) => {
    const reviews = await prisma.review.findMany({
        where : {
            customerId
        },
        include : {
            technician : {
                include : {
                    user : {
                        select : {
                            name : true
                        }
                    }
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    });
    return reviews;
};

const updateReview = async(reviewId:string,customerId:string,payload:updateReviewPayload) => {
    const { rating, comment } = payload;
    if(rating !== undefined && (rating < 1 || rating > 5)){
        throw new Error("rating must be between 1 and 5");
    };

    const review = await prisma.review.findUniqueOrThrow({
        where : {
            id : reviewId
        }
    });
    if(review.customerId !== customerId){
        throw new Error("You can't edit others review");
    };

    const updatedReview = await prisma.$transaction(async(tx)=>{
        const result = await tx.review.update({
            where : {
                id : reviewId
            },
            data : {
                rating,
                comment
            }
        });

        // only the rating change moves the technician's average, the review count stays the same
        if(rating !== undefined && rating !== review.rating){
            const technician = await tx.technicianProfile.findUniqueOrThrow({
                where : {
                    id : review.technicianId
                },
                select : {
                    averageRating : true,
                    totalReviews : true
                }
            });
            const averageRating = (technician.averageRating * technician.totalReviews - review.rating + rating) / technician.totalReviews;

            await tx.technicianProfile.update({
                where : {
                    id : review.technicianId
                },
                data : {
                    averageRating
                }
            });
        };

        return result;
    });
    return updatedReview;
};

const getTechnicianReviews = async(technicianId:string) => {
    const reviews = await prisma.review.findMany({
        where : {
            technicianId
        },
        include : {
            customer : {
                select : {
                    name : true
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    });
    return reviews;
};

const getServiceReviews = async(serviceId:string) => {
    const reviews = await prisma.review.findMany({
        where : {
            booking : {
                serviceId
            }
        },
        include : {
            customer : {
                select : {
                    name : true
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    });
    return reviews;
};

export const reviewService = {
    createReview,
    getMyReviews,
    updateReview,
    getTechnicianReviews,
    getServiceReviews
};
