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

export const categoryService = {
    createCategory
}