"use client";

import { BrainCircuit } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import { GameStateProvider, useGameState } from "@/hooks/use-game-state";
import { DebriefDialog } from "@/components/DebriefDialog";

const ventureAssetsConfig = [
    { id: "SEED", name: "SEEDLINE BIOTECH", price: 1000000, isValuation: true, volatility: 0.5 },
    { id: "ORBIT", name: "ORBITA ENERGY", price: 5000000, isValuation: true, volatility: 0.8 },
    { id: "NEX", name: "NEXFIELD MOBILITY", price: 2500000, isValuation: true, volatility: 0.6 },
    { id: "CORTEX", name: "CORTEXA HEALTH", price: 8000000, isValuation: true, volatility: 0.4 },
];

function Level2Content() {
    const { assets, isFinished } = useGameState();
    
    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level II: Venture Capital</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                   You have 5 minutes. Invest in high-risk, high-reward private companies.
                </p>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
            {isFinished && <DebriefDialog />}
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
