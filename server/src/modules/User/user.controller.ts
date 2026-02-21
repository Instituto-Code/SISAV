import { Request, Response } from "express";
import { createUserService, loginUserService } from "./service/user.service.js";

// Controller (registro de usuários)
export async function createUserController(req: Request, res: Response){
    const data = req.body;

    const result = await createUserService(data);

    res.status(201).json(result);
}

// Controller (login de usuários)
export async function loginUserController(req: Request, res: Response){
    const { email, senha } = req.body;

    const result = await loginUserService(email, senha);

    res.status(200).json(result);
}