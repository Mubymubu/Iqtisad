
"use client";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state.tsx";
import { AssetCard } from "@/components/AssetCard";
import { DebriefDialog } from "@/components/DebriefDialog";
import { LevelIntro } from "@/components/LevelIntro";
import { GameStatusBar } from "@/components/GameStatusBar";

const techAssetsConfig = [
    { id: "AUREX", name: "AUREX COMPUTING", price: 105.42, volatility: 0.8 },
    { id: "VANTIQ", name: "VANTIQ LABS", price: 100.50, volatility: 0.7 },
    { id: "SYNERON", name: "SYNERON AI", price: 102.33, volatility: 0.9 },
    { id: "KALYX", name: "KALYX DATAWORKS", price: 98.17, volatility: 1.1 },
];

function Level1Content() {
    const { assets, phase, startGame } = useGameStore(state => ({
      assets: state.assets,
      phase: state.phase,
      startGame: state.startGame,
    }));

    if (phase === 'intro') {
      return (
        <LevelIntro 
          levelName="Level I"
          levelTitle="Tech Stocks"
          startingCash={1000}
          duration={3}
          objective="Grow your initial investment by trading public tech stocks."
          onStart={startGame}
        />
      );
    }
    
    if (phase === 'debrief') {
      return <DebriefDialog />;
    }

    return (
        <div className="container py-12">
            <GameStatusBar />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    );
}

export default function Level1Page() {
    return (
        <GameStateProvider initialAssets={techAssetsConfig} duration={180} startingBalance={1000}>
            <Level1Content />
        </GameStateProvider>
    )
}
