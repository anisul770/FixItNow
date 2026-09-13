import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
// used in admin routes but kept here for consistency
const createCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: `${name} created successfully`,
        data: { category }
    });
});
const getAllCategory = catchAsync(async (req, res, next) => {
    const categories = await categoryService.getAllCategory();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All the categories are retrieved successfully",
        data: { categories }
    });
});
export const categoryController = {
    createCategory,
    getAllCategory
};
//# sourceMappingURL=category.controller.js.map