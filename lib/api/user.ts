import { User, ApiResponse } from '../types';

// Mock user data
const mockUser: User = {
  userId: 'user-123',
  preferences: {
    vibes: ['Trendy', 'Outdoor', 'Cozy'],
    location: 'New York, NY',
    savedLocations: []
  },
  onboarding_complete: false
};

// Get current user
export async function getCurrentUser(): Promise<ApiResponse<User | null>> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  try {
    // In a real implementation, this would fetch from an authentication service
    return {
      data: mockUser
    };
  } catch (error) {
    return {
      data: null,
      error: 'Failed to fetch user'
    };
  }
}

// Update user preferences
export async function updateUserPreferences(
  userId: string,
  preferences: Partial<User['preferences']>
): Promise<ApiResponse<User>> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    // In a real implementation, this would update a database
    const updatedUser: User = {
      ...mockUser,
      preferences: {
        ...mockUser.preferences,
        ...preferences
      }
    };
    
    return {
      data: updatedUser
    };
  } catch (error) {
    return {
      data: mockUser,
      error: 'Failed to update preferences'
    };
  }
}

// Complete user onboarding
export async function completeOnboarding(
  userId: string,
  preferences: Partial<User['preferences']>
): Promise<ApiResponse<User>> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // In a real implementation, this would update a database
    const updatedUser: User = {
      ...mockUser,
      preferences: {
        ...mockUser.preferences,
        ...preferences
      },
      onboarding_complete: true
    };
    
    return {
      data: updatedUser
    };
  } catch (error) {
    return {
      data: mockUser,
      error: 'Failed to complete onboarding'
    };
  }
}

// Get user's saved locations
export async function getSavedLocations(userId: string): Promise<ApiResponse<string[]>> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // In a real implementation, this would fetch from a database
    return {
      data: mockUser.preferences.savedLocations || []
    };
  } catch (error) {
    return {
      data: [],
      error: 'Failed to fetch saved locations'
    };
  }
}

