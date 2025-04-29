'use server'

import { auth } from '@/lib/auth';
import { db } from '@/db';
import { generateUniqueReciepts } from '@/utils/generate-reciepts';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: "rzp_test_Farf2sxVLw5xLw",
  key_secret: "tsSUUOOZdCFgYdpeGfrnvBbG",
});


export type CreateOrderResponse = { data: any } | { error: string };

export async function createOrderAction(courseId: string): Promise<CreateOrderResponse> {
  const session = await auth();
  if (!session || !session.user.id) {
    return { error: 'Unauthorized' };
  }

  try {
    const course = await db.course.findFirst({
      select: {
        title: true,
        price: true,
      },
      where: {
        id: courseId
      }
    });
    if (!course) {
      return { error: 'course not found' };
    }

    const alreadyPurchased = await db.userPurchase.findFirst({
      where: {
        courseId: courseId,
        userId: session.user.id
      }
    });
    if (alreadyPurchased) {
      return { error: 'already purchased try refreshing' };
    }


    const order = await razorpay.orders.create({
      amount: course?.price * 100,
      currency: 'INR',
    })
    return { data: order }

  } catch (error) {
    console.error('Error in createCourseHandler:', error);
    return { error: 'Failed to create answer.' };
  }
}
