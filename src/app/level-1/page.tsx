"use client";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state";
import { AssetCard } from "@/components/AssetCard";
import { Gamepad2 } from "lucide-react";
import { DebriefDialog } from "@/components/DebriefDialog";

const techAssetsConfig = [
    { id: "AUREX", name: "AUREX COMPUTING", price: 105.42, change: "+2.5", changeType: "gain" as const },
    { id: "VANTIQ", name: "VANTIQ LABS", price: 100.50, change: "+0.5", changeType: "gain" as const },
    { id: "SYNERON", name: "SYNERON AI", price: 102.33, change: "+1.2", changeType: "gain" as const },
    { id: "KALYX", name: "KALYX DATAWORKS", price: 98.17, change: "-1.8", changeType: "loss" as const },
];

function Level1Content() {
    const assets = useGameStore(state => state.assets);
    const isFinished = useGameStore(state => state.isFinished);

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level I: Tech Stocks</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    You have 3 minutes to trade tech stocks. Your goal is to increase your portfolio value.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
            
            {isFinished && <DebriefDialog />}
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
