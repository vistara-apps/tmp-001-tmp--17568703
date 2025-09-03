import React from 'react';
import { Recommendation } from '@/lib/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  variant?: 'expanded' | 'collapsed';
  onClick?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  variant = 'collapsed',
  onClick,
}) => {
  const { title, description, venue_name, image_url, video_url, vibe_tags, trend_score } = recommendation;

  return (
    <div 
      className={`card p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
        variant === 'expanded' ? 'w-full' : 'w-full max-w-sm'
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md mb-3">
        {image_url ? (
          <img 
            src={image_url} 
            alt={title} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="bg-muted w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
          {trend_score ? `Trending ${trend_score}` : 'New'}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{venue_name}</p>
      
      {variant === 'expanded' && (
        <p className="text-sm mb-3">{description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mt-2">
        {vibe_tags && vibe_tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-accent/10 text-accent-700 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {variant === 'expanded' && video_url && (
        <div className="mt-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <video 
              src={video_url} 
              controls 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;

