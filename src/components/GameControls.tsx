
"use client";

import { useGameStore } from "@/hooks/use-game-state";
import { Button } from "./ui/button";
import { Pause, Play, Square, RotateCw } from "lucide-react";

export function GameControls() {
  const { isPaused, pauseGame, resumeGame, endGame, playAgain, phase } = useGameStore(state => ({
    isPaused: state.isPaused,
    pauseGame: state.pauseGame,
    resumeGame: state.resumeGame,
    endGame: state.endGame,
    playAgain: state.playAgain,
    phase: state.phase
  }));

  if (phase !== 'trading') return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 rounded-full border bg-card/80 p-2 backdrop-blur-sm shadow-lg">
        {isPaused ? (
          <Button size="icon" className="rounded-full h-12 w-12" onClick={resumeGame}>
            <Play className="h-6 w-6" />
            <span className="sr-only">Play</span>
          </Button>
        ) : (
          <Button size="icon" className="rounded-full h-12 w-12" onClick={pauseGame}>
            <Pause className="h-6 w-6" />
            <span className="sr-only">Pause</span>
          </Button>
        )}
        <Button size="icon" variant="ghost" className="rounded-full h-12 w-12" onClick={playAgain}>
          <RotateCw className="h-6 w-6" />
          <span className="sr-only">Restart</span>
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full h-12 w-12" onClick={endGame}>
          <Square className="h-6 w-6" />
          <span className="sr-only">End Game</span>
        </Button>
      </div>
    </div>
  );
}
