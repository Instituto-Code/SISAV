import { AppError } from "../../../common/domain/errors/app-errors";
import { prisma } from "../../../common/infra/lib/prisma";
import { DTORegisterUser } from "../../../common/shared/dto/user.dto";
import { OficinaRepository } from "../../Oficina/oficina.repository";
import { UserRepository } from "../user.repository";
import bcrypt from "bcrypt";

export async function createUser(data: DTORegisterUser) {

    return prisma.$transaction(async (tx) => {
        const emailExists = await UserRepository.findByEmail(data.email, tx);

        if(emailExists) {
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