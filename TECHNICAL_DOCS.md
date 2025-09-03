# VibeFinder Technical Documentation

This document provides detailed technical information about the VibeFinder application, including architecture, data flow, API integrations, and implementation details.

## Architecture Overview

VibeFinder follows a modern web application architecture with the following components:

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks and Context API
- **Routing**: Next.js App Router

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for media files
- **Serverless Functions**: Next.js API Routes

### External APIs
- **EnsembleData**: For social media content scraping
- **SocialKit Video Analysis API**: For video content analysis
- **OpenAI (GPT-4/3.5)**: For natural language processing and content categorization
- **Google Maps Geocoding/Places API**: For location data and map visualization
- **Supabase**: For backend services and real-time updates

## Data Flow

1. **Social Media Data Collection**:
   - EnsembleData API scrapes Instagram and TikTok for trending content
   - Content is filtered based on location and relevance

2. **Content Analysis**:
   - SocialKit API analyzes video content to extract key information
   - OpenAI processes text data to categorize venues and extract "vibes"

3. **Recommendation Generation**:
   - Analyzed data is processed to create structured recommendations
   - Recommendations are scored based on trend metrics and relevance

4. **User Personalization**:
   - User preferences are collected during onboarding
   - Recommendations are filtered and ranked based on user preferences

5. **Presentation**:
   - Recommendations are displayed on an interactive map
   - Detailed information is shown in recommendation cards

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{"vibes": [], "location": "", "savedLocations": []}'::jsonb,
  onboarding_complete BOOLEAN DEFAULT FALSE
);
```

### Recommendations Table
```sql
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  location TEXT NOT NULL,
  social_media_url TEXT,
  trend_score NUMERIC NOT NULL,
  vibe_tags TEXT[] NOT NULL,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Venues Table
```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  categories TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Saved Recommendations Table
```sql
CREATE TABLE saved_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recommendation_id)
);
```

## API Endpoints

### User API

#### GET /api/user
- Returns the current user's profile and preferences
- Authentication required

#### PUT /api/user/preferences
- Updates the user's preferences
- Authentication required
- Request body: `{ vibes: string[], location: string }`

#### POST /api/user/onboarding
- Completes the user's onboarding process
- Authentication required
- Request body: `{ vibes: string[], location: string, connectSocial: boolean }`

### Recommendations API

#### GET /api/recommendations
- Returns a list of recommendations
- Query parameters:
  - `vibes`: Filter by vibes (comma-separated)
  - `distance`: Filter by distance (in miles)
  - `category`: Filter by category
  - `page`: Page number for pagination
  - `limit`: Number of items per page

#### GET /api/recommendations/:id
- Returns a single recommendation by ID

#### POST /api/recommendations/:id/save
- Saves a recommendation to the user's saved locations
- Authentication required

## Component Structure

### UI Components
- `AppHeader`: Main navigation header
- `RecommendationCard`: Card displaying recommendation information
- `MapPin`: Map marker for recommendations
- `VibeTag`: Tag component for displaying vibes

### Map Components
- `InteractiveMap`: Main map component for displaying recommendations

### Recommendation Components
- `RecommendationList`: List of recommendation cards
- `RecommendationDetail`: Detailed view of a recommendation
- `FilterBar`: Filtering options for recommendations

### Auth Components
- `OnboardingForm`: User onboarding form for collecting preferences

## State Management

VibeFinder uses React's Context API for global state management:

```typescript
// UserContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { getCurrentUser } from '@/lib/api/user';

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const response = await getCurrentUser();
      if (response.data) {
        setUser(response.data);
      }
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
```

## Error Handling

VibeFinder implements a consistent error handling approach:

1. **API Error Handling**:
   - All API responses include a standard format: `{ data: T, error?: string }`
   - Errors are caught and processed at the API level

2. **UI Error Handling**:
   - Error states are displayed to users with clear messages
   - Retry mechanisms are provided where appropriate

3. **Logging**:
   - Client-side errors are logged to the console in development
   - In production, errors would be sent to a monitoring service

## Performance Optimization

1. **Code Splitting**:
   - Next.js automatic code splitting for smaller bundle sizes
   - Dynamic imports for larger components

2. **Image Optimization**:
   - Next.js Image component for automatic optimization
   - Responsive images with appropriate sizes

3. **Caching**:
   - API responses are cached where appropriate
   - Static generation for non-dynamic pages

4. **Lazy Loading**:
   - Components and data are loaded only when needed
   - Infinite scrolling for recommendation lists

## Security Considerations

1. **Authentication**:
   - Supabase handles secure authentication
   - JWT tokens for API authorization

2. **Data Protection**:
   - User data is encrypted at rest
   - HTTPS for all API communications

3. **Input Validation**:
   - All user inputs are validated on both client and server
   - Sanitization of data to prevent XSS attacks

4. **API Rate Limiting**:
   - Rate limiting on all API endpoints to prevent abuse

## Deployment

VibeFinder is deployed using the following infrastructure:

1. **Hosting**:
   - Vercel for the Next.js application
   - Supabase for the backend services

2. **CI/CD**:
   - GitHub Actions for continuous integration
   - Automated testing before deployment

3. **Monitoring**:
   - Vercel Analytics for performance monitoring
   - Sentry for error tracking

## Future Enhancements

1. **Real-time Updates**:
   - Implement Supabase real-time subscriptions for live updates

2. **Machine Learning**:
   - Enhance recommendation algorithm with ML-based personalization

3. **Mobile App**:
   - Develop native mobile applications using React Native

4. **Social Features**:
   - Add social sharing and friend recommendations

5. **Advanced Analytics**:
   - Implement detailed analytics for venue popularity trends

