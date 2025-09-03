import React, { useState } from 'react';
import VibeTag from '../ui/VibeTag';

interface OnboardingFormProps {
  onComplete: (preferences: {
    vibes: string[];
    connectSocial: boolean;
    location: string;
  }) => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [connectSocial, setConnectSocial] = useState(false);
  const [location, setLocation] = useState('');
  
  // Common vibe tags
  const vibeOptions = [
    'Chill', 'Energetic', 'Cozy', 'Trendy', 'Upscale', 
    'Casual', 'Romantic', 'Family-friendly', 'Artsy', 'Outdoor',
    'Quiet', 'Bustling', 'Intimate', 'Spacious', 'Modern',
    'Historic', 'Hipster', 'Elegant', 'Quirky', 'Vibrant'
  ];
  
  const handleVibeToggle = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe)
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        vibes: selectedVibes,
        connectSocial,
        location
      });
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <div className="bg-card rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Personalize Your Experience</h2>
          <div className="text-sm text-muted-foreground">Step {step} of 3</div>
        </div>
        
        <div className="w-full bg-muted h-2 rounded-full mb-6">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {step === 1 && (
        <div>
          <h3 className="text-lg font-medium mb-4">What vibes are you looking for?</h3>
          <p className="text-muted-foreground mb-6">Select all that interest you. This helps us find spots that match your preferences.</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {vibeOptions.map((vibe) => (
              <VibeTag
                key={vibe}
                label={vibe}
                selected={selectedVibes.includes(vibe)}
                onClick={() => handleVibeToggle(vibe)}
              />
            ))}
          </div>
          
          {selectedVibes.length === 0 && (
            <p className="text-sm text-destructive mb-4">Please select at least one vibe to continue</p>
          )}
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Connect your social accounts</h3>
          <p className="text-muted-foreground mb-6">This helps us understand your preferences better and provide more personalized recommendations.</p>
          
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-2 border border-input bg-background hover:bg-muted/50 transition-colors p-3 rounded-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8V13C16 14.0609 16.4214 15.0783 17.1716 15.8284C17.9217 16.5786 18.9391 17 20 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 6.5H16.5C15.5717 6.5 14.6815 6.18393 14 5.6C13.3185 5.01607 12.4283 4.7 11.5 4.7H11C9.67392 4.7 8.40215 5.23214 7.46447 6.17982C6.52678 7.1275 6 8.40392 6 9.73V14.27C6 15.5961 6.52678 16.8725 7.46447 17.8202C8.40215 18.7679 9.67392 19.3 11 19.3H11.5C12.4283 19.3 13.3185 18.9839 14 18.4C14.6815 17.8161 15.5717 17.5 16.5 17.5H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Connect Instagram</span>
            </button>
            
            <button className="w-full flex items-center justify-center gap-2 border border-input bg-background hover:bg-muted/50 transition-colors p-3 rounded-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 7.5V16.5C21 17.8807 19.8807 19 18.5 19H5.5C4.11929 19 3 17.8807 3 16.5V7.5M21 7.5C21 6.11929 19.8807 5 18.5 5H5.5C4.11929 5 3 6.11929 3 7.5M21 7.5V7.6C21 8.84772 20.1695 9.91863 19 10.3294L13.5 12.5L8 10.3294C6.83052 9.91863 6 8.84772 6 7.6V7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Connect TikTok</span>
            </button>
          </div>
          
          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              id="skip-social"
              checked={!connectSocial}
              onChange={() => setConnectSocial(!connectSocial)}
              className="mr-2"
            />
            <label htmlFor="skip-social" className="text-sm">Skip this step (less personalized recommendations)</label>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Where do you want to explore?</h3>
          <p className="text-muted-foreground mb-6">We'll show you trending spots in this area.</p>
          
          <div className="mb-8">
            <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter city or neighborhood"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input w-full"
            />
            
            <div className="mt-4">
              <button 
                className="w-full flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 transition-colors p-3 rounded-md"
                onClick={() => setLocation('Current Location')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Use Current Location</span>
              </button>
            </div>
            
            {!location && (
              <p className="text-sm text-destructive mt-2">Please enter a location to continue</p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        {step > 1 ? (
          <button 
            className="btn-secondary"
            onClick={handlePrevStep}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        <button 
          className="btn-primary"
          onClick={handleNextStep}
          disabled={(step === 1 && selectedVibes.length === 0) || (step === 3 && !location)}
        >
          {step === 3 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingForm;

