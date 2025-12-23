"use client";

import { useProgress } from "@/context/ProgressProvider";
import { LockedPage } from "@/components/LockedPage";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

function Level2Content() {
    const assets = [
        "SEEDLINE BIOTECH",
        "ORBITA ENERGY",
        "NEXFIELD MOBILITY",
        "CORTEXA HEALTH"
    ];

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level II: Private Capital Horizons</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                   Enter the high-stakes world of venture capital. Information is scarce and your investments are locked in. Beware of herd behavior and anchoring on initial valuations.
                </p>
                <p className="text-sm text-muted-foreground mt-2">(Simulation coming soon)</p>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {assets.map(asset => (
                     <Card key={asset}>
                        <CardHeader>
                            <CardTitle>{asset}</CardTitle>
                            <CardDescription>Valuation: $1,000,000</CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                            <Button disabled>Invest</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default function Level2Page() {
    const { tutorialCompleted, isLoaded } = useProgress();

    if (!isLoaded) {
        return null; // or a loading spinner
    }

    if (!tutorialCompleted) {
        return <LockedPage levelName="Level II" requiredLevel="the Tutorial" />;
    }

    return <Level2Content />;
}
