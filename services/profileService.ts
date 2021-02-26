import Knex from 'knex'
import {Request} from "express"

export class ProfileService {
    private knex:Knex
    constructor (knex:Knex){
        this.knex = knex
    }

    async getUserProfile(id:number, withPassword:boolean = false){
        const result = await this.knex.select("name","email","telephone","password","created_at","updated_at").from("users").where("id",id)
        if (withPassword){
            return result}
        else {
            result[0].password = "hidden from server";
            return result
        }
        
    }

    updateUserProfile(id:number, body:Request['body']){
        // const result = await this.knex.
    }

    getDoctorProfile(id:number){

    }

    updateDoctorProfile(id:number){

    }

    
}