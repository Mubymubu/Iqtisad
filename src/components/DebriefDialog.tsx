
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/hooks/use-game-state.tsx";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center items-center gap-2">
      {[...Array(3)].map((_, i) => (
        <Star
          key={i}
          className={`h-10 w-10 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
          }`}
        />
      ))}
    </div>
  );
}

export function DebriefDialog() {
  const store = useGameStore();
  const { isFinished, startingBalance, portfolioValue, starRating } = store(state => ({
    isFinished: state.isFinished,
    startingBalance: state.startingBalance,
    portfolioValue: state.portfolioValue,
    starRating: state.starRating
  }));
  const router = useRouter();

  const netGain = portfolioValue - startingBalance;
  const isProfit = netGain >= 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Dialog open={isFinished}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold font-headline">Session Complete</DialogTitle>
          <DialogDescription className="text-center">
            Let's see how you did.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 space-y-6">
          <div className="text-center">
             <StarRating rating={starRating} />
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-3 text-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Final Portfolio Value</p>
              <p className="text-2xl font-bold">{formatCurrency(portfolioValue)}</p>
            </div>
             <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Starting Budget</p>
              <p className="text-lg font-medium text-muted-foreground">{formatCurrency(startingBalance)}</p>
            </div>
             <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Net Gain / Loss</p>
              <p className={`text-xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}{formatCurrency(netGain)}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button className="w-full" onClick={() => router.push('/strategies')}>Review Strategies</Button>
            <Button className="w-full" variant="outline" onClick={() => window.location.reload()}>Play Again</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
