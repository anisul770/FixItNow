import { catchAsync } from "../../utils/catchAsync";
import { technicianServices } from "./technician.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getTechnicianProfile = catchAsync(async (req, res, next) => {
    // have to control technician id from customer side 
    const profile = await technicianServices.getTechnicianProfile(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician profile is retrived successfully",
        data: { profile }
    });
});
const createSlots = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const createdSlots = await technicianServices.createSlots(payload, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: `${createdSlots.count} slots are created successfully`,
        data: { createdSlots }
    });
});
const getMySlots = catchAsync(async (req, res, next) => {
    const slots = await technicianServices.getMySlots(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your slots are retrived successfully",
        data: { slots }
    });
});
const deleteSlot = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const deletedSlot = await technicianServices.deleteSlot(id, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Slot is deleted successfully",
        data: { deletedSlot }
    });
});
const getAvailabilityByService = catchAsync(async (req, res, next) => {
    const serviceId = req.params.serviceId;
    const slots = await technicianServices.getAvailabilityByService(serviceId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Availability is retrived successfully",
        data: { slots }
    });
});
const getAllTechnician = catchAsync(async (req, res, next) => {
    const technicians = await technicianServices.getAllTechnician();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technicians are retrived successfully",
        data: { technicians }
    });
});
export const technicianController = {
    getTechnicianProfile,
    createSlots,
    getMySlots,
    deleteSlot,
    getAvailabilityByService,
    getAllTechnician
};
//# sourceMappingURL=technician.controller.js.map