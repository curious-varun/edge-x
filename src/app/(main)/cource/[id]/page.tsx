"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <h1 className="text-5xl font-semibold m-10 bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 via-cyan-400 to-blue-500">
        Course ID: {id}
      </h1>
    </div>
  );
}

