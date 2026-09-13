import { NextFunction, Request, Response } from "express";
export declare const bookingController: {
    createBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTechnicianBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateBookingStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    cancelBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=booking.controller.d.ts.map