import { prisma } from "../../common/infra/lib/prisma";
import { Prisma } from "../../generated/prisma/client";

export const UserRepository = {

    //Registro de usuário
    async createUser(
        data: Prisma.UserCreateInput, 
        tx: Prisma.TransactionClient
    ) {
        return tx.user.create({
            data
        })
    },

    //Busca de usuário por ID
    async findById(
        id: string,
        tx: Prisma.TransactionClient
    ) {
        return tx.user.findUnique({
            where: { id }
        })
    },

    //Busca de usuário por email
    async findByEmail(
        email: string,
        tx: Prisma.TransactionClient
    ) {
        return tx.user.findUnique({
            where: { email }
        })
    }

}