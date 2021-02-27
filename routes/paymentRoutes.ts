import express, { Request, Response } from 'express';
import { paymentController } from "../main"

export const paymentRoutes = express.Router()

paymentRoutes.post('/create-checkout-session', async (req: Request, res: Response) => {
 
  paymentController.createCheckoutSession(req,res);

});

paymentRoutes.get("/successfulPayment", async (req:Request, res:Response)=>{

  paymentController.successfulPayment(req,res)

})