import React from 'react';
import { Recommendation } from '@/lib/types';
import VibeTag from '../ui/VibeTag';

interface RecommendationDetailProps {
  recommendation: Recommendation;
  onClose: () => void;
  onSave: (recommendation: Recommendation) => void;
}

export const RecommendationDetail: React.FC<RecommendationDetailProps> = ({
  recommendation,
  onClose,
  onSave,
}) => {
  const { 
    title, 
    description, 
    venue_name, 
    location, 
    image_url, 
    video_url, 
    vibe_tags, 
    trend_score, 
    social_media_url 
  } = recommendation;
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="relative">
          {image_url ? (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={image_url} 
                alt={title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          
          <button 
            className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-background/70 transition-colors"
            onClick={onClose}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="absolute top-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
            {trend_score ? `Trending ${trend_score}` : 'New'}
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-4">{venue_name}</p>
          
          <p className="mb-6">{description}</p>
          
          {location && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
              <p>{location}</p>
            </div>
          )}
          
          {vibe_tags && vibe_tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Vibes</h3>
              <div className="flex flex-wrap gap-2">
                {vibe_tags.map((tag, index) => (
                  <VibeTag key={index} label={tag} />
                ))}
              </div>
            </div>
          )}
          
          {video_url && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Trending Video</h3>
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <video 
                  src={video_url} 
                  controls 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          {social_media_url && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Social Media</h3>
              <a 
                href={social_media_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on social media
              </a>
            </div>
          )}
          
          <div className="flex justify-end gap-4 mt-6">
            <button 
              className="btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button 
              className="btn-primary"
              onClick={() => onSave(recommendation)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetail;

