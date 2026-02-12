import { Trash2 } from "lucide-react";
import { Chapter } from "../types/course";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ChapterListProps {
  chapters: Chapter[];
  onDelete: (index: number) => void;
  onJumpTo: (time: number) => void;
}

export function ChapterList({
  chapters,
  onDelete,
  onJumpTo,
}: ChapterListProps) {
  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  if (chapters.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        No chapters added yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-2">
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div
              className="flex flex-col gap-1 cursor-pointer flex-1"
              onClick={() => onJumpTo(chapter.start)}
            >
              <div className="font-medium text-sm text-gray-900">
                {chapter.title}
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {formatTime(chapter.start)} - {formatTime(chapter.end)}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
              onClick={() => onDelete(index)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
