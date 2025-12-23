"use client";

import { useProgress } from "@/context/ProgressProvider";
import { LockedPage } from "@/components/LockedPage";
import { Zap } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";
import { MarketNews } from "@/components/MarketNews";

const cryptoAssets = [
    { name: "ZYNTRA", price: 420.69, change: "+15.2", changeType: "gain" },
    { name: "HEXIUM", price: 88.12, change: "-5.8", changeType: "loss" },
    { name: "LEDGERA", price: 1234.56, change: "+22.1", changeType: "gain" },
    { name: "CRYPTONEX", price: 5.43, change: "+8.3", changeType: "gain" },
];

function Level3Content() {
    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level III: Crypto</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                   Navigate the chaos of digital assets and decentralized networks. Understand price volatility, security risks, and market cycles in the world of blockchain.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {cryptoAssets.map(asset => (
                     <AssetCard key={asset.name} asset={asset} />
                ))}
            </div>
            <MarketNews />
        </div>
    )
}

export default function Level3Page() {
    const { levelTwoCompleted, isLoaded } = useProgress();
    
    if (!isLoaded) {
        return null; // or a loading spinner
    }

    if (!levelTwoCompleted) {
        return <LockedPage levelName="Level III" requiredLevel="Level II" />;
    }

    return <Level3Content />;
}
