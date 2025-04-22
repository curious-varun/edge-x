/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAT` on the `CourseContent` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bannerImage` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailImage` to the `CourseContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `CourseContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "imageUrl",
ADD COLUMN     "bannerImage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseContent" DROP COLUMN "createdAT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "thumbnailImage" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "Admin";
