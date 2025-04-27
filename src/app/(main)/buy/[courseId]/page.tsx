import { auth } from "@/lib/auth";

export default async function MainLayout({ params }: { params: { courseId: string } }) {
  const courseId = params.courseId;
  const session = await auth();

  return (
    <> buy button here </>

  );
}
