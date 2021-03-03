import { Request, Response } from "express"
import { Line_items } from "../interface/payment" 
import Knex from 'knex'



export class PaymentServices {
    Your_Domain: string
    stripe:any

    constructor(Your_Domain: string, stripe:any, knex:Knex) {
        this.Your_Domain = Your_Domain;
        this.stripe = stripe
    }

    async createCheckoutSession(line_items:Line_items[], req: Request, res: Response) {
        try{


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

    async successfulPayment(req:Request, res:Response){
        try{
        res.json({message: "payment success"})             }
        catch (err){
            console.log(err.message)
        }
    }
}
