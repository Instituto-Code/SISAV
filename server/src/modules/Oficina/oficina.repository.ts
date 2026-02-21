import { Prisma } from "@prisma/client"

export const OficinaRepository = {

    async createOficina(
        data: Prisma.OficinaCreateInput,
        tx: Prisma.TransactionClient
    ) {
        return tx.oficina.create({
            data
        })
    }

}