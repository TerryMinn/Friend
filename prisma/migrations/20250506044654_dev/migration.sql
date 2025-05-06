/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "messages" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "Message";

-- DropEnum
DROP TYPE "MessageSource";
