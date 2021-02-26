import {ProfileService} from "../services/profileService"
import {Request, Response} from "express"

export class ProfileController{
    private profileService
    constructor(profileService : ProfileService){
        this.profileService = profileService
    }

    async getUser(id:number){
        const result = await this.profileService.getUserProfile(id)
        return result
    }

    putUser(){}

}

