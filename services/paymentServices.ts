import { Request, Response } from "express"
import { Line_items } from "../interface/payment" 
import Knex from 'knex'


export class PaymentServices {
    Your_Domain: string
    stripe:any
    knex:Knex

    constructor(Your_Domain: string, stripe:any, knex:Knex) {
        this.Your_Domain = Your_Domain;
        this.stripe = stripe
        this.knex = knex
    }

    async createCheckoutSession(line_items:Line_items[], req: Request, res: Response) {
        try{


            const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${this.Your_Domain}/user/paymentSuccess.html`,
            cancel_url: `${this.Your_Domain}/user/paymentCancelled.html`,
            
        });
        res.json({ id: session.id });} catch (err){
            console.log(err)
        }
    }

    async successfulPayment(transactionRecordId:number){
        try{
        
        return this.knex("transaction_records").update({is_success: true}).where("id",transactionRecordId)
    }

        catch (err){
            return (err)

        }
    }

    async retrievePaymentHistory(userId:number){
        try{
            const result = await this.knex.select("doctors.name as doctor_name","transaction_records.id" ,"transaction_records.consultation_fee", "transaction_records.service_fee", "transaction_records.is_success", "transaction_records.payment_date").from("transaction_records")
            .innerJoin("doctors","doctors.id","transaction_records.doctor_id")
            .where("user_id", userId)
            return result
        } catch (err){
            console.error(err)
            return (err)
        }

    }
}
