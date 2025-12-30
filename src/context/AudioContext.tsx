"use client";

import React, { createContext, useContext, useRef } from "react";

export type AudioTrack = "tutorial" | "level1" | "level2" | "level3";

type AudioContextType = {
  play: (track: AudioTrack) => void;
  resume: () => void;
  pause: () => void;
  stop: () => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

const AUDIO_MAP: Record<AudioTrack, { src: string; loop: boolean }> = {
  tutorial: { src: "/audio/opening-bell-421471.mp3", loop: false },
  level1: { src: "/audio/audio-for-level-1.mp3", loop: true },
  level2: { src: "/audio/audio-for-level-2.mp3", loop: true },
  level3: { src: "/audio/audio-for-level-3.mp3", loop: true },
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = useRef<AudioTrack | null>(null);

  const play = (track: AudioTrack) => {
    if (currentTrack.current !== track) {
      audioRef.current?.pause();

      const audio = new Audio(AUDIO_MAP[track].src);
      audio.loop = AUDIO_MAP[track].loop;
      audio.volume = 0.6;
      audio.preload = "auto"
      audioRef.current = audio;
      currentTrack.current = track;
    }

    audioRef.current?.play();
  };

  const resume = () => {
    audioRef.current?.play();
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    currentTrack.current = null;
  };

  return (
    <AudioContext.Provider value={{ play, resume, pause, stop }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
