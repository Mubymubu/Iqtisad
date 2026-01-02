import { useCallback } from 'react';

export const useAudio = () => {
  const playButtonSound = useCallback(() => {
    try {
      const audio = new Audio('/audio/button sound .mp3');
      audio.volume = 1.0; // Full volume for button sounds
      // Only play if user has interacted with the page
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Button sound failed to play:', error);
        });
      }
    } catch (error) {
      console.warn('Button sound initialization failed:', error);
    }
  }, []);

  const playOpeningBell = useCallback(() => {
    try {
      const audio = new Audio('/audio/opening-bell-421471.mp3');
      audio.volume = 0.6; // Slightly higher for opening bell
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Opening bell sound failed to play:', error);
        });
      }
    } catch (error) {
      console.warn('Opening bell sound initialization failed:', error);
    }
  }, []);

  const playLevelAudio = useCallback((level: 1 | 2 | 3) => {
    try {
      const audio = new Audio(`/audio/audio-for-level-${level}.mp3`);
      audio.volume = 0.5; // Medium volume for background music
      audio.loop = true; // Loop the audio during gameplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn(`Level ${level} audio failed to play:`, error);
        });
      }
      return audio; // Return audio object so it can be stopped later
    } catch (error) {
      console.warn(`Level ${level} audio initialization failed:`, error);
      return null;
    }
  }, []);

  const stopAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (error) {
        console.warn('Audio stop failed:', error);
      }
    }
  }, []);

  return {
    playButtonSound,
    playOpeningBell,
    playLevelAudio,
    stopAudio
  };
};