import Image from "next/image";
import Link from "next/link";

export const CourseGrid = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 50 }).map((_, i) => (
        <Link
          href="/"
          key={i}
          className="group overflow-hidden rounded-2xl border border-border bg-white/5 transition hover:shadow-xl"
        >
          <div className="relative h-40 w-full">
            <Image
              src="/gambling.jpg"
              alt={`Course ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">Course {i + 1}</h3>
            <p className="text-sm text-muted-foreground">Click to learn more</p>
          </div>
        </Link>
      ))}
    </div>
  );
};


