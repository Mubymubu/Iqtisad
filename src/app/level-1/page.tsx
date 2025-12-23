"use client";

import { useProgress } from "@/context/ProgressProvider";
import { LockedPage } from "@/components/LockedPage";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Level1Content() {
    const assets = [
        "AUREX COMPUTING",
        "VANTIQ LABS",
        "SYNERON AI",
        "KALYX DATAWORKS"
    ];

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Level I: Digital Momentum Markets</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Welcome to the world of tech stocks. Prices update frequently and news travels fast. Watch for the effects of overconfidence and confirmation bias.
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

export default function Level1Page() {
    const { tutorialCompleted, isLoaded } = useProgress();

    if (!isLoaded) {
        return null; // or a loading spinner
    }

    if (!tutorialCompleted) {
        return <LockedPage levelName="Level I" requiredLevel="the Tutorial" />;
    }

    return <Level1Content />;
}
