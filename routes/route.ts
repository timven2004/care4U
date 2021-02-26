import {profileController} from "../main"
import express, { request, Request, Response } from 'express';

export const routes = express.Router();

routes.get("/getUserProfile", (req:Request, res:Response)=>{

    const id=1
    res.json(profileController.getUser(id))
})