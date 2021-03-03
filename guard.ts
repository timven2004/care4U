import { Request, Response, NextFunction } from "express";


export function isLoggedInAPI(req: Request, res: Response, next: NextFunction) {
    if (req.session?.["userId"]) {
        next();
    } else {
        // res.redirect("/login.html");
        res.status(401).json({ message: "Unauthorized" });
    }
}
export function isLoggedInHTML(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(req.session)
    if (req.session?.["userId"]) {
        next();
    } else {
        res.redirect("/main-page.html");
    }
}
