import { Router } from "express";
import { createUserController, getProfileUserController, loginUserController } from "./user.controller.js";
import { authGuard } from "../../common/infra/auth/authMiddleware/authGuard.js";
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
 *               - telefone
 *               - nomeOficina
 *               - emailOficina
 *               - cnpj
 *               - endereco
 *               - telefone1
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nomeOficina:
 *                 type: string
 *               emailOficina:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone1:
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

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obter perfil do usuário logado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.get("/profile", authGuard, getProfileUserController);


export default userRouter;