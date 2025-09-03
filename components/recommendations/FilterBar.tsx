import React, { useState } from 'react';
import VibeTag from '../ui/VibeTag';

interface FilterBarProps {
  onFilterChange: (filters: {
    vibes: string[];
    distance: number;
    category: string | null;
  }) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
}) => {
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [distance, setDistance] = useState<number>(5); // 5 miles default
  const [category, setCategory] = useState<string | null>(null);
  
  // Common vibe tags
  const vibeOptions = [
    'Chill', 'Energetic', 'Cozy', 'Trendy', 'Upscale', 
    'Casual', 'Romantic', 'Family-friendly', 'Artsy', 'Outdoor'
  ];
  
  // Category options
  const categoryOptions = [
    'All', 'Food', 'Drinks', 'Entertainment', 'Shopping', 'Outdoors', 'Nightlife'
  ];
  
  const handleVibeToggle = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe)
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
    
    // Update filters
    onFilterChange({
      vibes: selectedVibes.includes(vibe)
        ? selectedVibes.filter(v => v !== vibe)
        : [...selectedVibes, vibe],
      distance,
      category
    });
  };
  
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDistance = parseInt(e.target.value);
    setDistance(newDistance);
    
    // Update filters
    onFilterChange({
      vibes: selectedVibes,
      distance: newDistance,
      category
    });
  };
  
  const handleCategoryChange = (newCategory: string) => {
    const categoryValue = newCategory === 'All' ? null : newCategory;
    setCategory(categoryValue);
    
    // Update filters
    onFilterChange({
      vibes: selectedVibes,
      distance,
      category: categoryValue
    });
  };
  
  return (
    <div className="bg-card border-b p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Vibes</h3>
        <div className="flex flex-wrap gap-2">
          {vibeOptions.map((vibe) => (
            <VibeTag
              key={vibe}
              label={vibe}
              selected={selectedVibes.includes(vibe)}
              onClick={() => handleVibeToggle(vibe)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Distance</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="20"
            value={distance}
            onChange={handleDistanceChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm whitespace-nowrap">{distance} miles</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                (cat === 'All' && category === null) || cat === category
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

