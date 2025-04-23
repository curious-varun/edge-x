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
export async function getPublicCourses(id: number) {
  const courses = db.course.findUnique({
    select: {
      id: true,
      title: true,
      bannerImage: true,
      description: true,
      price: true,
      createdAt: true,
      updatedAt: true,

    },
    where: {
      id: id,
      openToEveryone: true
    }
  });
  return courses;
}
