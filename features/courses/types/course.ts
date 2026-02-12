export interface Course {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  previewVideoUrl: string;
  description: string;
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
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
}
