import Link from "next/link";
import { BookOpen, Clock, DollarSign } from "lucide-react";
import { Course } from "../features/courses/services/courses";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300 overflow-hidden">
      {/* Image Placeholder */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        {/* Since we don't have real images, we use a gradient placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-gray-200 group-hover:scale-105 transition-transform duration-500"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-secondary shadow-sm border border-gray-100">
          {course.category}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2 group-hover:text-secondary transition-colors">
          {course.title}
        </h3>
        <p className="flex-grow text-gray-500 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center space-x-4 text-xs font-medium text-gray-500 mb-6">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1 text-secondary" />
            <span>12 Lessons</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            <span>6h 30m</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-lg font-bold text-gray-900">
            <DollarSign className="w-5 h-5 text-gray-900" />
            {course.price}
          </div>
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg group-hover:bg-secondary transition-colors"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
