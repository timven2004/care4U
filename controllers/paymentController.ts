import { Request, Response } from "express"
import { Line_items } from "../interface/payment"
import { PaymentServices } from "../services/paymentServices"

export class PaymentController {
    private paymentServices: PaymentServices

    constructor(paymentServices: PaymentServices) {
        this.paymentServices = paymentServices
    }

    async createCheckoutSession(req: Request, res: Response) {
        try {
            const line_items: Line_items[] = [
                {
                    price_data: {
                        currency: 'hkd',
                        product_data: {
                            name: '治療費',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 100000,
                    },
                    quantity: 1,
                },

                {
                    price_data: {
                        currency: 'hkd',
                        product_data: {
                            name: '手續費',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                }

            ]


           await this.paymentServices.createCheckoutSession(line_items, req, res)
        } catch (err) {
            console.error(err.message)
        }
    }

    async successfulPayment(req:Request, res:Response){
        try{
            this.paymentServices.successfulPayment(req,res)

        } catch (err){
            console.error(err.message)
        }
    }

    async getPaymentHistory(req:Request, res:Response){
        try{
            //39 is for temporary use
            const userId = req.session["userId"]||39
            res.json(await this.paymentServices.retrievePaymentHistory(userId))

        } catch (err) {
            console.error(err)
            res.status(500).json({message: "internal server error"})
        }
    }
}
