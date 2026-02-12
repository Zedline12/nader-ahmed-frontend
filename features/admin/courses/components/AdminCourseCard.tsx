"use client";

import { CourseAdmin } from "@/features/admin/courses/types/course";
import {
  Clock,
  BookOpen,
  Star,
  Users,
  Calendar,
  BarChart2,
} from "lucide-react";
import Image from "next/image";

interface AdminCourseCardProps {
  course: CourseAdmin;
}

export function AdminCourseCard({ course }: AdminCourseCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Header: Title and Niche */}
        <div  className="relative flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {course.youtubeNiche}
            </span> 
          </div>
          <div className="flex items-center text-yellow-500 gap-1 text-sm font-medium">
            <Star size={16} fill="currentColor" />
            <span>{course.averageRating.toFixed(1)}</span>
            <span className="text-gray-400 text-xs">
              ({course.totalReviews})
            </span>
          </div>
         
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">
          {course.description}
        </p>

        {/* Focus Areas */}
        <div className="flex flex-wrap gap-1">
          {course.focusAreas.map((area, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span>{course.totalDurationHours} Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-indigo-500" />
            <span>{course.totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-green-500" />
            <span>{course.enrollmentCount} Enrolled</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-purple-500" />
            <span>{Math.round(course.completionRate)}% Completion</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex flex-col gap-1 text-xs text-gray-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                Updated: {new Date(course.lastUpdated).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-400 truncate">ID: {course.id}</div>
        </div>
      </div>
    </div>
  );
}
