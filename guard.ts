import { Request, Response, NextFunction } from "express";

export function isLoggedInUSERAPI(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.session?.["userId"]) {
        next();
    } else {
        //res.redirect("/html/main-page.html");
        //res.status(401).json({ message: "Unauthorized" });
        res.json({isLoggedInUSERAPI: false })
    }
}

export function isLoggedInDOCAPI(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.session?.["doctorId"]) {
        next();
    } else {
        //res.redirect("/html/main-page.html");
        // res.status(401).json({ message: "Unauthorized" });
        res.json({isLoggedInDOCAPI: false })
    }
}

export function isLoggedInUSERHTML(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(req.session);
    if (req.session?.["userId"]||req.session?.["doctorId"]) {
        next();
    } else {
        res.redirect("/html/main-page.html");
        //res.json({isLoggedInUSERAPI: false })
    }
}
export function isLoggedInDOCHTML(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(req.session);
    if (req.session?.["doctorId"]) {
        next();
    } else {
        res.redirect("/html/main-page.html");
    }
}
