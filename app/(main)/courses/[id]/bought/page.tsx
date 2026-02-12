import { CourseLessonAdmin } from "@/features/admin/courses/types/course";
import { Course } from "@/features/courses/types/course";
import { fetchWithToken } from "@/lib/fetcher";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PlayCircle,
  CheckCircle,
  Lock,
  FileText,
  Download,
  Clock,
  Award,
  MoreVertical,
  File,
} from "lucide-react";
import Link from "next/link";
import { formatDuration } from "@/lib/format";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock Resources Data
const MOCK_RESOURCES = [
  { title: "Course Slides - Introduction.pdf", type: "PDF", size: "2.4 MB" },
  { title: "Project Assets.zip", type: "ZIP", size: "156 MB" },
  { title: "Cheat Sheet.pdf", type: "PDF", size: "1.1 MB" },
  { title: "Source Code - Starter.zip", type: "ZIP", size: "12 KB" },
];

export default async function BoughtCourse({ params }: PageProps) {
  const { id } = await params;

  // Fetch real data
  const [courseRes, lessonsRes] = await Promise.all([
    fetchWithToken(`/courses/${id}`),
    fetchWithToken(`/courses/${id}/lessons`),
  ]);

  const course: Course = await courseRes.json().then((d) => d.data);
  const lessons: CourseLessonAdmin[] = lessonsRes.ok
    ? await lessonsRes.json().then((d) => d.data)
    : [];

  // Mock Progress Data (In a real app, this would come from a user-progress endpoint)
  const progressPercentage = 35;
  const completedLessons = Math.floor(
    lessons.length * (progressPercentage / 100),
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header / Hero Section */}
      <div className="bg-slate-900 border-b border-slate-800 pt-8 pb-12 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Course Thumbnail */}
            <div className="w-full md:w-64 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <div className="relative aspect-video bg-slate-800">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <PlayCircle size={40} />
                  </div>
                )}
              </div>
            </div>

            {/* Course Info & Progress */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {course.title}
                </h1>
                <p className="text-slate-400 mt-2 line-clamp-2 max-w-2xl">
                  {course.description}
                </p>
              </div>

              <div className="max-w-xl space-y-2 pt-2">
                <div className="flex justify-between text-sm font-medium text-slate-300">
                  <span>{progressPercentage}% Complete</span>
                  <span>
                    {completedLessons}/{lessons.length} Lessons
                  </span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-2 bg-slate-700"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-900/20">
                  <PlayCircle size={18} className="mr-2" />
                  Continue Learning
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Award size={18} className="mr-2" />
                  Get Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Lesson List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="font-bold text-xl text-slate-900">
                  Course Curriculum
                </h2>
                <span className="text-sm text-slate-500 font-mono">
                  {formatDuration(course.totalDurationHours * 3600)} Total
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {lessons.map((lesson, idx) => {
                  // Mock status logic
                  const isCompleted = idx < completedLessons;
                  const isCurrent = idx === completedLessons;
                  const isLocked = idx > completedLessons;

                  return (
                    <div
                      key={lesson.order || idx}
                      className={`p-4 transition-colors flex gap-4 items-center group ${isCurrent ? "bg-blue-50/50" : "hover:bg-slate-50"}`}
                    >
                      <div className="shrink-0 pt-1">
                        {isCompleted ? (
                          <CheckCircle className="text-emerald-500" size={20} />
                        ) : isCurrent ? (
                          <PlayCircle
                            className="text-blue-600 fill-blue-100"
                            size={20}
                          />
                        ) : (
                          <Lock className="text-slate-300" size={20} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3
                            className={`font-medium truncate pr-4 ${isCompleted ? "text-slate-900" : isCurrent ? "text-blue-700 font-semibold" : "text-slate-500"}`}
                          >
                            {lesson.title}
                          </h3>
                          <span className="text-xs text-slate-400 shrink-0 font-mono mt-0.5">
                            {formatDuration(lesson.duration * 60)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-1">
                          {lesson.description}
                        </p>
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical size={16} className="text-slate-400" />
                      </Button>
                    </div>
                  );
                })}

                {lessons.length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    No lessons available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Resources & Info */}
          <div className="space-y-6 lg:mt-8">
            {/* Resources Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" />
                  Course Resources
                </h3>
              </div>
              <div className="p-2">
                {MOCK_RESOURCES.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg group transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                      <File size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">
                        {res.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {res.type} • {res.size}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-slate-400 hover:text-purple-600"
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Note (Optional Polish) */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

              <h3 className="font-bold mb-2 relative z-10">Need Help?</h3>
              <p className="text-indigo-100 text-sm mb-4 relative z-10">
                Join our community Discord server to ask questions and share
                your progress with other students.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-indigo-700 font-bold relative z-10"
              >
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
