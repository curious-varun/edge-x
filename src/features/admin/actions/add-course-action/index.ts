'use server';

import { InputTypeCreateCourse, ReturnTypeCreateCourseAction } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { CourseCreateSchema } from './schema';
import { ROLE } from '@/constants';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { reloadCourcesPage } from '@/reload';


async function createCourseHandler(data: InputTypeCreateCourse): Promise<ReturnTypeCreateCourseAction> {
  const session = await auth();
  if (!session || session.user.role != ROLE.ADMIN) {
    return { error: 'Unauthorized' };
  }

  const { title, bannerImage, description, price, openToEveryone } = data;

  try {
    const result = await db.course.create({
      data: {
        title,
        bannerImage,
        description,
        price,
        openToEveryone,
      },
    });
    reloadCourcesPage();
    return { data: result };
  } catch (error) {
    console.error('Error in createCourseHandler:', error);
    return { error: 'Failed to create answer.' };
  }
}

export const createCourseAction = createSafeAction(CourseCreateSchema, createCourseHandler);
