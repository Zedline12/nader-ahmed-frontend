import { CourseLessonAdmin } from "../types/course";
import { Clock, PlayCircle, FileText, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Check if badge exists, if not use span. I didn't see badge in list, I'll use span for now to be safe or check later. I'll use raw tailwind for badge-like look to be safe.

interface AdminLessonCardProps {
  lesson: CourseLessonAdmin;
}

export function AdminLessonCard({ lesson }: AdminLessonCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">
            {lesson.order}
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-gray-900 line-clamp-1">
              {lesson.title}
            </h4>
            <p className="text-sm text-gray-500 line-clamp-2">
              {lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{lesson.duration} min</span>
              </div>
              {lesson.videoUrl && (
                <div className="flex items-center gap-1 text-green-600">
                  <PlayCircle size={14} />
                  <span>Video Attached</span>
                </div>
              )}
            </div>

            {/* {(lesson.actionSteps.length > 0 || lesson.resources.length > 0) && (
              <div className="flex gap-2 mt-2">
                {lesson.actionSteps.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700">
                    <ListChecks size={12} />
                    {lesson.actionSteps.length} Steps
                  </span>
                )}
                {lesson.resources.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-orange-50 text-orange-700">
                    <FileText size={12} />
                    {lesson.resources.length} Files
                  </span>
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
