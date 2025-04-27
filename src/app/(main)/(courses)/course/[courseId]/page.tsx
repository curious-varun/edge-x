import { getUserPurchases, userPurchasesType } from "@/db/user-purchases";
import { auth } from "@/lib/auth";
import Image from "next/image";

function hasAccess(courseId: string, data: userPurchasesType[]) {
  return data.some((purchase) => purchase.courseId.toString() === courseId.toString());
}

export default async function MainLayout({ params }: { params: { courseId: string } }) {
  const courseId = params.courseId;
  const session = await auth();
  const data = await getUserPurchases(session?.user.id);

  const courseData = data.find((purchase) => purchase.courseId.toString() === courseId.toString());
  const isPurchased = hasAccess(courseId, data);

  return (
    <div className="">
      {/* Course Header */}
      <div className="relative">
        {courseData?.course?.bannerImage ? (
          <Image
            src={courseData.course.bannerImage}
            alt={courseData.course.title}
            width={400}
            height={500}
            objectFit="objectFit"
            className="w-full h-60 object-cover"
          />
        ) : <> </>}
        <div className="absolute bg-white -bottom-1 left-4">
          <h1 className="font-bold text-7xl">{courseData?.course?.title || "Course Title"}</h1>
        </div>
      </div>
      {/* Summary Badge or Info */}
      <div className="mt-4 text-center">
        <span className="inline-block bg-green-200 text-green-800 px-4 py-2 rounded-full">
          Summary / Badge
        </span>
      </div>

      {/* Content based on access */}
      <div className="mt-8">
        {isPurchased ? (
          <div>
            {/* Actual course content */}
            actural
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-lg font-semibold mb-4">You don't have access to this course.</p>
            <a
              href={`/buy/${courseId}`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Buy This Course
            </a>
          </div>
        )}
      </div>
    </div >
  );
}
