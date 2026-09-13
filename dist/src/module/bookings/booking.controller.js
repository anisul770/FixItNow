import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createBooking = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const createdBooking = await bookingService.createBooking(payload, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Booking request is created successfully",
        data: { createdBooking }
    });
});
const getMyBookings = catchAsync(async (req, res, next) => {
    const bookings = await bookingService.getMyBookings(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your bookings are retrieved successfully",
        data: { bookings }
    });
});
const getTechnicianBookings = catchAsync(async (req, res, next) => {
    const bookings = await bookingService.getTechnicianBookings(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your incoming bookings are retrieved successfully",
        data: { bookings }
    });
});
const getSingleBooking = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const booking = await bookingService.getSingleBooking(id, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking is retrieved successfully",
        data: { booking }
    });
});
const updateBookingStatus = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const { status } = req.body;
    const updatedBooking = await bookingService.updateBookingStatus(id, req.user?.id, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `Booking status is updated to ${status}`,
        data: { updatedBooking }
    });
});
const cancelBooking = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const cancelledBooking = await bookingService.cancelBooking(id, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking is cancelled successfully",
        data: { cancelledBooking }
    });
});
const getAllBookings = catchAsync(async (req, res, next) => {
    const bookings = await bookingService.getAllBookings();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All bookings are retrieved successfully",
        data: { bookings }
    });
});
export const bookingController = {
    createBooking,
    getMyBookings,
    getTechnicianBookings,
    getSingleBooking,
    updateBookingStatus,
    cancelBooking,
    getAllBookings
};
//# sourceMappingURL=booking.controller.js.map