// import { profileService } from '../main';
import { ProfileService } from "../services/profileService";
import { Request, Response } from "express";
import { checkPassword } from "../hash";

export class ProfileController {
    private profileService: ProfileService;
    constructor(profileService: ProfileService) {
        this.profileService = profileService;
    }

    // (body: Request["body"])
     public postUser = async (req: Request, res: Response) => {
        try {
            const { name, email, telephone, password } = req.body;
            if (!name || !email || !telephone || !password) {
                res.status(400).json ({ 
                    message: 'Please enter name/ email/ telephone/ password',
                 })
                 return;
            }
                
              const result = await this.profileService.createUser
                          req.body;
              console.log(result);
              res.json ({ message: 'success' }) 
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    
   

    async getUser(id: number, withPassword: boolean = false) {
        const result = await this.profileService.getUserProfile(
            id,
            withPassword
        );
        result.push(await this.profileService.getUserBookingHistory(id));
        return result;
    }

    async putUser(id: number, body: Request["body"]) {
        const result = await this.profileService.updateUserProfile(id, body);
        return result;
    }

    postDoctor = async (req: Request, res: Response) => {
        try {
            const { name, email, telephone, password } = req.body
            if (!name || !password || !telephone || !email) {
                res.status(400).json ({ 
                    message: 'Please enter name/ email/ telephone/ password'
                 })
                 return;
            }
                
              const result = await this.profileService.createDoctor (
                        req.body
              );
              console.log(result);
              res.json ({ message: 'success' })
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // postUser = async (req: Request, res: Response) => {
    //     try {
    //         const { name, email, telephone, password } = req.body
    //         if (!name || !password || !telephone || !password) {
    //             res.status(400).json ({ 
    //                 message: 'Invalid name or password'
    //              })
    //              return;
    //         }
                
    //           const result = await this.profileService.createUser (
    //               name, email, telephone, password
    //           );
    //           console.log(result);
    //           res.json ({ message: 'success' })
    //     } catch (err) {
    //         console.log(err.message);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // };
    

    async getDoctor(doctorId: number, withPassword: boolean = false) {
        const result = await this.profileService.getDoctorProfile(
            doctorId,
            withPassword
        );
        result.push(
            await this.profileService.getDoctorBookingHistory(doctorId)
        );
        return result;
    }

    async putDoctor(doctorId: number, body: Request["body"]) {
        const result = await this.profileService.updateDoctorProfile(
            doctorId,
            body
        );
        return result;
    }




    public userLogin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.profileService.getUserByEmail(email);
            if (!user) {
                res.status(401).json({ message: "email / password incorrect" });
                return;
            }
            const match = await checkPassword(password, user.password);
            if (match) {
                req.session["userId"] = user.id;
                res.json({ message: "User Login successed!" });
                console.log(req.session["userId"]);
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    };




    public doctorLogin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const doctor = await this.profileService.getDoctorByEmail(email);
            if (!doctor) {
                res.status(401).json({ message: "email / password incorrect" });
                return;
            }
            const match = await checkPassword(password, doctor.password);
            if (match) {
                req.session["doctorId"] = doctor.id;
                res.json({ message: "Doctor Login successed!" });
                console.log(req.session["doctorId"]);
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    };



    public checkUserLogin = async (req: Request, res: Response) => {
        try {

            res.json({ isLoggedInUSERAPI: true });
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    public checkDoctorLogin = async (req: Request, res: Response) => {
        try {

            res.json({ isLoggedInDOCAPI: true });
            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };



    public userLogout = (req: Request, res: Response) => {
        try {
            if (req.session) {
               req.session.destroy((err)=>{console.log(err)});
            }
            res.redirect("../html/main-page.html");
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };



      public doctorLogout = (req: Request, res: Response) => {
        try {
            if (req.session) {
                req.session.destroy((err)=>{console.log(err)});
            }
            res.redirect("../html/main-page.html");
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
}
