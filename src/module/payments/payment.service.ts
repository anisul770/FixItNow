import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { BookingStatus, PaymentMethod, PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums";

const isLive = config.is_live === "true";
const getGateway = () => new SSLCommerzPayment(config.store_id as string, config.store_passwd as string, isLive);

// SSLCommerz sends card_type like "VISA-Dutch Bangla" or "DBBLMOBILEBANKING-Rocket"
const toPaymentMethod = (cardType:string) => {
    const type = cardType.toUpperCase();
    if(type.includes("MOBILEBANKING") || type.includes("BKASH") || type.includes("NAGAD") || type.includes("ROCKET")){
        return PaymentMethod.MOBILE_BANKING;
    };
    if(type.includes("INTERNETBANKING") || type.includes("IBBL")){
        return PaymentMethod.BANK_TRANSFER;
    };
    return PaymentMethod.CARD;
};

const initilization = async (booking_id: string) => {
    const sslcz = getGateway();
    const booking = await prisma.booking.findUniqueOrThrow({
        where:{
            id : booking_id
        }
    });
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
        success_url: `http://localhost:3000/api/payment/${booking_id}/success`,
        fail_url: 'http://localhost:3000/fail',
        cancel_url: 'http://localhost:3000/cancel',
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
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
                method : toPaymentMethod(validation.card_type || "")
            }
        });
    });
    return paidPayment;
};

export const paymentService = {
    initilization,
    successPayment
};