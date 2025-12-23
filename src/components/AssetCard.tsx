
"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StockChart } from "@/components/StockChart"

type Asset = {
    name: string;
    price: number;
    change?: string;
    changeType?: 'gain' | 'loss';
    isValuation?: boolean;
}

export function AssetCard({ asset }: { asset: Asset }) {
    const { name, price, change, changeType, isValuation } = asset;

    const formatPrice = (value: number) => {
        if (isValuation) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        return `$${value.toFixed(2)}`;
    }

    return (
        <Card className="flex flex-col">
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
                <Button>{isValuation ? 'Invest' : 'Buy'}</Button>
                {!isValuation && <Button variant="outline">Sell</Button>}
            </CardFooter>
        </Card>
    )
}
