import React from 'react';
import Link from 'next/link';

interface AppHeaderProps {
  variant?: 'default';
}

export const AppHeader: React.FC<AppHeaderProps> = ({ variant = 'default' }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">VibeFinder</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-4">
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/saved" className="text-sm font-medium transition-colors hover:text-primary">
              Saved
            </Link>
            <Link href="/profile" className="text-sm font-medium transition-colors hover:text-primary">
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

