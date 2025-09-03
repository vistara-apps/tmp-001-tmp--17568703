import { Recommendation, FilterOptions, ApiResponse, PaginatedResponse } from '../types';

// Mock data for recommendations
const mockRecommendations: Recommendation[] = [
  {
    recommendationId: '1',
    title: 'Hidden Speakeasy with Live Jazz',
    description: 'A secret speakeasy with craft cocktails and live jazz performances. The dimly lit atmosphere creates an intimate setting perfect for date nights or catching up with friends.',
    venue_name: 'The Blind Tiger',
    location: '123 Main St, New York, NY',
    social_media_url: 'https://instagram.com/blindtiger',
    trend_score: 9.2,
    vibe_tags: ['Cozy', 'Intimate', 'Trendy', 'Nightlife'],
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-nightclub-4344-large.mp4',
    timestamp: new Date().toISOString(),
  },
  {
    recommendationId: '2',
    title: 'Rooftop Garden Café',
    description: 'A peaceful rooftop café with stunning city views and a lush garden setting. Perfect for working remotely or enjoying a quiet afternoon with specialty coffee and pastries.',
    venue_name: 'Sky Garden',
    location: '456 Park Ave, New York, NY',
    social_media_url: 'https://instagram.com/skygarden',
    trend_score: 8.7,
    vibe_tags: ['Chill', 'Outdoor', 'Scenic', 'Quiet'],
    image_url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    recommendationId: '3',
    title: 'Interactive Art Exhibition',
    description: 'A mind-bending interactive art installation where visitors become part of the exhibit. Features light projections, sound design, and responsive environments.',
    venue_name: 'Immersive Gallery',
    location: '789 Broadway, New York, NY',
    social_media_url: 'https://instagram.com/immersivegallery',
    trend_score: 9.5,
    vibe_tags: ['Artsy', 'Energetic', 'Modern', 'Unique'],
    image_url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-in-neon-lights-31281-large.mp4',
    timestamp: new Date().toISOString(),
  },
  {
    recommendationId: '4',
    title: 'Farm-to-Table Restaurant',
    description: 'A sustainable restaurant serving seasonal dishes made with locally sourced ingredients. The menu changes weekly based on what's fresh from nearby farms.',
    venue_name: 'Harvest Table',
    location: '321 River Rd, New York, NY',
    social_media_url: 'https://instagram.com/harvesttable',
    trend_score: 8.9,
    vibe_tags: ['Cozy', 'Upscale', 'Sustainable', 'Foodie'],
    image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    recommendationId: '5',
    title: 'Underground Dance Club',
    description: 'A vibrant underground club featuring electronic music from emerging DJs. Known for its energetic crowd and immersive light shows that go until dawn.',
    venue_name: 'Pulse',
    location: '555 Night St, New York, NY',
    social_media_url: 'https://instagram.com/pulseclub',
    trend_score: 9.0,
    vibe_tags: ['Energetic', 'Nightlife', 'Trendy', 'Vibrant'],
    image_url: 'https://images.unsplash.com/photo-1571204829887-3b8d69e23af5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-in-a-disco-club-4430-large.mp4',
    timestamp: new Date().toISOString(),
  },
  {
    recommendationId: '6',
    title: 'Vintage Arcade Bar',
    description: 'A nostalgic bar filled with classic arcade games from the 80s and 90s. Enjoy craft beers while playing everything from Pac-Man to pinball machines.',
    venue_name: 'Pixel Lounge',
    location: '888 Retro Blvd, New York, NY',
    social_media_url: 'https://instagram.com/pixellounge',
    trend_score: 8.5,
    vibe_tags: ['Casual', 'Quirky', 'Nostalgic', 'Fun'],
    image_url: 'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    timestamp: new Date().toISOString(),
  }
];

// Get recommendations with optional filtering
export async function getRecommendations(
  filters?: FilterOptions,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PaginatedResponse<Recommendation>>> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    let filteredRecommendations = [...mockRecommendations];
    
    // Apply filters if provided
    if (filters) {
      // Filter by vibes
      if (filters.vibes && filters.vibes.length > 0) {
        filteredRecommendations = filteredRecommendations.filter(rec => 
          filters.vibes!.some(vibe => rec.vibe_tags.includes(vibe))
        );
      }
      
      // Filter by category
      if (filters.category) {
        // In a real implementation, this would filter by venue category
        // For mock data, we'll just filter based on vibe tags that might match categories
        const categoryToVibeMappings: Record<string, string[]> = {
          'Food': ['Foodie', 'Cozy'],
          'Drinks': ['Nightlife', 'Trendy'],
          'Entertainment': ['Fun', 'Energetic'],
          'Shopping': ['Trendy', 'Upscale'],
          'Outdoors': ['Outdoor', 'Scenic'],
          'Nightlife': ['Nightlife', 'Energetic', 'Vibrant']
        };
        
        const matchingVibes = categoryToVibeMappings[filters.category] || [];
        
        if (matchingVibes.length > 0) {
          filteredRecommendations = filteredRecommendations.filter(rec => 
            matchingVibes.some(vibe => rec.vibe_tags.includes(vibe))
          );
        }
      }
      
      // In a real implementation, distance filtering would use geolocation
      // For mock data, we'll just simulate it by limiting results
      if (filters.distance && filters.distance < 5) {
        filteredRecommendations = filteredRecommendations.slice(0, 3);
      }
    }
    
    // Sort by trend score (highest first)
    filteredRecommendations.sort((a, b) => b.trend_score - a.trend_score);
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filteredRecommendations.slice(startIndex, endIndex);
    
    return {
      data: {
        data: paginatedResults,
        total: filteredRecommendations.length,
        page,
        limit
      }
    };
  } catch (error) {
    return {
      data: {
        data: [],
        total: 0,
        page,
        limit
      },
      error: 'Failed to fetch recommendations'
    };
  }
}

// Get a single recommendation by ID
export async function getRecommendationById(id: string): Promise<ApiResponse<Recommendation | null>> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const recommendation = mockRecommendations.find(rec => rec.recommendationId === id);
    
    if (!recommendation) {
      return {
        data: null,
        error: 'Recommendation not found'
      };
    }
    
    return {
      data: recommendation
    };
  } catch (error) {
    return {
      data: null,
      error: 'Failed to fetch recommendation'
    };
  }
}

// Save a recommendation to user's saved locations
export async function saveRecommendation(userId: string, recommendationId: string): Promise<ApiResponse<boolean>> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // In a real implementation, this would save to a database
    console.log(`Saving recommendation ${recommendationId} for user ${userId}`);
    
    return {
      data: true
    };
  } catch (error) {
    return {
      data: false,
      error: 'Failed to save recommendation'
    };
  }
}

