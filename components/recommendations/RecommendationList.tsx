import React from 'react';
import { Recommendation } from '@/lib/types';
import RecommendationCard from '../ui/RecommendationCard';

interface RecommendationListProps {
  recommendations: Recommendation[];
  onSelectRecommendation: (recommendation: Recommendation) => void;
  selectedRecommendation?: Recommendation | null;
}

export const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  onSelectRecommendation,
  selectedRecommendation,
}) => {
  if (recommendations.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-muted-foreground">No recommendations found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation.recommendationId}
          recommendation={recommendation}
          variant={selectedRecommendation?.recommendationId === recommendation.recommendationId ? 'expanded' : 'collapsed'}
          onClick={() => onSelectRecommendation(recommendation)}
        />
      ))}
    </div>
  );
};

export default RecommendationList;

