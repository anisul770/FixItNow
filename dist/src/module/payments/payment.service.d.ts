import { BookingStatus, PaymentProvider, PaymentStatus, Role } from "../../../generated/prisma/enums";
export declare const paymentService: {
    initilization: (booking_id: string, userId: string) => Promise<import("sslcommerz-lts").PaymentInitResponse>;
    successPayment: (booking_id: string, val_id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        paymentIntentId: string | null;
        provider: PaymentProvider;
        methodType: string | null;
        method: string | null;
        amount: number;
        paidAt: Date | null;
    }>;
    failPayment: (booking_id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        paymentIntentId: string | null;
        provider: PaymentProvider;
        methodType: string | null;
        method: string | null;
        amount: number;
        paidAt: Date | null;
    }>;
    cancelPayment: (booking_id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        paymentIntentId: string | null;
        provider: PaymentProvider;
        methodType: string | null;
        method: string | null;
        amount: number;
        paidAt: Date | null;
    }>;
    getMyPayments: (customerId: string) => Promise<({
        booking: {
            service: {
                title: string;
            };
            bookingDate: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        paymentIntentId: string | null;
        provider: PaymentProvider;
        methodType: string | null;
        method: string | null;
        amount: number;
        paidAt: Date | null;
    })[]>;
    getPaymentDetails: (booking_id: string, userId: string, role: Role) => Promise<{
        booking: {
            technician: {
                user: {
                    name: string;
                };
            };
            service: {
                title: string;
            };
            customer: {
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            startTime: string;
            endTime: string;
            technicianId: string;
            serviceId: string;
            customerId: string;
            bookingDate: Date;
            problemDescription: string | null;
            totalPrice: number;
            status: BookingStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        paymentIntentId: string | null;
        provider: PaymentProvider;
        methodType: string | null;
        method: string | null;
        amount: number;
        paidAt: Date | null;
    }>;
    getAllPayments: () => Promise<({
        booking: {
            technician: {
                user: {
                    name: string;
                };
            };
            service: {
                title: string;
            };
            customer: {
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            address: string;
            startTime: string;
            endTime: string;
            technicianId: string;
            serviceId: string;
            customerId: string;
            bookingDate: Date;
            problemDescription: string | null;
            totalPrice: number;
            status: BookingStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: PaymentStatus;
        bookingId: string;
        transactionId: string | null;
        paymentIntentId: string | null;
        provider: PaymentProvider;
        methodType: string | null;
        method: string | null;
        amount: number;
        paidAt: Date | null;
    })[]>;
};
//# sourceMappingURL=payment.service.d.ts.map