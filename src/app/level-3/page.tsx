
"use client";

import { AssetCard } from "@/components/AssetCard";
import { GameStateProvider, useGameStore } from "@/hooks/use-game-state";
import { DebriefDialog } from "@/components/DebriefDialog";
import { LevelIntro } from "@/components/LevelIntro";
import { GameStatusBar } from "@/components/GameStatusBar";
import { NewsEventPopup } from "@/components/NewsEventPopup";

const cryptoAssetsConfig = [
    { id: "ZYNT", name: "ZYNTRA", price: 69410, volatility: 1.5 },
    { id: "HEX", name: "HEXIUM", price: 41670.92, volatility: 1.8 },
    { id: "LEDG", name: "LEDGERA", price: 15700.89, volatility: 2.2 },
    { id: "CRYPT", name: "CRYPTONEX", price: 100000, volatility: 2.5 },
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
          startingCash={500000}
          duration={7}
          objective="Navigate the highly volatile and unpredictable crypto market."
          onStart={startGame}
        />
      );
    }
    
    if (phase === 'debrief') {
      return <DebriefDialog levelId="level3" />;
    }

    return (
        <div className="container py-12">
            <GameStatusBar />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {assets.map(asset => (
                     <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
            <NewsEventPopup />
        </div>
    );
}

export default function Level3Page() {
    return (
        <GameStateProvider 
            levelId="level3"
            initialAssets={cryptoAssetsConfig} 
            duration={420} 
            startingBalance={500000}>
            <Level3Content />
        </GameStateProvider>
    );
}
