export default async function MainLayout({ params, children, }: { params: { courseId: string }; children: any; }) {
  return (
    <div >
      {children}
    </div >
  )
}


