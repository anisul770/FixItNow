import { NextFunction, Request, Response } from "express";
export declare const technicianController: {
    getTechnicianProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createSlots: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMySlots: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteSlot: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAvailabilityByService: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllTechnician: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=technician.controller.d.ts.map