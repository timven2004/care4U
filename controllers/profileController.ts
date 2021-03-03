// import { profileService } from '../main';
import {ProfileService} from "../services/profileService"
import { Request, Response } from "express"
import { checkPassword } from "../hash";

export class ProfileController{
    private profileService: ProfileService;
    constructor(profileService : ProfileService){
        this.profileService = profileService
    }

    async postUser(body:Request["body"]){
        const result = await this.profileService.createUser(body)
        return result
    }

    async getUser(id:number, withPassword:boolean=false){
        const result = await this.profileService.getUserProfile(id, withPassword)
         result.push(await this.profileService.getUserBookingHistory(id))
        return result
    }

    async putUser(id:number, body:Request["body"]){
        const result = await this.profileService.updateUserProfile(id, body);
        return result
    }

    async postDoctor(body:Request["body"]){
        const result = await this.profileService.createDoctor(body)
        return result
    }

    async getDoctor(doctorId:number, withPassword:boolean=false){
        const result = await this.profileService.getDoctorProfile(doctorId, withPassword)
        result.push(await this.profileService.getDoctorBookingHistory(doctorId))
        return result
    }

    async putDoctor(doctorId:number, body:Request["body"]){
        const result = await this.profileService.updateDoctorProfile(doctorId, body)
        return result
    }

    public login = async (req: Request, res: Response)=>{
        try {
            const { email, password } = req.body;
            const user = await this.profileService.getUserByEmail(email);
            if (!user) {
                res.status(401).json({ message: "email / password incorrect" });
                return;
            }
            const match = await checkPassword(password, user.password);
            if (match) {
                req.session["userId"] = user.id
            }
            res.json({ message: "User Login successed!" });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    }
}

