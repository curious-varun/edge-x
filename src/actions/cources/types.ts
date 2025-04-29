import { ActionState } from '@/lib/create-safe-action';
import { CourseGetByIdSchema, CourseGetSchema } from './schema';
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


export type InputTypeGetCourseById = z.infer<typeof CourseGetByIdSchema>;
export type ReturnTypeGetCourseByIdAction = ActionState<InputTypeGetCourseById, Prisma.CourseGetPayload<{
  select: {
    id: true;
    title: true;
    bannerImage: true;
    price: true;
  }
}> | null>;


