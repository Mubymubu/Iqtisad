
"use client";

import { AssetCard } from "@/components/AssetCard";
import { GameStateProvider, useGameStoreState } from "@/hooks/use-game-state.tsx";
import { DebriefDialog } from "@/components/DebriefDialog";
import { LevelIntro } from "@/components/LevelIntro";
import { GameStatusBar } from "@/components/GameStatusBar";


const ventureAssetsConfig = [
    { id: "SEED", name: "SEEDLINE BIOTECH", price: 15000, isValuation: true, volatility: 0.5, maxPrice: 25000 },
    { id: "ORBIT", name: "ORBITA ENERGY", price: 22000, isValuation: true, volatility: 0.8, maxPrice: 25000 },
    { id: "NEX", name: "NEXFIELD MOBILITY", price: 18000, isValuation: true, volatility: 0.6, maxPrice: 25000 },
    { id: "CORTEXA", name: "CORTEXA HEALTH", price: 20000, isValuation: true, volatility: 0.4, maxPrice: 25000 },
];

function Level2Content() {
    const { assets, phase, startGame } = useGameStoreState();
    
    if (phase === 'intro') {
      return (
        <LevelIntro 
          levelName="Level 2"
          levelTitle="Venture Capital"
          startingCash={100000}
          duration={5}
          objective="Invest in high-risk, high-reward private companies."
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
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    )
}

export default function Level2Page() {
    return (
        <GameStateProvider initialAssets={ventureAssetsConfig} duration={300} startingBalance={100000}>
            <Level2Content />
        </GameStateProvider>
    );
}
