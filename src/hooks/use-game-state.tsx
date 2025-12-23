
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
        if (!asset || get().cashBalance < asset.price || get().isFinished) return;

        set(state => {
            const boughtAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance -= boughtAsset.price;
            boughtAsset.quantity += 1;
        });
        get().calculatePortfolio();
    },

    sellAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || asset.quantity <= 0 || get().isFinished) return;

        set(state => {
            const soldAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance += soldAsset.price;
            soldAsset.quantity -= 1;
        });
        get().calculatePortfolio();
    },

    updatePrices: () => {
        if (get().isFinished) return;
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
        // 3 stars for > 10% profit
        if (portfolioValue > startingBalance * 1.1) {
            set({ starRating: 3 });
        } 
        // 2 stars for any profit
        else if (portfolioValue > startingBalance) {
            set({ starRating: 2 });
        }
        // 1 star for breaking even
        else if (portfolioValue === startingBalance) {
            set({ starRating: 1 });
        }
        // 0 stars for any loss
        else {
            set({ starRating: 0 });
        }
    },
    
    tick: () => {
        if (get().isFinished) return;
        const { timeRemaining } = get();
        if (timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
        } else {
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
    storeRef.current?.getState().reset(initialAssets, duration, startingBalance);
  }, [initialAssets, duration, startingBalance]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      storeRef.current?.getState().tick();
    }, 1000);
    const priceInterval = setInterval(() => {
        storeRef.current?.getState().updatePrices();
    }, 2000);

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


export const useGameStore = () => {
    const store = useContext(GameContext);
    if (!store) {
      throw new Error("useGameStore must be used within a GameStateProvider");
    }
    return store;
}
