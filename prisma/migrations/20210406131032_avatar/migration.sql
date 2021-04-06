/*
  Warnings:

  - You are about to drop the column `avator` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avator",
ADD COLUMN     "avatar" TEXT;
