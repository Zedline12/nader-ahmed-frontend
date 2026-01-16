export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  youtubeNiche: string;
  durationWeeks: number;
  totalLessons: number;
  totalDuration: number;
  videoCollectionId: string;
  enrollmentCount: number;
  averageRating: number;
  lastUpdated: string;
}
