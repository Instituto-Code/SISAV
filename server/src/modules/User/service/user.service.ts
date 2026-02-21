import { AppError } from "../../../common/domain/errors/app-errors.js";
import { generateToken } from "../../../common/infra/auth/jwt/jwt.js";
import { prisma } from "../../../common/infra/lib/prisma.js";
import { DTORegisterUser } from "../../../common/shared/dto/user.dto.js";
import { OficinaRepository } from "../../Oficina/oficina.repository.js";
import { UserRepository } from "../user.repository.js";
import bcrypt from "bcrypt";

// Registro do usuário
export async function createUserService(data: DTORegisterUser) {

    return prisma.$transaction(async (tx: any) => {
        const emailExists = await UserRepository.findByEmail(data.email, tx);

        if (emailExists) {
            throw new AppError("Email já cadastrado.", 400);
        }

        // criptografia de senha
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(data.senha, salt);

        const oficina = await OficinaRepository.createOficina({
            nome: data.nomeOficina,
            email: data.emailOficina,
            cnpj: data.cnpj,
            endereco: data.endereco,
            telefone1: data.telefone1,
        }, tx);

        const user = await UserRepository.createUser({
            nome: data.nome,
            email: data.email,
            senha: hashPass,
            telefone: data.telefone,
            oficina: {
                connect: { id: oficina.id }
            }
        }, tx);

        return { user, oficina }
    })
}

// Login do usuário
export async function loginUserService(email: string, senha: string) {

    
        const userExist = await UserRepository.findByEmail(email);

        if (!userExist) {
            throw new AppError("Usuário não encontrado", 404);
        }

        if(!(await bcrypt.compare(senha, userExist.senha))){
            throw new AppError("Senha incorreta", 400); 
        }

        const token = generateToken(userExist.id);

        return {
            id: userExist.id,
            token: token
        }
    
}

