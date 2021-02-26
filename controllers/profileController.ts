import {ProfileService} from "../services/profileService"
// import {Request, Response} from "express"

export class ProfileController{
    private profileService
    constructor(profileService : ProfileService){
        this.profileService = profileService
    }

    async getUser(id:number, withPassword:boolean=false){
        const result = await this.profileService.getUserProfile(id, withPassword)
        return result
    }

    putUser(){}

}

