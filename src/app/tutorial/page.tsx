
"use client";

import { AssetCard } from "@/components/AssetCard";
import { DebriefDialog } from "@/components/DebriefDialog";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state.tsx";
import { GameStatusBar } from "@/components/GameStatusBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const tutorialAssetConfig = [
    { id: "TUT", name: "Tutorial Asset (TUT)", price: 53.00, volatility: 0.5 },
];

const HINTS = [
  {
    title: "How to Trade",
    description: "Click 'Buy' to purchase a share of the asset. Your cash will decrease, and your portfolio value will increase. Click 'Sell' to do the opposite.",
  },
  {
    title: "What's the Goal?",
    description: "Your objective is to make a profit of at least $5. Your Net Worth must be $105 or more when the timer runs out.",
  },
  {
    title: "Understanding Value",
    description: "Profit comes from selling an asset for more than you paid for it. Watch the price movements in the chart to time your trades.",
  },
];


function TutorialContent() {
    const { assets, phase, netWorth, startingBalance, playAgain, starRating } = useGameStore(state => state);
    const [hintIndex, setHintIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (phase !== 'trading') return;

        const hintInterval = setInterval(() => {
            setHintIndex(prev => (prev + 1) % HINTS.length);
        }, 15000); // Change hint every 15 seconds

        return () => clearInterval(hintInterval);
    }, [phase]);

    if (phase === 'intro') {
      // The tutorial starts immediately, so we don't need an intro screen.
      // We'll have a custom start UI instead.
      return <TutorialStart />;
    }
    
    if (phase === 'debrief') {
      const isSuccess = starRating > 0;
      return (
         <DebriefDialog
            customTitle="Tutorial Complete"
            customDescription={isSuccess ? "Great job! You've learned the basics." : "You didn't make a profit this time. Let's try again!"}
          >
              <div className="flex flex-col sm:flex-row gap-2">
                 {isSuccess && (
                  <Button className="w-full" onClick={() => router.push('/level-1')}>
                    Start Level 1
                  </Button>
                )}
                 <Button className="w-full" variant="outline" onClick={playAgain}>
                   {isSuccess ? 'Play Again' : 'Retry Tutorial'}
                </Button>
              </div>
          </DebriefDialog>
      );
    }

    return (
        <div className="container py-12">
            <GameStatusBar />
            <div className="mb-8">
              {assets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>

            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>{HINTS[hintIndex].title}</AlertTitle>
              <AlertDescription>
                {HINTS[hintIndex].description}
              </AlertDescription>
            </Alert>

        </div>
    );
}

function TutorialStart() {
  const { startGame } = useGameStore(state => state);
  
  return (
      <div className="container flex-1 flex flex-col items-center justify-center py-12 text-center">
        <Card className="w-full max-w-md">
           <CardHeader>
                <CardTitle className="font-headline text-3xl">Onboarding Tutorial</CardTitle>
                <CardDescription>
                  Learn the basics of trading in this 1-minute guided session. Your goal is to make a profit of at least $5.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" className="w-full" onClick={startGame}>
                    Start Tutorial
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}


export default function TutorialPage() {
    return (
        <GameStateProvider 
          initialAssets={tutorialAssetConfig} 
          duration={60} 
          startingBalance={100}
          profitGoal={5}
        >
            <TutorialContent />
        </GameStateProvider>
    )
}
