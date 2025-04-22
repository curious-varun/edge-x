"use client";
import React, { useState } from "react";
import { LayoutGrid as Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCourseForm } from "@/features/admin/components/add-course-form";



export default function AdminCoursePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  return (
    <div>
      <div className="flex items-center justify-between p-4 relative">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 ">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className="w-8 h-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className="w-8 h-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <AddCourseForm />
        </div>
      </div>
      <div className="h-0.5 w-full top-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="p-4">
        <> data </>
        {viewMode}
      </div>
    </div >
  );
}
