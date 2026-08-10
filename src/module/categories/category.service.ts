import { prisma } from "../../lib/prisma"

// used in admin routes but kept here for consistency
const createCategory = async(name:string) => {
    const isExist = await prisma.category.findUnique({
        where:{
            name
        }
    });
    if(isExist){
        throw new Error(`${name} category is already exist.`);
    };
    const createdCategory = await prisma.category.create({
        data: {
            name
        }
    });
    return createdCategory;
};

const getAllCategory = async() => {
    const categories = await prisma.category.findMany({
        include:{
            services: {
                include :{
                    technician :{
                        select : {
                            experience : true,
                            hourlyRate : true,
                            user : {
                                omit: {
                                    password: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return categories
}

export const categoryService = {
    createCategory,
    getAllCategory
}