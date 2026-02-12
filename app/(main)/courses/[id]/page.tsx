import { Course } from "@/features/courses/types/course";
import { CourseLessonAdmin } from "@/features/admin/courses/types/course";
import { fetchWithToken } from "@/lib/fetcher";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Globe,
  Award,
  Clock,
  FileText,
  Smartphone,
  Info,
  PlayCircle,
  Check,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatDuration } from "@/lib/format";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CoursePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) return notFound();

  // Parallel data fetching
  const [courseRes, lessonsRes] = await Promise.all([
    fetchWithToken(`/courses/${id}`),
    fetchWithToken(`/courses/${id}/lessons`),
  ]);

  if (!courseRes.ok) return notFound();

  const course: Course = await courseRes.json().then((d) => d.data);
  const lessons: CourseLessonAdmin[] = (await lessonsRes.ok)
    ? await lessonsRes.json().then((d) => d.data)
    : [];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Dark Hero Section */}
      <div className="bg-slate-900 text-white pt-12 pb-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Header Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-blue-200 text-sm font-medium">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors"
                >
                  Courses
                </Link>
                <span>/</span>
                <span className="text-white truncate max-w-[200px]">
                  {course.title}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {course.title}
              </h1>

              <p className="text-lg text-slate-200 line-clamp-2">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1 text-yellow-400">
                  <span className="font-bold">
                    {course.averageRating || "4.8"}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill={
                          star <= Math.round(course.averageRating || 5)
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          star <= Math.round(course.averageRating || 5)
                            ? ""
                            : "text-slate-600"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-blue-200 underline cursor-pointer ml-1">
                    ({course.totalReviews || 120} ratings)
                  </span>
                </div>
                <div className="text-slate-200">
                  {course.enrollmentCount || 0} students
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                <div className="flex items-center gap-1">
                  <Info size={16} />
                  Last updated{" "}
                  {new Date(
                    course.lastUpdated || course.updatedAt,
                  ).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Globe size={16} />
                  English
                </div>
              </div>
            </div>

            {/* Start of Sidebar Column (Handling sticking in the layout below, 
                but visual placement for mobile is handled by order) */}
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Sidebar */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Course Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <div className="border border-slate-200 p-6 md:p-8 rounded-xl bg-white shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.focusAreas?.length ? (
                  course.focusAreas.map((area, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <Check
                        className="text-slate-900 shrink-0 mt-1"
                        size={18}
                      />
                      <span className="text-slate-700 text-sm md:text-base">
                        {area}
                      </span>
                    </div>
                  ))
                ) : (
                  // Fallback if no focus areas
                  <>
                    <div className="flex gap-3 items-start">
                      <Check
                        className="text-slate-900 shrink-0 mt-1"
                        size={18}
                      />
                      <span className="text-slate-700">
                        Master the fundamentals of {course.title}
                      </span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Check
                        className="text-slate-900 shrink-0 mt-1"
                        size={18}
                      />
                      <span className="text-slate-700">
                        Build real-world projects
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Course Content / Curriculum */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Course content
              </h2>
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>
                  {course.totalLessons || lessons.length} lessons •{" "}
                  {course.totalDurationHours}h total length
                </span>
                {/* <button className="text-blue-600 font-semibold hover:underline">Expand all sections</button> */}
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {lessons.map((lesson, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx}`}
                      className="bg-slate-50 border-b-slate-200"
                    >
                      <AccordionTrigger className="px-4 py-4 hover:bg-slate-100 hover:no-underline transition-colors">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-3">
                            <Video className="text-slate-500" size={18} />
                            <span className="text-left font-medium text-slate-900">
                              {lesson.title}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 font-normal">
                            {formatDuration(lesson.duration * 60)}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-white p-4">
                        <div className="space-y-3">
                          <p className="text-slate-600 text-sm">
                            {lesson.description ||
                              "No description provided for this lesson."}
                          </p>
                          {lesson.chapters && lesson.chapters.length > 0 && (
                            <div className="pl-6 border-l-2 border-slate-100 space-y-2 mt-3">
                              {lesson.chapters.map((chap, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="flex justify-between text-xs text-slate-500"
                                >
                                  <span>{chap.title}</span>
                                  <span>
                                    {Math.floor(chap.start / 60)}:
                                    {String(
                                      Math.floor(chap.start % 60),
                                    ).padStart(2, "0")}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="pt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <span className="text-blue-600 text-xs font-semibold cursor-pointer hover:underline">
                                  Preview Lesson
                                </span>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
                                <div className="relative aspect-video w-full">
                                  <iframe
                                    src={
                                      course.previewVideoUrl || lesson.videoUrl
                                    }
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  {lessons.length === 0 && (
                    <div className="p-6 text-center text-slate-500">
                      No lessons available yet.
                    </div>
                  )}
                </Accordion>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Description</h2>
              <div className="prose prose-slate max-w-none text-slate-700">
                <p>{course.description}</p>
                {/* If description is HTML we would use dangerouslySetInnerHTML, 
                      assuming plain text/line breaks for now or simple mapping */}
              </div>
            </div>

            {/* Instructor */}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24 space-y-6">
              {/* Course Purchase Card */}
              <div className="bg-white shadow-xl border border-slate-200 rounded-xl overflow-hidden -mt-[0px] lg:-mt-[350px] z-10 relative">
                {/* Thumbnail */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative aspect-video group cursor-pointer bg-slate-100">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Video size={48} />
                        </div>
                      )}

                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle
                          size={64}
                          className="text-white fill-white/20"
                        />
                      </div>
                      <div className="absolute bottom-4 left-0 right-0 text-center font-semibold text-white text-sm drop-shadow-md">
                        Preview this course
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
                    <div className="relative aspect-video w-full">
                      <iframe
                        src={
                          course.previewVideoUrl ||
                          (lessons.length > 0 ? lessons[0].videoUrl : "")
                        }
                       loading="lazy" width="1150" height="850" style={{border: "none"}} allow="fullscreen; accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-slate-900">
                      $12.99
                    </span>
                    <span className="text-slate-500 line-through text-lg">
                      $84.99
                    </span>
                    <span className="text-sm font-medium text-slate-900">
                      85% off
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full h-12 text-base font-bold bg-purple-600 hover:bg-purple-700">
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base font-bold border-slate-400 text-slate-900 hover:bg-slate-50"
                    >
                      Buy Now
                    </Button>
                  </div>

                  <p className="text-xs text-center text-slate-500">
                    30-Day Money-Back Guarantee
                  </p>

                  <div className="space-y-4 pt-2">
                    <h4 className="font-bold text-slate-900 text-sm">
                      This course includes:
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-600">
                      <li className="flex items-center gap-3">
                        <Video size={16} />
                        <span>
                          {course.totalDurationHours} hours on-demand video
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FileText size={16} />
                        <span>{course.totalLessons} articles</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Smartphone size={16} />
                        <span>Access on mobile and TV</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Award size={16} />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Business / Enterprise Promo (Optional) */}
              {/* <div className="border border-slate-200 p-6 bg-white shadow-sm rounded-xl">
                    <h3 className="font-bold text-slate-900 mb-2">Training 5 or more people?</h3>
                    <p className="text-sm text-slate-600 mb-4">
                        Get your team access to this course plus 26,000+ top-rated Udemy courses anytime, anywhere.
                    </p>
                    <Button variant="outline" className="w-full font-bold">Try Udemy Business</Button>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
