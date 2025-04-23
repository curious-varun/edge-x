import { z } from 'zod';

export const CourseGetSchema = z.object({ onlyPublic: z.boolean() });

