"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface ProgressContextType {
  tutorialCompleted: boolean;
  setTutorialCompleted: (completed: boolean) => void;
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialCompleted, setTutorialCompletedState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('iqtisad-progress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setTutorialCompletedState(progress.tutorialCompleted || false);
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const setTutorialCompleted = useCallback((completed: boolean) => {
    setTutorialCompletedState(completed);
    try {
      const progress = JSON.parse(localStorage.getItem('iqtisad-progress') || '{}');
      progress.tutorialCompleted = completed;
      localStorage.setItem('iqtisad-progress', JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, []);

  const value = { tutorialCompleted, setTutorialCompleted, isLoaded };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  // This check prevents usage before localStorage is loaded.
  if (!context.isLoaded) {
    // Return a default state, or handle as a loading state
    return { ...context, tutorialCompleted: false };
  }
  return context;
};
