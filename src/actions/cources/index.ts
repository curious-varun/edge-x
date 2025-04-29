'use server';

import { InputTypeGetCourse, InputTypeGetCourseById, ReturnTypeGetCourseAction, ReturnTypeGetCourseByIdAction } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { CourseGetByIdSchema, CourseGetSchema } from './schema';
import { ROLE } from '@/constants';
import { auth } from '@/lib/auth';
import { db } from '@/db';


//TODO : implement cashing
async function getCourseHandler(data: InputTypeGetCourse): Promise<ReturnTypeGetCourseAction> {
  try {
    if (data.showPrivate) {
      const session = await auth();
      if (!session || session.user.role != ROLE.ADMIN) {
        return { error: 'Unauthorized' };
      }
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
    }
    else {
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
    }

  } catch (error) {
    console.error('Error in createCourseHandler:', error);
    return { error: 'Failed to create answer.' };
  }
}

export const getCourseAction = createSafeAction(CourseGetSchema, getCourseHandler);

async function getCourseByIdHandler(data: InputTypeGetCourseById): Promise<ReturnTypeGetCourseByIdAction> {
  const session = await auth();
  if (!session || session.user.role != ROLE.ADMIN) {
    return { error: 'Unauthorized' };
  }
  try {
    const result = await db.course.findFirst({
      select: {
        id: true,
        title: true,
        bannerImage: true,
        price: true,
      },
      where: { id: data.courseId }
    });
    if (!data || data == null)
      return { error: 'failed to fetch the course please check the course Id' };
    return { data: result };

  }
  catch (error) {
    console.error('Error in getCourseByIdHandler:', error);
    return { error: 'Failed to create answer.' };
  }
}

export const getCourseByIdAction = createSafeAction(CourseGetByIdSchema, getCourseByIdHandler);
