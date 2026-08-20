import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { BookingStatus, PaymentProvider, PaymentStatus, Role } from "../../../generated/prisma/enums";

const isLive = config.is_live === "true";
const getGateway = () => new SSLCommerzPayment(config.store_id as string, config.store_passwd as string, isLive);

const initilization = async (booking_id: string,userId : string) => {
    const sslcz = getGateway();
    const booking = await prisma.booking.findUniqueOrThrow({
        where:{
            id : booking_id
        },
        include:{
            service: {
                include : {
                    category : true
                }
            },
            customer :true
        }
    });
    if(booking.customerId !== userId){
        throw new Error("You can't pay others booking");
    }
    const payment = await prisma.payment.findUnique({
        where:{
            bookingId : booking_id
        }
    })
    if(payment && payment.status === "COMPLETED"){
        throw new Error("The payment for this booking is already COMPLETED");
    }
    if(booking.status === BookingStatus.PAID) {
        throw new Error('This booking is already paid');
    };
    if(booking.status !== BookingStatus.ACCEPTED) {
        throw new Error(`A ${booking.status} booking can not be paid`);
    };
    const data = {
        total_amount: `${booking.totalPrice}`,
        currency: 'BDT',
        tran_id: `trx_${booking_id}`, // use unique tran_id for each api call
        success_url: `${config.app_url}/api/payment/${booking_id}/success`,
        fail_url: `${config.app_url}/api/payment/${booking_id}/fail`,
        cancel_url: `${config.app_url}/api/payment/${booking_id}/cancel`,
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: `${booking.service.title}`,
        product_category: `${booking.service.category.name}`,
        product_profile: 'general',
        cus_name: `${booking.customer.name}`,
        cus_email:  `${booking.customer.email}`,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: '1000',
        ship_country: 'Bangladesh',
        productcategory: 'test',
        emi_option: 0,
        num_of_item: '1'
    };
    const apiResponse = await sslcz.init(data);
    if (!apiResponse.GatewayPageURL) {
        throw new Error(`Payment gateway did not return a redirect url: ${JSON.stringify(apiResponse)}`);
    };

    // one payment row per booking, reset to PENDING on every retry
    await prisma.payment.upsert({
        where : {
            bookingId : booking_id
        },
        create : {
            bookingId : booking_id,
            provider : PaymentProvider.SSLCOMMERZ,
            amount : booking.totalPrice,
            paymentIntentId : apiResponse.sessionkey,
            status : PaymentStatus.PENDING
        },
        update : {
            amount : booking.totalPrice,
            paymentIntentId : apiResponse.sessionkey,
            status : PaymentStatus.PENDING
        }
    });
    return apiResponse
};

const successPayment = async(booking_id:string,val_id:string) => {
    if(!val_id){
        throw new Error("val_id is missing from the gateway callback");
    };

    const payment = await prisma.payment.findUniqueOrThrow({
        where : {
            bookingId : booking_id
        }
    });
    // the gateway can call back more than once
    if(payment.status === PaymentStatus.COMPLETED){
        return payment;
    };

    const validation = await getGateway().validate({ val_id });
    console.log(validation);
    if(validation.status !== "VALID" && validation.status !== "VALIDATED"){
        throw new Error(`Payment could not be validated: ${JSON.stringify(validation)}`);
    };
    // a valid payment for another booking must not settle this one
    if(validation.tran_id !== `trx_${booking_id}`){
        throw new Error("The gateway transaction does not belong to this booking");
    };
    if(Math.abs(Number(validation.amount) - payment.amount) > 0.01){
        throw new Error("The paid amount does not match the booking total");
    };
    const paidPayment = await prisma.$transaction(async(tx)=>{
        await tx.booking.update({
            where : {
                id : booking_id
            },
            data : {
                status : BookingStatus.PAID
            }
        });
        return tx.payment.update({
            where : {
                bookingId : booking_id
            },
            data : {
                status : PaymentStatus.COMPLETED,
                paidAt : new Date(),
                transactionId : validation.bank_tran_id,
                methodType : validation.card_type as string,
                method : validation.card_brand as string
            }
        });
    });
    return paidPayment;
};


const failPayment = async(booking_id:string) => {
    const payment = await prisma.payment.findUniqueOrThrow({
        where : {
            bookingId : booking_id
        }
    });
    // a completed payment must not be downgraded by a late/duplicate gateway callback
    if(payment.status === PaymentStatus.COMPLETED){
        return payment;
    };
    return prisma.payment.update({
        where : {
            bookingId : booking_id
        },
        data : {
            status : PaymentStatus.FAILED
        }
    });
};

const cancelPayment = async(booking_id:string) => {
    const payment = await prisma.payment.findUniqueOrThrow({
        where : {
            bookingId : booking_id
        }
    });
    if(payment.status === PaymentStatus.COMPLETED){
        return payment;
    };
    return prisma.payment.update({
        where : {
            bookingId : booking_id
        },
        data : {
            status : PaymentStatus.FAILED
        }
    });
};

const getMyPayments = async(customerId:string) => {
    const payments = await prisma.payment.findMany({
        where : {
            booking : {
                customerId
            }
        },
        include : {
            booking : {
                select : {
                    bookingDate : true,
                    service : {
                        select : {
                            title : true
                        }
                    }
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    });
    return payments;
};

const getPaymentDetails = async(booking_id:string,userId:string,role:Role) => {
    const payment = await prisma.payment.findUniqueOrThrow({
        where : {
            bookingId : booking_id
        },
        include : {
            booking : {
                include : {
                    service : {
                        select : {
                            title : true
                        }
                    },
                    customer : {
                        select : {
                            name : true,
                            email : true
                        }
                    },
                    technician : {
                        select : {
                            user : {
                                select : {
                                    name : true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    if(role !== Role.ADMIN && payment.booking.customerId !== userId){
        throw new Error("You are not allowed to see this payment");
    };
    return payment;
};

const getAllPayments = async() => {
    const payments = await prisma.payment.findMany({
        include : {
            booking : {
                include : {
                    service : {
                        select : {
                            title : true
                        }
                    },
                    customer : {
                        select : {
                            name : true,
                            email : true
                        }
                    },
                    technician : {
                        select : {
                            user : {
                                select : {
                                    name : true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    });
    return payments;
};

export const paymentService = {
    initilization,
    successPayment,
    failPayment,
    cancelPayment,
    getMyPayments,
    getPaymentDetails,
    getAllPayments
};