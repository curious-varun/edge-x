import { z } from 'zod';

export const CourseGetSchema = z.object({ showPrivate: z.boolean() });
export const CourseGetByIdSchema = z.object({ courseId: z.string() });

