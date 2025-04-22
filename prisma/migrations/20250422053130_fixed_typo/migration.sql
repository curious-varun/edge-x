/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPurchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPurchases" DROP CONSTRAINT "UserPurchases_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserPurchases" DROP CONSTRAINT "UserPurchases_userId_fkey";

-- AlterTable
ALTER TABLE "CourseContent" ADD COLUMN     "courseId" INTEGER;

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "UserPurchases";

-- DropTable
DROP TABLE "videos";

-- CreateTable
CREATE TABLE "UserPurchase" (
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPurchase_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailImage" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_videoUrl_key" ON "Video"("videoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Video_thumbnailImage_key" ON "Video"("thumbnailImage");

-- CreateIndex
CREATE UNIQUE INDEX "Image_name_key" ON "Image"("name");

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPurchase" ADD CONSTRAINT "UserPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPurchase" ADD CONSTRAINT "UserPurchase_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
