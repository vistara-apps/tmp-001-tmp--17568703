import React, { useState, useEffect } from 'react';
import { Recommendation, Venue } from '@/lib/types';
import MapPin from '../ui/MapPin';

interface InteractiveMapProps {
  recommendations: Recommendation[];
  onSelectRecommendation: (recommendation: Recommendation) => void;
  selectedRecommendation?: Recommendation | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  recommendations,
  onSelectRecommendation,
  selectedRecommendation,
}) => {
  // In a real implementation, this would use a mapping library like Google Maps, Mapbox, or Leaflet
  // For this PRD implementation, we'll create a simplified map representation
  
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!mapLoaded) {
    return (
      <div className="w-full h-[50vh] md:h-[70vh] bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-[50vh] md:h-[70vh] bg-muted/30 rounded-lg relative overflow-hidden">
      {/* Map container - in a real implementation this would be the actual map */}
      <div className="absolute inset-0 bg-[#f8f9fa]">
        {/* Simplified map grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          {Array.from({ length: 12 }).map((_, rowIndex) => (
            Array.from({ length: 12 }).map((_, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className="border border-gray-400"
              />
            ))
          ))}
        </div>
        
        {/* Map pins for recommendations */}
        {recommendations.map((recommendation, index) => {
          // In a real implementation, we would use actual lat/lng coordinates
          // Here we're just placing pins in a grid for visualization
          const row = index % 6;
          const col = Math.floor(index / 2) % 6;
          
          const isActive = selectedRecommendation?.recommendationId === recommendation.recommendationId;
          
          return (
            <div 
              key={recommendation.recommendationId}
              className="absolute"
              style={{
                top: `${15 + row * 12}%`,
                left: `${15 + col * 15}%`,
              }}
            >
              <MapPin 
                variant={isActive ? 'active' : 'inactive'}
                label={isActive ? recommendation.venue_name : undefined}
                onClick={() => onSelectRecommendation(recommendation)}
              />
            </div>
          );
        })}
      </div>
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
          <span className="text-lg">+</span>
        </button>
        <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
          <span className="text-lg">-</span>
        </button>
      </div>
      
      {/* Location button */}
      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
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
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <line x1="12" y1="2" x2="12" y2="4"></line>
          <line x1="12" y1="20" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="4" y2="12"></line>
          <line x1="20" y1="12" x2="22" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default InteractiveMap;

