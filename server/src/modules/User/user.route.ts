import { Router } from "express";
import { createUserController, loginUserController } from "./user.controller";
const userRouter = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - nomeOficina
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nomeOficina:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email já cadastrado
 */
userRouter.post("/register", createUserController);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.post("/login", loginUserController);


export default userRouter;