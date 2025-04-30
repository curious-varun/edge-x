"use server";

import Razorpay from "razorpay";
import { db } from "@/db";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { auth } from "@/lib/auth";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string ?? "rzp_test_Yd0WbBPFLGOKOJ",
  key_secret: process.env.RAZORPAY_KEY_SECRET as string ?? "jVh21X6ZaPhfQVMf9fX0EBip",
});

export type RazorpayResponseType = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function createOrderAction(courseId: string) {
  const session = await auth();
  if (!session || !session.user.id) {
    return { success: false, message: "User not authenticated." };
  }
  try {

    const course = await db.course.findFirst({
      select: {
        id: true,
        title: true,
        price: true,
      },
      where: {
        id: courseId
      }
    });
    if (!course) {
      return { success: false, message: "Course not found." };
    }

    const alreadyPurchased = await db.userPurchase.findFirst({
      where: {
        courseId: courseId,
        userId: session.user.id
      }
    });
    if (alreadyPurchased) {
      return { success: false, message: 'already purchased try refreshing' };
    }

    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: "INR",
      notes: {
        courseId: course.id,
        userId: session.user.id,
      },
    });

    return { success: true, order, message: "Order created successfully." };
  } catch (error) {
    console.error('Error in createCourseHandler:', error);
    return { success: false, message: 'Failed to create answer.' };
  }
}

export async function verifyPayment(obj: RazorpayResponseType) {
  const generatedSignature = `${obj.razorpay_order_id}|${obj.razorpay_payment_id}`;

  const isValidSignature = validateWebhookSignature(
    generatedSignature,
    obj.razorpay_signature,
    process.env.RAZORPAY_SECRET ?? "jVh21X6ZaPhfQVMf9fX0EBip"
  );

  if (isValidSignature) {

    const order = await razorpay.orders.fetch(obj.razorpay_order_id);
    if (!order || !order.notes) {
      return { success: false, message: "Could not retrieve order details or notes" };
    }


    const courseId = order.notes.courseId;
    const userId = order.notes.userId;

    if (!courseId || !userId) {
      return { success: false, message: "Order notes missing courseId or userId" };
    }
    else {

    }

    try {
      const purchase = await db.userPurchase.create({
        data: {
          userId: String(userId),
          courseId: String(courseId)
        }
      });
      return { success: true, message: "Payment verified successfully. Course purchased! ${purchase.id}" };
    } catch (error) {
      return { success: false, message: "error during update in db" };
    }

  } else {
    return { success: false, message: "Invalid payment signature. Verification failed." };
  }
}

