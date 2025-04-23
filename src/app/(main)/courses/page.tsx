import { getPublicCourses, getCoursesType } from "@/db/course";
import { CourseGrid } from "@/features/course/components/course-grid";




export default async function CoursesPage() {
  const courses: getCoursesType[] = await getPublicCourses();
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="absolute top-0 h-80 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
      <div className="max-w-[1300px] mx-auto pt-10">
        <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          our cources
        </h1>
      </div>
      <div className="mt-20 relative max-w-[1250px] mx-auto  ">
        <Glow />
        <CourseGrid courses={courses} />
      </div>
    </>
  )
}

export function Glow() {
  return (
    <>
      < div className="absolute -top-10 left-0 h-80 w-0.5 bg-gradient-to-b from-blue-500 to-transparent" />
      <div className="absolute -bottom-40 right-0 h-80 w-0.5 bg-gradient-to-b from-teal-500  to-transparent" />
      <div className="absolute top-0 -left-10 w-80 h-px bg-gradient-to-r from-blue-500 via-transparent to-transparent" />
      <div className="absolute bottom-0 -right-10 w-80 h-px bg-gradient-to-l from-teal-500  to-transparent" />
    </>
  );
}
