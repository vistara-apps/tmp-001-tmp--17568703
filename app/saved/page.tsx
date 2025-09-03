'use client';

import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/ui/AppHeader';
import RecommendationList from '@/components/recommendations/RecommendationList';
import RecommendationDetail from '@/components/recommendations/RecommendationDetail';
import { getCurrentUser } from '@/lib/api/user';
import { getRecommendationById, saveRecommendation } from '@/lib/api/recommendations';
import { User, Recommendation } from '@/lib/types';

export default function SavedPage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedRecommendations, setSavedRecommendations] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch user data and saved recommendations
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch user data
        const userResponse = await getCurrentUser();
        if (userResponse.data) {
          setUser(userResponse.data);
          
          // Fetch saved recommendations
          // In a real implementation, this would fetch from the user's saved locations
          // For this PRD implementation, we'll use mock data
          const savedIds = userResponse.data.preferences.savedLocations || ['1', '3', '5'];
          
          const recommendations: Recommendation[] = [];
          
          for (const id of savedIds) {
            const response = await getRecommendationById(id);
            if (response.data) {
              recommendations.push(response.data);
            }
          }
          
          setSavedRecommendations(recommendations);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 flex flex-col">
        <div className="container max-w-screen-xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Saved Locations</h1>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading saved locations...</p>
              </div>
            </div>
          ) : (
            <>
              {savedRecommendations.length === 0 ? (
                <div className="bg-card rounded-lg p-8 text-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="mx-auto mb-4 text-muted-foreground"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <h2 className="text-xl font-semibold mb-2">No saved locations yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Start exploring to find and save your favorite spots.
                  </p>
                  <a href="/explore" className="btn-primary">
                    Explore Now
                  </a>
                </div>
              ) : (
                <RecommendationList 
                  recommendations={savedRecommendations}
                  onSelectRecommendation={handleSelectRecommendation}
                  selectedRecommendation={selectedRecommendation}
                />
              )}
            </>
          )}
        </div>
        
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

