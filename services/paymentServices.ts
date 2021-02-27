import { Request, Response } from "express"
import { Line_items } from "../interface/payment"

export class PaymentServices {
    Your_Domain: string
    stripe = require('stripe')('sk_test_51IOIHmEvACqcuP7E37BElTNEkyjpIoKIuxvoTBUt3AsDv9EERu9kUmCpLziQGCAiyhQLWuKz6J5J5VGp0xpCodQb00J5HG7CLl');

    constructor(Your_Domain: string) {
        this.Your_Domain = Your_Domain;
    }

    async createCheckoutSession(line_items:Line_items[], req: Request, res: Response) {
        try{
            console.log(`${this.Your_Domain}/html/paymentSuccess.html`)


            const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${this.Your_Domain}/html/paymentSuccess.html`,
            cancel_url: `${this.Your_Domain}/html/paymentCancelled.html`,
            
        });

        res.json({ id: session.id });} catch (err){
            console.log(err)
        }
    }
}
