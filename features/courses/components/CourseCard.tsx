"use client";

import { Course } from "@/lib/types/course.type";
import Image from "next/image";
import { Clock, BookOpen, Star, Users, Calendar } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No Thumbnail
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-700 shadow-sm border border-blue-100">
          {course.youtubeNiche}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-yellow-500 gap-1 text-sm font-medium">
            <Star size={14} fill="currentColor" />
            <span>{course.averageRating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(course.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {course.description}
        </p>

        <div className="pt-4 border-t border-gray-50 grid grid-cols-3 gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-blue-500" />
            <span>{course.durationWeeks} Weeks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-indigo-500" />
            <span>{course.totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-green-500" />
            <span>{course.enrollmentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
