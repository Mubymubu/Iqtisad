"use client";

import { useProgress } from "@/context/ProgressProvider";
import { LockedPage } from "@/components/LockedPage";
import { Gamepad2 } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import { MarketNews } from "@/components/MarketNews";

const techAssets = [
    { name: "AUREX COMPUTING", price: 105.42, change: "+2.5", changeType: "gain" },
    { name: "VANTIQ LABS", price: 100.50, change: "+0.5", changeType: "gain" },
    { name: "SYNERON AI", price: 102.33, change: "+1.2", changeType: "gain" },
    { name: "KALYX DATAWORKS", price: 98.17, change: "-1.8", changeType: "loss" },
];

function Level1Content() {
    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level I: Tech Stocks</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Invest in public tech companies and see how share prices are influenced by revenue, growth, and market sentiment. Learn about market cap, volatility, and risk vs. return.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {techAssets.map(asset => (
                     <AssetCard key={asset.name} asset={asset} />
                ))}
            </div>

            <MarketNews />
        </div>
    )
}

export default function Level1Page() {
    const { tutorialCompleted, isLoaded } = useProgress();

    if (!isLoaded) {
        return null;
    }

    if (!tutorialCompleted) {
        return <LockedPage levelName="Level I" requiredLevel="the Tutorial" />;
    }

    return <Level1Content />;
}
