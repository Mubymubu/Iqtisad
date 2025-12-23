
"use client";

import { AssetCard } from "@/components/AssetCard";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state.tsx";
import { DebriefDialog } from "@/components/DebriefDialog";
import { LevelIntro } from "@/components/LevelIntro";
import { GameStatusBar } from "@/components/GameStatusBar";

const cryptoAssetsConfig = [
    { id: "ZYNT", name: "ZYNTRA", price: 420.69, volatility: 1.5 },
    { id: "HEX", name: "HEXIUM", price: 88.12, volatility: 1.8 },
    { id: "LEDG", name: "LEDGERA", price: 1234.56, volatility: 2.2 },
    { id: "CRYPT", name: "CRYPTONEX", price: 5.43, volatility: 2.5 },
];


function Level3Content() {
    const { assets, phase, startGame } = useGameStore(state => ({
      assets: state.assets,
      phase: state.phase,
      startGame: state.startGame,
    }));

    if (phase === 'intro') {
      return (
        <LevelIntro 
          levelName="Level 3"
          levelTitle="Crypto"
          startingCash={5000}
          duration={5}
          objective="Navigate the highly volatile and unpredictable crypto market."
          onStart={startGame}
        />
      );
    }
    
    if (phase === 'debrief') {
      return <DebriefDialog />;
    }

    return (
        <div className="container py-12">
            <GameStatusBar />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    );
}

export default function Level3Page() {
    return (
        <GameStateProvider initialAssets={cryptoAssetsConfig} duration={300} startingBalance={5000}>
            <Level3Content />
        </GameStateProvider>
    );
}
