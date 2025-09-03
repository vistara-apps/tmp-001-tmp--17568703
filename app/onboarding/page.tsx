'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingForm from '@/components/auth/OnboardingForm';
import { getCurrentUser, completeOnboarding } from '@/lib/api/user';
import { User } from '@/lib/types';

export default function OnboardingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      
      try {
        const response = await getCurrentUser();
        if (response.data) {
          setUser(response.data);
          
          // If user has already completed onboarding, redirect to explore page
          if (response.data.onboarding_complete) {
            router.push('/explore');
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [router]);
  
  // Handle onboarding completion
  const handleOnboardingComplete = async (preferences: {
    vibes: string[];
    connectSocial: boolean;
    location: string;
  }) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update user preferences and mark onboarding as complete
      await completeOnboarding(user.userId, {
        vibes: preferences.vibes,
        location: preferences.location
      });
      
      // Redirect to explore page
      router.push('/explore');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-6 border-b">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary">VibeFinder</h1>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <OnboardingForm onComplete={handleOnboardingComplete} />
      </main>
    </div>
  );
}

