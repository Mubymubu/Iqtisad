
"use client";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state";
import { AssetCard } from "@/components/AssetCard";
import { DebriefDialog } from "@/components/DebriefDialog";
import { LevelIntro } from "@/components/LevelIntro";
import { GameStatusBar } from "@/components/GameStatusBar";
import { NewsEventPopup } from "@/components/NewsEventPopup";
import { GameControls } from "@/components/GameControls";

const techAssetsConfig = [
    { id: "AUREX", name: "AUREX COMPUTING", price: 1200, volatility: 0.8 },
    { id: "VANTIQ", name: "VANTIQ LABS", price: 850.72, volatility: 0.7 },
    { id: "SYNERON", name: "SYNERON AI", price: 949.28, volatility: 0.9 },
    { id: "KALYX", name: "KALYX DATAWORKS", price: 1004.59, volatility: 1.1 },
];

function Level1Content() {
    const state = useGameStore(state => state);
    const { assets, phase, startGame } = state;


    if (phase === 'intro') {
      return (
        <LevelIntro 
          levelName="Level 1"
          levelTitle="Tech Stocks"
          startingCash={10000}
          duration={2}
          objective="Grow your initial investment by trading public tech stocks."
          onStart={startGame}
        />
      );
    }
    
    if (phase === 'debrief') {
      return <DebriefDialog levelId="level1"/>;
    }

    return (
        <div className="container py-12">
            <GameStatusBar />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
            <NewsEventPopup />
            <GameControls />
        </div>
    );
}

export default function Level1Page() {
    return (
        <GameStateProvider 
            levelId="level1"
            initialAssets={techAssetsConfig} 
            duration={120} 
            startingBalance={10000}>
            <Level1Content />
        </GameStateProvider>
    )
}
