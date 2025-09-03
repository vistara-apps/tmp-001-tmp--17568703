import React from 'react';

interface VibeTagProps {
  label: string;
  variant?: 'default';
  selected?: boolean;
  onClick?: () => void;
}

export const VibeTag: React.FC<VibeTagProps> = ({
  label,
  variant = 'default',
  selected = false,
  onClick,
}) => {
  return (
    <button
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors ${
        selected
          ? 'bg-primary text-white'
          : 'bg-accent/10 text-accent-700 hover:bg-accent/20'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default VibeTag;

