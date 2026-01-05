
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGameStore, LevelId } from "@/hooks/use-game-state";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAudio } from "@/hooks/use-audio";
import { useEffect } from "react";

function StarRating({ rating, isTutorial }: { rating: number; isTutorial?: boolean }) {
  const totalStars = isTutorial ? 1 : 3;
  const isSuccess = rating > 0;
  
  if (isTutorial) {
    return (
       <div className="flex justify-center items-center gap-2">
         <Star
          className={`h-10 w-10 ${
            isSuccess ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
          }`}
        />
       </div>
    )
  }

  return (
    <div className="flex justify-center items-center gap-2">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          className={`h-10 w-10 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
          }`}
        />
      ))}
    </div>
  );
}

export function DebriefDialog({ children, customTitle, customDescription, levelId }: {
  children?: React.ReactNode;
  customTitle?: string;
  customDescription?: string;
  levelId?: LevelId;
}) {
  const { phase, startingBalance, netWorth, starRating, playAgain, profitGoal, saveProgress } = useGameStore(state => ({
    phase: state.phase,
    startingBalance: state.startingBalance,
    netWorth: state.netWorth,
    starRating: state.starRating,
    playAgain: state.playAgain,
    profitGoal: state.profitGoal,
    saveProgress: state.saveProgress,
  }));

  const router = useRouter();
  const { playOpeningBell } = useAudio();

  const netGain = netWorth - startingBalance;
  const isProfit = netGain >= 0;
  const isTutorial = profitGoal !== undefined;

  // Play opening bell when game ends (debrief phase starts)
  useEffect(() => {
    if (phase === 'debrief') {
      try {
        playOpeningBell();
      } catch (error) {
        console.warn('Opening bell sound failed:', error);
      }
    }
  }, [phase, playOpeningBell]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (levelId) {
        saveProgress(levelId);
      }
      playAgain();
    }
  };

  return (
    <Dialog open={phase === 'debrief'} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold font-headline">{customTitle || 'Session Complete'}</DialogTitle>
          {customDescription && (
            <DialogDescription className="text-center">
              {customDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="my-6 space-y-6">
          <div className="text-center">
             <StarRating rating={starRating} isTutorial={isTutorial} />
          </div>

          <div className="rounded-lg border bg-card/80 p-4 space-y-3 text-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Final Net Worth</p>
              <p className="text-2xl font-bold">{formatCurrency(netWorth)}</p>
            </div>
             <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Starting Budget</p>
              <p className="text-lg font-medium text-muted-foreground">{formatCurrency(startingBalance)}</p>
            </div>
             <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Net Gain / Loss</p>
              <p className={`text-xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}{formatCurrency(netGain)}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
            {children || (
              <>
                <Button className="w-full" onClick={() => {
                  if (levelId) saveProgress(levelId);
                  router.push('/strategies');
                }}>Review Strategies</Button>
                <Button className="w-full" variant="outline" onClick={() => {
                  if (levelId) saveProgress(levelId);
                  playAgain();
                }}>Play Again</Button>
              </>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
