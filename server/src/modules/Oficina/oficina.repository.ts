import { Prisma } from "@prisma/client";
import { prisma } from "../../common/infra/lib/prisma.js";

export const OficinaRepository = {

    async createOficina(
        data: Prisma.OficinaCreateInput,
        tx: Prisma.TransactionClient
    ) {
        return tx.oficina.create({
            data
        })
    },

    async findById(id: string){
        return prisma.oficina.findUnique({
            where: { id }
        })
    }

}