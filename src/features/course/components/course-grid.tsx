"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid, List, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { getCoursesType } from "@/db/course";

type CourseCardProps = {
  course: getCoursesType;
  view: "grid" | "list";
};

export const CourseCard = ({ course, view }: CourseCardProps) => {
  const isGridView = view === "grid";

  const formattedPrice = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(course.price);

  const timeAgo = formatDistanceToNow(new Date(course.createdAt), { addSuffix: true });

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg",
      isGridView ? "flex flex-col" : "flex flex-row"
    )}>
      <div className={cn("relative ", isGridView ? "w-full h-60" : "w-1/3 h-full min-h-36")}>
        <Image
          src={course.bannerImage || "/api/placeholder/400/300"}
          alt={course.title}
          fill
          className="object-contain "
        />
      </div>

      <div className={cn(
        "flex flex-col",
        isGridView ? "w-full" : "w-2/3"
      )}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
            <div className="text-lg font-semibold text-primary">{formattedPrice}</div>
          </div>
        </CardHeader>

        <CardContent>
          <p className={cn(
            "text-muted-foreground",
            isGridView ? "line-clamp-2" : "line-clamp-3"
          )}>
            {course.description}
          </p>

          {!isGridView && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>Updated {timeAgo}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className={cn(
          "flex",
          isGridView ? "justify-between" : "justify-end"
        )}>
          {isGridView && (
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>Updated {timeAgo}</span>
            </div>
          )}
          <Link href={`/course/${course.id}`}>
            <Button >Go to Course</Button>
          </Link>
        </CardFooter>
      </div>
    </Card >
  );
};

type CourseGridProps = {
  courses: getCoursesType[]
  view?: "grid" | "list";
  toggleOption?: boolean
};

export const CourseGrid = ({ courses, view = "grid", toggleOption = true }: CourseGridProps) => {
  const [currentView, setCurrentView] = useState<"grid" | "list">(view);

  return (
    <div className="space-y-4">
      {toggleOption &&
        <div className="flex justify-end gap-2">
          <Button
            variant={currentView === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setCurrentView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={currentView === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setCurrentView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      }

      <div className={cn(
        "grid gap-4",
        currentView === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      )}>
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            view={currentView}
          />
        ))}
      </div>
    </div>
  );
};
