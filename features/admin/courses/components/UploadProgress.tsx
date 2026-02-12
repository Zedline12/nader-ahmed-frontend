"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadProgressProps {
  fileName: string;
  progress: number;
  className?: string;
  status?: "uploading" | "complete" | "error";
}

export function UploadProgress({
  fileName,
  progress,
  className,
  status = "uploading",
}: UploadProgressProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-gray-700 truncate max-w-[200px]">
          {fileName}
        </span>
        <span className="text-gray-500">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>
          {status === "uploading" && "Uploading..."}
          {status === "complete" && "Upload Complete"}
          {status === "error" && "Error Uploading"}
        </span>
      </div>
    </div>
  );
}
