'use client';

import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/ui/AppHeader';
import VibeTag from '@/components/ui/VibeTag';
import { getCurrentUser, updateUserPreferences } from '@/lib/api/user';
import { User } from '@/lib/types';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  
  // Common vibe tags
  const vibeOptions = [
    'Chill', 'Energetic', 'Cozy', 'Trendy', 'Upscale', 
    'Casual', 'Romantic', 'Family-friendly', 'Artsy', 'Outdoor',
    'Quiet', 'Bustling', 'Intimate', 'Spacious', 'Modern',
    'Historic', 'Hipster', 'Elegant', 'Quirky', 'Vibrant'
  ];
  
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      
      try {
        const response = await getCurrentUser();
        if (response.data) {
          setUser(response.data);
          setSelectedVibes(response.data.preferences.vibes || []);
          setLocation(response.data.preferences.location || '');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);
  
  // Handle vibe toggle
  const handleVibeToggle = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe)
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };
  
  // Handle save preferences
  const handleSavePreferences = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      
      await updateUserPreferences(user.userId, {
        vibes: selectedVibes,
        location
      });
      
      // Show success message
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1">
        <div className="container max-w-screen-xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Vibes</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vibeOptions.map((vibe) => (
                      <VibeTag
                        key={vibe}
                        label={vibe}
                        selected={selectedVibes.includes(vibe)}
                        onClick={() => handleVibeToggle(vibe)}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select the vibes that match your preferences for recommendations.
                  </p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter city or neighborhood"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input w-full"
                  />
                </div>
                
                <button 
                  className="btn-primary w-full md:w-auto"
                  onClick={handleSavePreferences}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
              
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path>
                        <path d="M16 8V13C16 14.0609 16.4214 15.0783 17.1716 15.8284C17.9217 16.5786 18.9391 17 20 17"></path>
                        <path d="M17.5 6.5H16.5C15.5717 6.5 14.6815 6.18393 14 5.6C13.3185 5.01607 12.4283 4.7 11.5 4.7H11C9.67392 4.7 8.40215 5.23214 7.46447 6.17982C6.52678 7.1275 6 8.40392 6 9.73V14.27C6 15.5961 6.52678 16.8725 7.46447 17.8202C8.40215 18.7679 9.67392 19.3 11 19.3H11.5C12.4283 19.3 13.3185 18.9839 14 18.4C14.6815 17.8161 15.5717 17.5 16.5 17.5H17.5"></path>
                      </svg>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">Connect</button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M21 7.5V16.5C21 17.8807 19.8807 19 18.5 19H5.5C4.11929 19 3 17.8807 3 16.5V7.5M21 7.5C21 6.11929 19.8807 5 18.5 5H5.5C4.11929 5 3 6.11929 3 7.5M21 7.5V7.6C21 8.84772 20.1695 9.91863 19 10.3294L13.5 12.5L8 10.3294C6.83052 9.91863 6 8.84772 6 7.6V7.5"></path>
                      </svg>
                      <div>
                        <p className="font-medium">TikTok</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">Connect</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Account</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="32" 
                      height="32" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">User</p>
                    <p className="text-sm text-muted-foreground">Free Plan</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button className="btn-secondary w-full text-sm">Edit Profile</button>
                  <button className="w-full text-sm text-muted-foreground hover:text-primary border border-input bg-background hover:bg-muted/50 transition-colors p-2 rounded-md">
                    Upgrade to Premium
                  </button>
                </div>
              </div>
              
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">App Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="notifications" className="text-sm font-medium">
                      Push Notifications
                    </label>
                    <input
                      type="checkbox"
                      id="notifications"
                      className="toggle"
                      defaultChecked
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="darkMode" className="text-sm font-medium">
                      Dark Mode
                    </label>
                    <input
                      type="checkbox"
                      id="darkMode"
                      className="toggle"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="locationTracking" className="text-sm font-medium">
                      Location Tracking
                    </label>
                    <input
                      type="checkbox"
                      id="locationTracking"
                      className="toggle"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

