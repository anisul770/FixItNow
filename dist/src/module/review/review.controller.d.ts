import { NextFunction, Request, Response } from "express";
export declare const reviewController: {
    createReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTechnicianReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getServiceReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=review.controller.d.ts.map