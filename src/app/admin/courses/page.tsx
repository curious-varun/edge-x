import { AddCourseForm } from "@/features/admin/components/add-course-form";
import { ChangeViewMode } from "@/components/global/change-view-mode-button";
import { CourseList } from "@/features/temp/components/course-grid";



export default async function AdminCoursePage() {

  return (
    <div>
      <div className="flex items-center justify-between p-4 relative">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div className="flex items-center  gap-4">
          <ChangeViewMode />
          <AddCourseForm />
        </div>
      </div>
      <div className="h-0.5 w-full top-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <main className="p-4">
        {/* //TODO: implemt the state-management and cashing  */}
        <CourseList />
      </main >
    </div >
  );
}
