/*
  Warnings:

  - You are about to drop the column `name` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Made the column `courseId` on table `CourseContent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseContent" DROP CONSTRAINT "CourseContent_courseId_fkey";

-- DropIndex
DROP INDEX "Image_name_key";

-- AlterTable
ALTER TABLE "CourseContent" ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Image_title_key" ON "Image"("title");

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
