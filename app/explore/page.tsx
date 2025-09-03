'use client';

import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/ui/AppHeader';
import InteractiveMap from '@/components/map/InteractiveMap';
import RecommendationList from '@/components/recommendations/RecommendationList';
import RecommendationDetail from '@/components/recommendations/RecommendationDetail';
import FilterBar from '@/components/recommendations/FilterBar';
import { getRecommendations, saveRecommendation } from '@/lib/api/recommendations';
import { getCurrentUser } from '@/lib/api/user';
import { Recommendation, FilterOptions, User } from '@/lib/types';

export default function ExplorePage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    vibes: [],
    distance: 5,
    category: null
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  // Fetch recommendations and user data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch user data
        const userResponse = await getCurrentUser();
        if (userResponse.data) {
          setUser(userResponse.data);
        }
        
        // Fetch recommendations
        const recommendationsResponse = await getRecommendations(filters);
        if (recommendationsResponse.data) {
          setRecommendations(recommendationsResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);
  
  // Handle recommendation selection
  const handleSelectRecommendation = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
  };
  
  // Handle recommendation detail close
  const handleCloseDetail = () => {
    setSelectedRecommendation(null);
  };
  
  // Handle saving a recommendation
  const handleSaveRecommendation = async (recommendation: Recommendation) => {
    if (!user) return;
    
    try {
      await saveRecommendation(user.userId, recommendation.recommendationId);
      // Show success message or update UI
      alert('Recommendation saved!');
    } catch (error) {
      console.error('Error saving recommendation:', error);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  // Toggle between map and list view
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'map' ? 'list' : 'map');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 flex flex-col">
        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="flex justify-end p-4">
          <button 
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={toggleViewMode}
          >
            {viewMode === 'map' ? (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <span>List View</span>
              </>
            ) : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Map View</span>
              </>
            )}
          </button>
        </div>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading recommendations...</p>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'map' ? (
              <div className="flex-1 p-4">
                <InteractiveMap 
                  recommendations={recommendations}
                  onSelectRecommendation={handleSelectRecommendation}
                  selectedRecommendation={selectedRecommendation}
                />
              </div>
            ) : (
              <div className="flex-1">
                <RecommendationList 
                  recommendations={recommendations}
                  onSelectRecommendation={handleSelectRecommendation}
                  selectedRecommendation={selectedRecommendation}
                />
              </div>
            )}
          </>
        )}
        
        {selectedRecommendation && (
          <RecommendationDetail 
            recommendation={selectedRecommendation}
            onClose={handleCloseDetail}
            onSave={handleSaveRecommendation}
          />
        )}
      </main>
    </div>
  );
}

