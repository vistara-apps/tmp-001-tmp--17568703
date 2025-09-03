// User entity
export interface User {
  userId: string;
  preferences: {
    vibes: string[];
    location: string;
    savedLocations?: string[];
  };
  onboarding_complete: boolean;
}

// Recommendation entity
export interface Recommendation {
  recommendationId: string;
  title: string;
  description: string;
  venue_name: string;
  location: string;
  social_media_url?: string;
  trend_score: number;
  vibe_tags: string[];
  image_url?: string;
  video_url?: string;
  timestamp: string;
}

// Venue entity
export interface Venue {
  venueId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  categories: string[];
}

// Filter options
export interface FilterOptions {
  vibes?: string[];
  distance?: number;
  category?: string | null;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

