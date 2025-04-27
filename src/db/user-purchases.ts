import { db } from "@/db";
import { Prisma } from "@prisma/client";


export type userPurchasesType = Prisma.UserPurchaseGetPayload<{
  select: {
    courseId: true;
    course: {
      select: {
        title: true;
        bannerImage: true;
      }
    }
  }
}>;
export async function getUserPurchases(userId?: string): Promise<userPurchasesType[]> {
  if (!userId) return []
  return db.userPurchase.findMany({
    where: {
      userId: userId
    },
    select: {
      courseId: true,
      course: {
        select: {
          bannerImage: true,
          title: true,
        }
      }
    }
  });
}
