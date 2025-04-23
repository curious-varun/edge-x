interface Props { params: { slug: string } }

export default function AdminCoursePage({ params }: Props) {
  const slug = params.slug

  return (
    <div>
      <>{slug}</>
    </div>
  );
}

