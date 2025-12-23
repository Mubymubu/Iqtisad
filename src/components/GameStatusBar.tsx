
"use client";
import { useGameStoreState } from "@/hooks/use-game-state.tsx";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col items-center justify-center">
        <span className="text-sm text-muted-foreground/80">{label}</span>
        <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
    </div>
);

export function GameStatusBar() {
    const { timeRemaining, cashBalance, portfolioValue, netWorth } = useGameStoreState();
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 mb-8">
            <div className="bg-card/50 border rounded-lg flex flex-col items-center justify-center p-4">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="font-mono text-5xl font-bold text-primary">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            </div>
            <div className="bg-card/50 border rounded-lg p-4 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center justify-items-center gap-4">
                <StatCard label="Cash Balance" value={formatCurrency(cashBalance)} />
                <div className="text-2xl font-light text-muted-foreground/50">+</div>
                <StatCard label="Portfolio Value" value={formatCurrency(portfolioValue)} />
                <div className="text-2xl font-light text-muted-foreground/50">=</div>
                <StatCard label="Net Worth" value={formatCurrency(netWorth)} />
            </div>
        </div>
    );
}
