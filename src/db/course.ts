import { db } from "@/db"
import { Prisma } from "@prisma/client"


export type getCoursesType = Prisma.CourseGetPayload<{
  select: {
    id: true;
    title: true;
    bannerImage: true;
    description: true;
    price: true;
    createdAt: true;
    updatedAt: true;
  }
}>
export async function getPublicCourses() {
  const courses = db.course.findMany({
    select: {
      id: true,
      title: true,
      bannerImage: true,
      description: true,
      price: true,
      createdAt: true,
      updatedAt: true,

    },
    where: { openToEveryone: true }
  });
  return courses;
}
