"use client";

import { BrainCircuit } from "lucide-react";
import { AssetCard } from "@/components/AssetCard";

const ventureAssets = [
    { name: "SEEDLINE BIOTECH", price: 1000000, isValuation: true },
    { name: "ORBITA ENERGY", price: 5000000, isValuation: true },
    { name: "NEXFIELD MOBILITY", price: 2500000, isValuation: true },
    { name: "CORTEXA HEALTH", price: 8000000, isValuation: true },
];


export default function Level2Page() {
    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level II: Venture Capital</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                   Enter the high-stakes world of private companies. Provide capital for equity, understand valuations, and balance high risks with potential high rewards in early-stage ventures.
                </p>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {ventureAssets.map(asset => (
                     <AssetCard key={asset.name} asset={asset} />
                ))}
            </div>
        </div>
    )
}
