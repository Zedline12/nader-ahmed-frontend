"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateLessonButtonProps {
  courseId: string;
}

export function CreateLessonButton({ courseId }: CreateLessonButtonProps) {
  return (
    <Button
      size="sm"
      onClick={() => console.log("Create lesson for", courseId)}
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Lesson
    </Button>
  );
}
