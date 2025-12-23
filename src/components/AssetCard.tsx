
"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StockChart } from "@/components/StockChart"
import { useGameState } from "@/hooks/use-game-state"
import type { Asset } from "@/hooks/use-game-state"
import { Badge } from "./ui/badge";

export function AssetCard({ asset }: { asset: Asset }) {
    const { name, price, change, changeType, isValuation, id, quantity } = asset;
    const { buyAsset, sellAsset, isFinished } = useGameState();

    const formatPrice = (value: number) => {
        if (isValuation) {
            if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
            if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
        }
        return `$${value.toFixed(2)}`;
    }

    return (
        <Card className="flex flex-col relative">
             {quantity > 0 && (
                <Badge className="absolute top-4 right-4" variant="secondary">
                    {quantity} Owned
                </Badge>
            )}
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <div className="flex items-baseline gap-2">
                    <CardDescription className="text-2xl font-bold text-foreground">{formatPrice(price)}</CardDescription>
                    {change && (
                         <p className={`text-sm font-semibold ${changeType === 'gain' ? 'text-green-400' : 'text-red-400'}`}>
                            {changeType === 'gain' ? '+' : ''}{change}%
                        </p>
                    )}
                </div>
            </CardHeader>
            {!isValuation && (
                <CardContent className="flex-grow">
                    <StockChart isGain={changeType !== 'loss'} />
                </CardContent>
            )}
            <CardFooter className="flex gap-2">
                <Button onClick={() => buyAsset(id)} disabled={isFinished} className="flex-1">
                    {isValuation ? 'Invest' : 'Buy'}
                </Button>
                <Button 
                    onClick={() => sellAsset(id)} 
                    disabled={isFinished || quantity === 0} 
                    variant="outline" 
                    className="flex-1"
                >
                    Sell
                </Button>
            </CardFooter>
        </Card>
    )
}
