/*
  Warnings:

  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserPurchases" (
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPurchases_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailImage" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "videos_videoUrl_key" ON "videos"("videoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "videos_thumbnailImage_key" ON "videos"("thumbnailImage");

-- CreateIndex
CREATE UNIQUE INDEX "Images_name_key" ON "Images"("name");

-- AddForeignKey
ALTER TABLE "UserPurchases" ADD CONSTRAINT "UserPurchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPurchases" ADD CONSTRAINT "UserPurchases_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
