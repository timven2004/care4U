import Knex from 'knex'

export class QuestionnaireService {
    private knex: Knex
    constructor(knex: Knex) {
        this.knex = knex
    }

    async createUserQuestionnaire(body: any) {
        const {insomnia, depressed, panic, other_symptoms} = body;
        return await this.knex.insert({
            insomnia, depressed, panic, other_symptoms
        }).into('questionnaires').returning('id');
    }
}