import { useEffect, useCallback } from 'react';

type Section = 'about' | 'services' | 'projects' | 'contact';

const sectionKeys: Record<string, Section> = {
  'F1': 'about',
  'F2': 'services',
  'F3': 'projects',
  'F4': 'contact',
};

export const useKeyboardNavigation = (
  onNavigate: (section: Section) => void,
  onClear?: () => void
) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Check for function keys
    if (sectionKeys[e.key]) {
      e.preventDefault();
      onNavigate(sectionKeys[e.key]);
      return;
    }
    
    // Ctrl+L to clear
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      onClear?.();
      return;
    }
  }, [onNavigate, onClear]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
