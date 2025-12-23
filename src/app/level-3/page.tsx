
"use client";

import { Zap } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state.tsx";
import { DebriefDialog } from "@/components/DebriefDialog";

const cryptoAssetsConfig = [
    { id: "ZYNT", name: "ZYNTRA", price: 420.69, change: "+15.2", changeType: "gain" as const, volatility: 1.5 },
    { id: "HEX", name: "HEXIUM", price: 88.12, change: "-5.8", changeType: "loss" as const, volatility: 1.8 },
    { id: "LEDG", name: "LEDGERA", price: 1234.56, change: "+22.1", changeType: "gain" as const, volatility: 2.2 },
    { id: "CRYPT", name: "CRYPTONEX", price: 5.43, change: "+8.3", changeType: "gain" as const, volatility: 2.5 },
];


function Level3Content() {
    const store = useGameStore();
    const { assets, isFinished } = store(state => ({
      assets: state.assets,
      isFinished: state.isFinished
    }));

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level III: Crypto</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                   You have 5 minutes in a highly volatile crypto market. Trade wisely.
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

export default function Level3Page() {
    return (
        <GameStateProvider initialAssets={cryptoAssetsConfig} duration={300} startingBalance={5000}>
            <Level3Content />
        </GameStateProvider>
    );
}
