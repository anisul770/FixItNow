import { NextFunction, Request, Response } from "express";
export declare const paymentController: {
    initilization: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    successPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    failPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    cancelPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentDetails: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map