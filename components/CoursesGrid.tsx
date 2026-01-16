import { Course } from "../features/courses/services/courses";
import CourseCard from "./CourseCard";

interface CoursesGridProps {
  courses: Course[];
}

export default function CoursesGrid({ courses }: CoursesGridProps) {
  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Featured <span className="text-secondary">Courses</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 md:text-lg">
            Explore our most popular courses and start your journey today.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No courses available at the moment.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <button className="px-6 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-secondary focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-secondary transition-all">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
}
