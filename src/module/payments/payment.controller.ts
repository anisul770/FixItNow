import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import SSLCommerzPayment from "sslcommerz-lts";


const initilization = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const store_id = 'fixit6a7ca760193ae'
        const store_passwd = 'fixit6a7ca760193ae@ssl'
        const is_live = false //true for live, false for sandbox

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const booking_id = req.params.booking_id;
        const data = {
            total_amount: 100,
            currency: 'BDT',
            tran_id: `${booking_id}`, // use unique tran_id for each api call
            success_url: 'http://localhost:3000/success',
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
            emi_option : 0, 
            num_of_item : '1'
        };
        const apiResponse = await sslcz.init(data);
        console.log(apiResponse);
        if(!apiResponse.GatewayPageURL){
            throw new Error(`Payment gateway did not return a redirect url: ${JSON.stringify(apiResponse)}`);
        };
        // Redirect the user to payment gateway
        res.redirect(apiResponse.GatewayPageURL);
    }
);

export const paymentController = {
    initilization,
}