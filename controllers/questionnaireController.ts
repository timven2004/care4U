import { QuestionnaireService } from './../services/questionnaireServices';
import { Request, Response } from "express";


export class QuestionnaireController { 
    constructor (private questionnaireService: QuestionnaireService) {}

    postQuestionnaire = async (req: Request, res: Response) => {
        try {

            //39 is for temporary use
            
            await this.questionnaireService.createUserQuestionnaire(req.body, req.session["userId"
        ]); 
            res.redirect("/user/clientBooking.html");
        } catch (error) {
            res.status(500).json(error.toString());
        }
    }

}
