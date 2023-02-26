import {NextFunction, Request, Response} from "express";

export function dynamicHelloWorld(req: Request, res: Response, next: NextFunction) {
    const name = req.query["name"];
    if (name) {
        res.contentType('text/plain');
        res.status(200);
        res.send('Hello, ' + name);
    } else {
        next();
    }
}
