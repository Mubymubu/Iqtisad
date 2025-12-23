"use client";

import { useProgress } from "@/context/ProgressProvider";
import { LockedPage } from "@/components/LockedPage";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function Level3Content() {
    const assets = [
        "ZYNTRA",
        "HEXIUM",
        "LEDGERA",
        "CRYPTONEX"
    ];

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level III: Volatility Regimes</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                   Navigate the chaos of crypto markets. Extreme volatility and social media hype will test your discipline. Can you resist FOMO and the illusion of control?
                </p>
                 <p className="text-sm text-muted-foreground mt-2">(Simulation coming soon)</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {assets.map(asset => (
                     <Card key={asset}>
                        <CardHeader>
                            <CardTitle>{asset}</CardTitle>
                            <CardDescription>Price: $100.00</CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                            <Button disabled>Buy</Button>
                            <Button variant="outline" disabled>Sell</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default function Level3Page() {
    const { tutorialCompleted, isLoaded } = useProgress();
    
    if (!isLoaded) {
        return null; // or a loading spinner
    }

    if (!tutorialCompleted) {
        return <LockedPage levelName="Level III" requiredLevel="the Tutorial" />;
    }

    return <Level3Content />;
}
