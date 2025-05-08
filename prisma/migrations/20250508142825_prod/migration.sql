/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailVerify" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '3 minutes';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";
