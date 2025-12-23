"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, Target, Star } from "lucide-react";
import Link from "next/link";

interface LevelIntroProps {
  levelName: string;
  levelTitle: string;
  startingCash: number;
  duration: number; // in minutes
  objective: string;
  onStart: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function LevelIntro({
  levelName,
  levelTitle,
  startingCash,
  duration,
  objective,
  onStart,
}: LevelIntroProps) {
  return (
    <div className="container flex-1 flex flex-col items-center justify-center py-12 text-center">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <h1 className="text-5xl font-bold font-headline mb-2">{levelName}</h1>
          <p className="text-xl text-muted-foreground mb-8">{levelTitle}</p>

          <div className="space-y-6 text-left mb-10">
            <div className="flex items-center gap-4">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-muted-foreground">Starting Cash</p>
                <p className="text-2xl font-semibold">{formatCurrency(startingCash)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-muted-foreground">Session Duration</p>
                <p className="text-2xl font-semibold">{duration} min</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <p className="text-muted-foreground">Objective</p>
                <p className="text-lg font-semibold">{objective}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Star className="h-8 w-8 text-primary" />
              <div>
                <p className="text-muted-foreground">Scoring</p>
                <p className="text-sm font-semibold">Earn stars based on your final portfolio value. Profit is rewarded!</p>
              </div>
            </div>
          </div>

          <Button size="xl" className="w-full" onClick={onStart}>
            Start Trading
          </Button>
        </CardContent>
      </Card>
      <Button variant="link" className="mt-4 text-muted-foreground" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
