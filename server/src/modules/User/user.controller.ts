import { Request, Response } from "express";
import { createUserService, getUserProfileService, loginUserService } from "./service/user.service.js";
import { CustomRequest } from "../../common/infra/auth/authMiddleware/authGuard.js";

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

// Controller (perfil de usuários)
export async function getProfileUserController(req: CustomRequest, res: Response){
    const id = req.user.id;

    const result = await getUserProfileService(id);

    res.status(200).json(result);
}