import express, { Request, Response } from 'express';
import { paymentController } from "../main"

export const paymentRoutes = express.Router()

paymentRoutes.post('/create-checkout-session', (req: Request, res: Response) => {
 
  paymentController.createCheckoutSession(req,res);

});

paymentRoutes.get("/successfulPayment", (req:Request, res:Response)=>{

  paymentController.successfulPayment(req,res)

})

paymentRoutes.get("/api/paymentHistory/",(req:Request, res:Response)=>{
  paymentController.getPaymentHistory(req,res);
})