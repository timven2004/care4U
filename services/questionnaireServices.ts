import Knex from 'knex'

export class QuestionnaireService {
    private knex: Knex
    constructor(knex: Knex) {
        this.knex = knex
    }

    async createUserQuestionnaire(body: any, userId: number) {
        console.log(body)
        const { insomnia, depressed, panic, other_symptoms } = body;
        return await this.knex.insert({
            insomnia: insomnia,
            depressed: depressed,
            panic: panic,
            other_symptoms: other_symptoms,
            user_id: userId
        }).into('questionnaires').returning('id');
    }

    async getUserQuestionnaire(id:number){
        return await this.knex.select().from("questionnaire").where("id", id)
    }
}