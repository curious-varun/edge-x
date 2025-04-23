'use server';

import { InputTypeGetCourse, ReturnTypeGetCourseAction } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { CourseGetSchema } from './schema';
import { ROLE } from '@/constants';
import { auth } from '@/lib/auth';
import { db } from '@/db';



async function getCourseHandler(data: InputTypeGetCourse): Promise<ReturnTypeGetCourseAction> {
  const session = await auth();
  if (!session || session.user.role != ROLE.ADMIN) {
    return { error: 'Unauthorized' };
  }
  try {
    const result = await db.course.findMany({
      select: {
        id: true,
        title: true,
        bannerImage: true,
        description: true,
        openToEveryone: true,
        price: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return { data: result };
  } catch (error) {
    console.error('Error in createCourseHandler:', error);
    return { error: 'Failed to create answer.' };
  }
}

export const createCourseAction = createSafeAction(CourseGetSchema, getCourseHandler);

