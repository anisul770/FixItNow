import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import { prisma } from "../../lib/prisma";

const initilization = async (booking_id: string) => {
    const isLive = config.is_live === "true";
    const sslcz = new SSLCommerzPayment(config.store_id as string, config.store_passwd as string, isLive);
    const booking = await prisma.booking.findUniqueOrThrow({
        where:{
            id : booking_id
        }
    })
    if(booking.status === "PAID") {
        throw new Error('This booking is already paid');
    }
    const data = {
        total_amount: `${booking.totalPrice}`,
        currency: 'EUR',
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
    return apiResponse
};

const successPayment = async(booking_id:string) => {
    const booking = await prisma.booking.update({
        where:{
            id:booking_id
        },
        data:{
            status:"PAID"
        }
    });
    return booking;
}

export const paymentService = {
    initilization,
    successPayment
}