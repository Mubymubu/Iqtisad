
"use client";

import { AssetCard } from "@/components/AssetCard";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state.tsx";
import { DebriefDialog } from "@/components/DebriefDialog";
import { LevelIntro } from "@/components/LevelIntro";


const ventureAssetsConfig = [
    { id: "SEED", name: "SEEDLINE BIOTECH", price: 15000, isValuation: true, volatility: 0.5, maxPrice: 25000 },
    { id: "ORBIT", name: "ORBITA ENERGY", price: 22000, isValuation: true, volatility: 0.8, maxPrice: 25000 },
    { id: "NEX", name: "NEXFIELD MOBILITY", price: 18000, isValuation: true, volatility: 0.6, maxPrice: 25000 },
    { id: "CORTEXA", name: "CORTEXA HEALTH", price: 20000, isValuation: true, volatility: 0.4, maxPrice: 25000 },
];

function Level2Content() {
    const { assets, phase, startGame } = useGameStore();
    
    if (phase === 'intro') {
      return (
        <LevelIntro 
          levelName="Level II"
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
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level II: Venture Capital</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                   Invest in early-stage startups. Valuations are estimates and can change dramatically.
                </p>
            </div>
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
