import { ActionState } from '@/lib/create-safe-action';
import { CourseGetSchema } from './schema';
import { Prisma } from "@prisma/client";
import { z } from 'zod';


export type InputTypeGetCourse = z.infer<typeof CourseGetSchema>;
export type ReturnTypeGetCourseAction = ActionState<InputTypeGetCourse, Array<Prisma.CourseGetPayload<{
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
}>>>;


