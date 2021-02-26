import {ProfileService} from "../services/profileService"
import {Request} from "express"

export class ProfileController{
    private profileService
    constructor(profileService : ProfileService){
        this.profileService = profileService
    }

    async getUser(id:number, withPassword:boolean=false){
        const result = await this.profileService.getUserProfile(id, withPassword)
        return result
    }

    async putUser(id:number, body:Request["body"]){
        await this.profileService.updateUserProfile(id, body)
    }

    async getDoctor(id:number, withPassword:boolean=false){
        const result = await this.profileService.getDoctorProfile(id, withPassword)
        return result
    }

    async putDoctor(id:number, body:Request["body"]){
        await this.profileService.updateDoctorProfile(id, body)
    }
}

