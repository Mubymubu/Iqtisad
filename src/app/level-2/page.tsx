
"use client";

import { AssetCard } from "@/components/AssetCard";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state";
import { DebriefDialog } from "@/components/DebriefDialog";
import { LevelIntro } from "@/components/LevelIntro";
import { GameStatusBar } from "@/components/GameStatusBar";
import { NewsEventPopup } from "@/components/NewsEventPopup";
import { GameControls } from "@/components/GameControls";

const ventureAssetsConfig = [
    { id: "SEED", name: "SEEDLINE BIOTECH", price: 15000, isValuation: true, volatility: 0.5, maxPrice: 25000 },
    { id: "ORBIT", name: "ORBITA ENERGY", price: 22000, isValuation: true, volatility: 0.8, maxPrice: 25000 },
    { id: "NEX", name: "NEXFIELD MOBILITY", price: 18000, isValuation: true, volatility: 0.6, maxPrice: 25000 },
    { id: "CORTEXA", name: "CORTEXA HEALTH", price: 20000, isValuation: true, volatility: 0.4, maxPrice: 25000 },
];

function Level2Content() {
    const { assets, phase, startGame } = useGameStore(state => state);
    
    if (phase === 'intro') {
      return (
        <LevelIntro 
          levelName="Level 2"
          levelTitle="Venture Capital"
          startingCash={100000}
          duration={3}
          objective="Invest in high-risk, high-reward private companies."
          onStart={startGame}
        />
      );
    }
    
    if (phase === 'debrief') {
      return <DebriefDialog levelId="level2" />;
    }
    
    return (
        <div className="container py-12">
            <GameStatusBar />
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
            <NewsEventPopup />
            <GameControls />
        </div>
    )
}

export default function Level2Page() {
    return (
        <GameStateProvider 
            levelId="level2"
            initialAssets={ventureAssetsConfig} 
            duration={180} 
            startingBalance={100000}>
            <Level2Content />
        </GameStateProvider>
    );
}
