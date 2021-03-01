import {ProfileService} from "../services/profileService"
import {Request} from "express"

export class ProfileController{
    private profileService
    constructor(profileService : ProfileService){
        this.profileService = profileService
    }


    async postUser(body:Request["body"]){
        const result = await this.profileService.createUser(body)
        return result
    }

    async getUser(id:number, withPassword:boolean=false){
        const result = await this.profileService.getUserProfile(id, withPassword)
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

    async getDoctor(id:number, withPassword:boolean=false){
        const result = await this.profileService.getDoctorProfile(id, withPassword)
        return result
    }

    async putDoctor(id:number, body:Request["body"]){
        const result = await this.profileService.updateDoctorProfile(id, body)
        return result
    }
}

