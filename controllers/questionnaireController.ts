import { QuestionnaireService } from './../services/questionnaireServices';
import { Request, Response } from "express";


export class QuestionnaireController { 
    constructor (private questionnaireService: QuestionnaireService) {}

    postQuestionnaire = async (req: Request, res: Response) => {
        try {
            let result = await this.questionnaireService.createUserQuestionnaire(req.body); 
            res.json(result);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    }

}
