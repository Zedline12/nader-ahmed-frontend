"use client";

import { useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { VideoChapterEditor } from "@/features/admin/courses/components/VideoChapterEditor";
import { Chapter, Moment } from "@/features/admin/courses/types/course";
import * as tus from "tus-js-client";
import {
  createLessonUpload,
  CreateUploadResponse,
} from "@/features/admin/courses/actions/course";
import { UploadProgress } from "@/features/admin/courses/components/UploadProgress";

interface CreateLessonPageProps {
  params: Promise<{ id: string }>;
}

export default  function CreateLessonPage({ params }: CreateLessonPageProps) {
  const router = useRouter();
  const { id: courseId } = use(params);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "complete" | "error"
  >("idle");
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Please enter a lesson title");
      return;
    }

    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }

    if (!thumbnailFile) {
      toast.error("Please select a thumbnail image");
      return;
    }

    setIsSubmitting(true);
    setUploadStatus("uploading");

    try {
      // 1. Get Presigned URL and Signature
      const uploadConfig = await createLessonUpload(courseId, title);
      console.log("Upload Config:", uploadConfig);

      // 2. Start TUS Upload
      const upload = new tus.Upload(videoFile, {
        endpoint: "https://video.bunnycdn.com/tusupload",
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
        headers: {
          AuthorizationSignature: uploadConfig.signature,
          AuthorizationExpire: uploadConfig.expiration.toString(),
          VideoId: uploadConfig.videoId,
          LibraryId: uploadConfig.libraryId.toString(),
        },
        metadata: {
          filetype: videoFile.type,
          title: title,
          collection: uploadConfig.collectionId,
        },
        onError: function (error) {
          console.error("Upload failed:", error);
          toast.error("Upload failed: " + error.message);
          setUploadStatus("error");
          setIsSubmitting(false);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const percentage = (bytesUploaded / bytesTotal) * 100;
          setUploadProgress(percentage);
        },
        onSuccess: async function () {
          console.log("Upload finished:", upload.url);
          setUploadStatus("complete");
          toast.success(
            "Video uploaded successfully. Saving lesson details...",
          );

          // 3. Submit Lesson Data to API
          try {
            const formData = new FormData();
            formData.append("thumbnail", thumbnailFile);
            formData.append("title", title);
            formData.append("courseId", courseId);
            formData.append("storageVideoId", uploadConfig.videoId);
            formData.append("videoUrl", upload.url || "");
            formData.append("chapters", JSON.stringify(chapters));
            formData.append("moments", JSON.stringify(moments));
            formData.append("description", description);

            const response = await fetch(
              `/api/admin/courses/${courseId}/lessons`,
              {
                method: "POST",
                body: formData,
              },
            );

            if (!response.ok) {
              throw new Error("Failed to save lesson data");
            }

            const data = await response.json();
            console.log("Lesson Saved:", data);
            toast.success("Lesson created successfully!");
            router.back();
          } catch (saveError: any) {
            console.error("Save failed:", saveError);
            toast.error("Failed to save lesson details: " + saveError.message);
            setIsSubmitting(false);
          }
        },
      });

      // Check for previous uploads
      const previousUploads = await upload.findPreviousUploads();
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      upload.start();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to initiate upload");
      setIsSubmitting(false);
      setUploadStatus("error");
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Create New Lesson
            </h1>
            <p className="text-muted-foreground">
              Add a new video lesson to your course content.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Uploading..." : "Save Lesson"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
            <CardDescription>
              Basic information about the lesson.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                placeholder="e.g. Understanding React Hooks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Brief overview of what this lesson covers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail Image</Label>
              <div
                className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-40"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                {thumbnailFile ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(thumbnailFile)}
                      alt="Thumbnail Preview"
                      className="max-h-full object-contain"
                    />
                    <p className="absolute bottom-0 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {thumbnailFile.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Click to upload thumbnail
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailInputRef}
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Content</CardTitle>
            <CardDescription>
              Upload your lesson video and define chapters for better
              navigation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadStatus !== "idle" && (
              <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                <UploadProgress
                  fileName={videoFile?.name || "Video"}
                  progress={uploadProgress}
                  status={
                    uploadStatus === "uploading"
                      ? "uploading"
                      : uploadStatus === "complete"
                        ? "complete"
                        : "error"
                  }
                />
              </div>
            )}

            <VideoChapterEditor
              initialChapters={chapters}
              onChaptersChange={setChapters}
              onMomentsChange={setMoments}
              onVideoChange={setVideoFile}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
