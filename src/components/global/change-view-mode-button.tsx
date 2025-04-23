"use client";
import { LayoutGrid as Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChangeViewMode() {
  let viewMode = "implemt"
  return (
    <div className="flex items-center gap-2 ">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="icon"
        className="w-8 h-8"
        onClick={() => alert("implemt global state")}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="icon"
        className="w-8 h-8"
        onClick={() => alert("implemt global state")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
