/*
  Warnings:

  - A unique constraint covering the columns `[userId,photoId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_photoId_unique" ON "Like"("userId", "photoId");
