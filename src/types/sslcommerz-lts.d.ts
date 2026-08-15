// sslcommerz-lts is plain CommonJS and ships no types of its own
declare module "sslcommerz-lts" {
    export interface PaymentInitResponse {
        status? : string;
        failedreason? : string;
        sessionkey? : string;
        GatewayPageURL? : string;
        redirectGatewayURL? : string;
        [key : string] : unknown;
    }

    export interface ValidatePaymentResponse {
        status? : string;
        tran_id? : string;
        amount? : string;
        currency? : string;
        val_id? : string;
        bank_tran_id? : string;
        card_type? : string;
        [key : string] : unknown;
    }

    export default class SSLCommerzPayment {
        constructor(store_id:string,store_passwd:string,live?:boolean);
        init(data:Record<string,unknown>,url?:string|false,method?:string):Promise<PaymentInitResponse>;
        validate(data:{val_id:string},url?:string|false,method?:string):Promise<ValidatePaymentResponse>;
    }
};
