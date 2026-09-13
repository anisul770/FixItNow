import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
const registerUserIntoDB = async (paload) => {
    const { name, email, password, role, experience, hourlyRate, bio, skills, location } = paload;
    const isUserExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (isUserExists) {
        throw new Error("User already exists with this email");
    }
    ;
    const isTechnician = role === "TECHNICIAN";
    if (isTechnician && (experience === undefined || hourlyRate === undefined)) {
        throw new Error("experience and hourlyRate are required to register as a technician");
    }
    ;
    const hashedPassword = await bcrypt.hash(password, Number(config.salt_rounds));
    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            profile: {
                create: {}
            },
            ...(isTechnician && {
                technicianProfile: {
                    create: {
                        experience: experience,
                        hourlyRate: hourlyRate,
                        bio,
                        skills,
                        location
                    }
                }
            })
        }
    });
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: createUser.id
        },
        omit: {
            password: true
        },
        include: {
            profile: true,
            customerBookings: true,
            technicianProfile: true
        }
    });
    return user;
};
const getMyProfileFromDB = async (userId) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        omit: {
            password: true
        },
        include: {
            profile: true,
            customerBookings: true,
            customerReviews: true,
            technicianProfile: {
                include: {
                    bookings: true,
                    reviews: true
                }
            }
        }
    });
    return user;
};
const updateMyProfile = async (userId, payload) => {
    const { name, address, phone, profilePhoto, password } = payload;
    const hashedPassword = password
        ? await bcrypt.hash(password, Number(config.salt_rounds))
        : undefined;
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            ...(hashedPassword && { password: hashedPassword }),
            profile: {
                upsert: {
                    create: { profilePhoto, phone, address },
                    update: { profilePhoto, phone, address }
                }
            }
        },
        omit: {
            password: true
        },
        include: {
            profile: true,
            customerBookings: true,
            customerReviews: true
        }
    });
    return updatedUser;
};
export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB,
    updateMyProfile
};
//# sourceMappingURL=user.service.js.map