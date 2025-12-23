
"use client";

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import React, { createContext, useContext, useRef, useEffect } from 'react';

export type Asset = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  change?: string;
  changeType?: 'gain' | 'loss';
  isValuation?: boolean;
  volatility?: number;
};

type GameState = {
  assets: Asset[];
  cashBalance: number;
  startingBalance: number;
  timeRemaining: number;
  isFinished: boolean;
  portfolioValue: number;
  starRating: number;
};

type GameActions = {
  buyAsset: (assetId: string) => void;
  sellAsset: (assetId: string) => void;
  tick: () => void;
  updatePrices: () => void;
  calculatePortfolio: () => void;
  setStarRating: () => void;
  reset: (initialAssets: Omit<Asset, 'quantity'>[], duration: number, startingBalance: number) => void;
};

type GameStore = GameState & GameActions;

const createGameStore = (
    initialAssets: Omit<Asset, 'quantity'>[], 
    duration: number, 
    startingBalance: number
) => create<GameStore>()(
  immer((set, get) => ({
    assets: initialAssets.map(asset => ({ ...asset, quantity: 0 })),
    cashBalance: startingBalance,
    startingBalance: startingBalance,
    timeRemaining: duration,
    isFinished: false,
    portfolioValue: startingBalance,
    starRating: 0,
    
    buyAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || get().cashBalance < asset.price) return;

        set(state => {
            const boughtAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance -= boughtAsset.price;
            boughtAsset.quantity += 1;
        });
        get().calculatePortfolio();
    },

    sellAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || asset.quantity <= 0) return;

        set(state => {
            const soldAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance += soldAsset.price;
            soldAsset.quantity -= 1;
        });
        get().calculatePortfolio();
    },

    updatePrices: () => {
        set(state => {
            state.assets.forEach(asset => {
                const volatility = asset.volatility ?? 0.8;
                const randomFactor = (Math.random() - 0.49) * volatility;
                const newPrice = asset.price * (1 + randomFactor / 100);
                
                const change = (((newPrice - asset.price) / asset.price) * 100);
                asset.price = Math.max(1, newPrice); // Ensure price doesn't go below 1
                asset.change = change.toFixed(1);
                asset.changeType = change >= 0 ? 'gain' : 'loss';
            });
        });
        get().calculatePortfolio();
    },

    calculatePortfolio: () => {
        set(state => {
            const assetsValue = state.assets.reduce((total, asset) => total + (asset.price * asset.quantity), 0);
            state.portfolioValue = state.cashBalance + assetsValue;
        });
    },

    setStarRating: () => {
        const { portfolioValue, startingBalance } = get();
        if (portfolioValue < startingBalance * 0.95) { // more than 5% loss
            set({ starRating: 0 });
        } else if (portfolioValue < startingBalance) { // any loss up to 5%
            set({ starRating: 1 });
        } else if (portfolioValue <= startingBalance * 1.1) { // profit up to 10%
            set({ starRating: 2 });
        } else { // profit over 10%
            set({ starRating: 3 });
        }
    },
    
    tick: () => {
        const { timeRemaining } = get();
        if (timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
        } else if (!get().isFinished) {
            set({ isFinished: true });
            get().setStarRating();
        }
    },
    
    reset: (newAssets, newDuration, newStartingBalance) => {
        set({
            assets: newAssets.map(asset => ({ ...asset, quantity: 0 })),
            cashBalance: newStartingBalance,
            startingBalance: newStartingBalance,
            timeRemaining: newDuration,
            isFinished: false,
            portfolioValue: newStartingBalance,
            starRating: 0,
        });
    },
  }))
);

type GameStoreType = ReturnType<typeof createGameStore>;
const GameContext = createContext<GameStoreType | null>(null);

export function GameStateProvider({ children, initialAssets, duration, startingBalance }: { 
    children: React.ReactNode; 
    initialAssets: Omit<Asset, 'quantity'>[];
    duration: number;
    startingBalance: number;
}) {
  const storeRef = useRef<GameStoreType>();
  if (!storeRef.current) {
    storeRef.current = createGameStore(initialAssets, duration, startingBalance);
  }

  useEffect(() => {
    // Reset state if config changes
    storeRef.current?.getState().reset(initialAssets, duration, startingBalance);
  }, [initialAssets, duration, startingBalance]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      storeRef.current?.getState().tick();
    }, 1000);
    const priceInterval = setInterval(() => {
        if(!storeRef.current?.getState().isFinished) {
            storeRef.current?.getState().updatePrices();
        }
    }, 2000); // Update prices every 2 seconds

    return () => {
      clearInterval(timerInterval);
      clearInterval(priceInterval);
    };
  }, []);

  return (
    <GameContext.Provider value={storeRef.current}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to get a specific slice of the game state.
// Returns null if the provider is not in the component tree.
export function useGameState<T>(selector: (state: GameStore) => T) {
    const store = useContext(GameContext);
    if (!store) {
        return null; // Return null if the context is not available
    }
    return store(selector);
};

// Custom hook to get the entire store instance.
// Throws an error if the provider is not in the component tree.
export function useGameStore() {
    const store = useContext(GameContext);
    if (!store) {
      throw new Error("useGameStore must be used within a GameStateProvider");
    }
    return store;
}
