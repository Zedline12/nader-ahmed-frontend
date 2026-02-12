import { CourseLessonAdmin } from "@/features/admin/courses/types/course";
import { fetchWithToken } from "@/lib/fetcher";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { id, lessonId } = await params;

  // Fetch lesson data
  const lessonRes = await fetchWithToken(`/courses/${id}/lessons/${lessonId}`);

  if (!lessonRes.ok) {
    return notFound();
  }

  const lesson: CourseLessonAdmin = await lessonRes.json().then((d) => d.data);

  return (
    <div className="container mx-auto py-8 lg:px-8 max-w-7xl">
      <div className="mb-6">
        <Link
          href={`/dashboard/courses/${id}`}
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Course
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">{lesson.title}</h1>
        <p className="text-slate-500 mt-2 text-lg">{lesson.description}</p>
      </div>

      <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg border bg-black">
        <iframe src="https://iframe.mediadelivery.net/embed/581270/1955b3c1-cf94-4167-a139-788e6809f9af?autoplay=true" loading="lazy" width="1150" height="600" style={{border: "none"}} allow="fullscreen; accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"></iframe>
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-2">Lesson Resources</h3>
        {lesson.resources && lesson.resources.length > 0 ? (
          <ul className="list-disc list-inside text-slate-600">
            {lesson.resources.map((res: any, idx: number) => (
              <li key={idx}>Resource link (placeholder)</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 Italic">
            No resources attached to this lesson.
          </p>
        )}
      </div>
    </div>
  );
}
