"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { getCourseAction } from "@/actions/cources";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
export function CourseList() {
  const [courses, setCourses] = useState<any>();
  const { execute } = useAction(getCourseAction, {
    onSuccess: (data) => {
      toast(`${data.length} courses fetched `);
      setCourses(data);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    execute({ showPrivate: false });
  }, [])



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {
        //@ts-ignore
        courses?.map((course) => (
          <Card key={course.id}>
            <CardContent className="p-4 space-y-2">
              <img
                src={course.bannerImage || "/default-banner.jpg"}
                alt={course.title}
                className="rounded-md h-40 w-full object-cover"
              />
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>
              <div className="text-sm font-medium">
                ₹{course.price} •{" "}
                {course.openToEveryone ? "Public" : "Private"}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/course/${course.id}`} className="w-full -mt-4">
                <Button variant="outline" className="w-full bg-accent/80 flex items-center justify-center gap-2" > go to course<SquareArrowOutUpRight className="size-4" /> </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

