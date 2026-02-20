import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../domain/errors/app-errors";
import { prisma } from "../../lib/prisma";

export interface CustomRequest extends Request {
    user?: any
}

export async function authGuard(
    req: CustomRequest,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        throw new AppError("Token de autenticação não fornecido.", 401);
    }

    try{

        if(!process.env.JWT_SECRET) {
            throw new AppError("Chave secreta do JWT não configurada.", 500);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
        const user = await prisma.user.findUnique({
            where: {
                id: verified.id
            }
        });

        if(!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        req.user = {
            id: user.id,
            role: user.role,
            email: user.email,
            ativo: user.ativo,
            oficinaId: user.oficinaId,
            telefone: user.telefone
        };


        return next();
    } catch(err) {
        throw new AppError("Token inválido.", 401);
    }
}