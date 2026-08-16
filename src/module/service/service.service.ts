import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IServiceQuery, newServicePayload } from "./service.interface"

// used in technician routes but kept here for consistency
const createService = async (payload: newServicePayload, userId: string) => {
    const { title, price, description, duration, categoryId } = payload;
    const isExist = await prisma.service.findFirst({
        where: {
            technician: { userId },
            categoryId,
            title,
            price,
            description,
            duration
        }
    });
    if (isExist) {
        throw new Error("You already have the same service with the same information");
    };
    const createdService = await prisma.service.create({
        data: {
            title,
            description,
            price,
            duration,
            technician: { connect: { userId } },
            category: { connect: { id: categoryId } }
        }
    });
    return createdService;
}

const getAllServices = async (query: IServiceQuery) => {
    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;

    const skip = (page - 1) * limit
    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";
    const andConditions: ServiceWhereInput[] = []

    if (query.searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                }
            ]
        })
    }
    if (query.title) {
        andConditions.push({
            title: query.title
        })
    }
    if (query.price) {
        andConditions.push({
            price: { gte: Number(query.price) }
        })
    }
    if (query.categoryId) {
        andConditions.push({
            categoryId: query.categoryId
        })
    }
    if (query.location) {
        andConditions.push({
            technician: {
                location: query.location
            }
        })
    }
    if (query.rating) {
        andConditions.push({
            rating: { gte: Number(query.rating) }
        })
    }
    const services = await prisma.service.findMany({
        where: {
            AND: andConditions
        },
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            category: true,
            technician: {
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    return services
}

export const serviceSerivce = {
    createService,
    getAllServices
}