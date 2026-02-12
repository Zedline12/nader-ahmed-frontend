export interface CourseAdmin {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: CourseLessonAdmin[]; // empty for now, but future-safe
   price:number;
  youtubeNiche: string;

  totalLessons: number;
  totalDurationHours: number;

  focusAreas: string[];

  videoCollectionId: string;

  enrollmentCount: number;
  averageRating: number;
  totalReviews: number;
  completionRate: number;

  lastUpdated: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export interface CourseLessonAdmin {
  id: string;
  title: string;
  description: string;
  videoUrl: string;

  /** Duration in minutes */
  duration: number;

  /** Lesson order inside the course */
  order: number;
  resources: any[];

  /** Step-by-step actions for the lesson */
  actionSteps: string[];

  /** Video chapters */
  chapters: Chapter[];
  moments: Moment[];
}

export interface Chapter {
  title: string;
  start: number; // in seconds
  end: number; // in seconds
}
export interface Moment {
  label: string;
  timestamp: string;
}
export interface CreateLessonDto {
  thumbnail: File;
  title: string;
  courseId: string;
  storageVideoId: string;
  videoUrl: string;
  chapters: Chapter[];
  moments: Moment[];
  description: string;
  actionSteps?: string[];
}
