import { Prisma } from "@prisma/client"


export type coursesType = Prisma.CourseGetPayload<{
  select: {
    id: true;
    title: true;
    bannerImage: true;
    description: true;
    openToEveryone: true;
    price: true;
    createdAt: true;
    updatedAt: true;
  }
}>
