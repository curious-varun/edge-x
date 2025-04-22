import { z } from 'zod';

export const CourseCreateSchema = z.object({
  title: z.string().min(3, { message: "The title is very short" }),
  bannerImage: z.string(),
  description: z.string(),
  openToEveryone: z.boolean(),
  price: z.number(),
});

