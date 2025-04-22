import { ActionState } from '@/lib/create-safe-action';
import { CourseCreateSchema } from './schema';
import { z } from 'zod';
import { Course } from "@prisma/client";


export type InputTypeCreateCourse = z.infer<typeof CourseCreateSchema>;
export type ReturnTypeCreateCourseAction = ActionState<InputTypeCreateCourse, Course>;

