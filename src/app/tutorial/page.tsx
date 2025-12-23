
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StockChart } from "@/components/StockChart";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col items-center justify-center">
        <span className="text-sm text-muted-foreground/80">{label}</span>
        <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
    </div>
);

export default function TutorialPage() {
    const [cash, setCash] = useState(100);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [stockPrice, setStockPrice] = useState(53);
    const [owned, setOwned] = useState(false);
    const router = useRouter();

    const netWorth = cash + portfolioValue;
    const tutorialPassed = netWorth > 100 && owned;

    useEffect(() => {
        let priceInterval: NodeJS.Timeout | undefined;
        if (owned) {
            priceInterval = setInterval(() => {
                setStockPrice(prev => {
                    const newPrice = prev * 1.02;
                    setPortfolioValue(newPrice);
                    return newPrice;
                });
            }, 1500);
        }
        return () => {
            if (priceInterval) clearInterval(priceInterval);
        };
    }, [owned]);
    
    const handleBuy = () => {
        if (cash >= stockPrice && !owned) {
            setCash(cash - stockPrice);
            setPortfolioValue(stockPrice);
            setOwned(true);
        }
    };

    const handleSell = () => {
        if (owned) {
            setCash(cash + stockPrice);
            setPortfolioValue(0);
            setOwned(false);
        }
    };

  if (tutorialPassed) {
    return (
       <div className="container flex-1 flex items-center justify-center py-12">
            <Card className="w-full max-w-lg text-center">
                 <CardContent className="pt-8">
                     <CheckCircle className="mx-auto h-16 w-16 text-green-400 mb-4" />
                     <h2 className="text-3xl font-bold mb-2 font-headline">You have passed the tutorial!</h2>
                     <p className="text-muted-foreground mb-6">You've learned the basics of buying and selling. Ready to test your skills?</p>
                     <Button size="lg" onClick={() => router.push('/level-1')}>
                         Go to Level 1 <ArrowRight className="ml-2 h-5 w-5" />
                     </Button>
                 </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container max-w-2xl py-12">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">Onboarding Tutorial</h1>
            <p className="text-muted-foreground mt-2">Learn how to trade! Follow the instructions below to become a successful trader.</p>
        </div>

         <div className="bg-card/50 border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-4 mb-8">
            <StatCard label="Cash Balance" value={formatCurrency(cash)} />
            <StatCard label="Portfolio Value" value={formatCurrency(portfolioValue)} />
            <StatCard label="Net Worth" value={formatCurrency(netWorth)} />
        </div>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-baseline">
                    <CardTitle className="text-2xl">AMVLBS</CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground">{formatCurrency(stockPrice)}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                 <div className="h-48 mb-6">
                    <StockChart isGain={true} isVolatile={false} />
                 </div>
                 <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                     <div>
                        <p className="text-sm text-muted-foreground">Trade this stock:</p>
                        <p className="font-bold text-lg">AMVLBS</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <Button onClick={handleBuy} disabled={owned || cash < stockPrice}>
                            Buy
                        </Button>
                        <Button variant="outline" onClick={handleSell} disabled={!owned}>
                            Sell
                        </Button>
                     </div>
                 </div>
            </CardContent>
        </Card>
    </div>
  );
}
