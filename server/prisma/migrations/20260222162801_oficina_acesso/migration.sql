/*
  Warnings:

  - A unique constraint covering the columns `[acesso]` on the table `Oficina` will be added. If there are existing duplicate values, this will fail.
  - The required column `acesso` was added to the `Oficina` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'ATTENDAND';
ALTER TYPE "Role" ADD VALUE 'MECHANIC';

-- AlterTable
ALTER TABLE "Oficina" ADD COLUMN     "acesso" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Oficina_acesso_key" ON "Oficina"("acesso");
