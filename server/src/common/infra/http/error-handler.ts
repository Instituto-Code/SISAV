import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/app-errors.js";

export function ErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
){
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    console.log(err);

    return res.status(500).json({
        message: "Internal server error."
    })
}