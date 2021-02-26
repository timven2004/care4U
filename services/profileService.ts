import Knex from 'knex'

export class ProfileService {
    private knex:Knex
    constructor (knex:Knex){
        this.knex = knex
    }

    async getUserProfile(id:number){
        const result = await this.knex.select("name","email","telephone","password","created_at","updated_at").from("users").where("id",id)
        return result
    }

    updateUserProfile(id:number){

    }

    getDoctorProfile(id:number){

    }

    updateDoctorProfile(id:number){

    }

    
}