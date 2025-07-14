import type { ReactNode } from 'react';
import React from 'react';

interface AccessibleProps {
  children: ReactNode;
  label?: string;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
  onKeyboardActivate?: () => void;
}

export const AccessibleWrapper: React.FC<AccessibleProps> = ({
  children,
  label,
  role = 'region',
  tabIndex = 0,
  ariaLabel,
  onKeyboardActivate
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && onKeyboardActivate) {
      event.preventDefault();
      onKeyboardActivate();
    }
  };

  return (
    <div
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel || label}
      onKeyDown={handleKeyDown}
      className="focus:outline-2 focus:outline-primary-main focus:ring-2 focus:ring-primary-light"
    >
      {children}
    </div>
  );
};

export const SkipLink: React.FC = () => {
  const skipToMainContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  };

  return (
    <a
      href="#main-content"
      className="fixed top-[-100px] left-4 z-50 bg-transparent text-transparent p-0 focus:top-4 focus:bg-primary-main focus:text-white focus:p-2 transition-all duration-300 sr-only focus:not-sr-only"
      onClick={skipToMainContent}
    >
      Saltar al contenido principal
    </a>
  );
};

export const AccessibilityAnnouncer: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      className="sr-only"
    >
      {message}
    </div>
  );
}; 