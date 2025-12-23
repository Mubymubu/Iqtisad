"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface ProgressContextType {
  tutorialCompleted: boolean;
  levelOneCompleted: boolean;
  levelTwoCompleted: boolean;
  setTutorialCompleted: (completed: boolean) => void;
  setLevelOneCompleted: (completed: boolean) => void;
  setLevelTwoCompleted: (completed: boolean) => void;
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress = {
    tutorialCompleted: false,
    levelOneCompleted: false,
    levelTwoCompleted: false,
}

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialCompleted, setTutorialCompletedState] = useState(false);
  const [levelOneCompleted, setLevelOneCompletedState] = useState(false);
  const [levelTwoCompleted, setLevelTwoCompletedState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('iqtisad-progress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setTutorialCompletedState(progress.tutorialCompleted || false);
        setLevelOneCompletedState(progress.levelOneCompleted || false);
        setLevelTwoCompletedState(progress.levelTwoCompleted || false);
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
    setIsLoaded(true);
  }, []);
  
  const saveProgress = useCallback((progress: any) => {
     try {
      localStorage.setItem('iqtisad-progress', JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, []);

  const setTutorialCompleted = useCallback((completed: boolean) => {
    setTutorialCompletedState(completed);
    saveProgress({ tutorialCompleted: completed, levelOneCompleted, levelTwoCompleted });
  }, [levelOneCompleted, levelTwoCompleted, saveProgress]);
  
  const setLevelOneCompleted = useCallback((completed: boolean) => {
    setLevelOneCompletedState(completed);
    saveProgress({ tutorialCompleted, levelOneCompleted: completed, levelTwoCompleted });
  }, [tutorialCompleted, levelTwoCompleted, saveProgress]);

  const setLevelTwoCompleted = useCallback((completed: boolean) => {
    setLevelTwoCompletedState(completed);
    saveProgress({ tutorialCompleted, levelOneCompleted, levelTwoCompleted: completed });
  }, [tutorialCompleted, levelOneCompleted, saveProgress]);


  const value = { 
      tutorialCompleted, 
      levelOneCompleted,
      levelTwoCompleted,
      setTutorialCompleted,
      setLevelOneCompleted,
      setLevelTwoCompleted,
      isLoaded 
    };

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
  
  if (!context.isLoaded) {
    return { ...context, ...initialProgress, isLoaded: false };
  }
  return context;
};
