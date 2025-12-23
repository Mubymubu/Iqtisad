
"use client";

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useStore } from 'zustand';

export type Asset = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  initialPrice: number;
  change?: string;
  changeType?: 'gain' | 'loss';
  isValuation?: boolean;
  volatility?: number;
  maxPrice?: number;
};

type GamePhase = 'intro' | 'trading' | 'debrief';

type GameState = {
  assets: Asset[];
  cashBalance: number;
  startingBalance: number;
  timeRemaining: number;
  isFinished: boolean;
  portfolioValue: number; // Value of owned assets
  netWorth: number; // Cash + Portfolio Value
  starRating: number;
  phase: GamePhase;
  duration: number;
};

type GameActions = {
  buyAsset: (assetId: string) => void;
  sellAsset: (assetId: string) => void;
  tick: () => void;
  updatePrices: () => void;
  calculatePortfolio: () => void;
  setStarRating: () => void;
  startGame: () => void;
  reset: (initialAssets: Omit<Asset, 'quantity' | 'initialPrice'>[], duration: number, startingBalance: number) => void;
  playAgain: () => void;
};

type GameStore = GameState & GameActions;

const createGameStore = (
    initialAssets: Omit<Asset, 'quantity' | 'initialPrice'>[], 
    duration: number, 
    startingBalance: number
) => create<GameStore>()(
  immer((set, get) => ({
    assets: initialAssets.map(asset => ({ ...asset, quantity: 0, initialPrice: asset.price })),
    cashBalance: startingBalance,
    startingBalance: startingBalance,
    timeRemaining: duration,
    duration: duration,
    isFinished: false,
    portfolioValue: 0,
    netWorth: startingBalance,
    starRating: 0,
    phase: 'intro',
    
    startGame: () => {
      set({ phase: 'trading' });
    },

    buyAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || get().cashBalance < asset.price || get().isFinished || get().phase !== 'trading') return;

        set(state => {
            const boughtAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance -= boughtAsset.price;
            boughtAsset.quantity += 1;
        });
        get().calculatePortfolio();
    },

    sellAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || asset.quantity <= 0 || get().isFinished || get().phase !== 'trading') return;

        set(state => {
            const soldAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance += soldAsset.price;
            soldAsset.quantity -= 1;
        });
        get().calculatePortfolio();
    },

    updatePrices: () => {
        if (get().phase !== 'trading') return;
        set(state => {
            state.assets.forEach(asset => {
                const volatility = asset.volatility ?? 0.8;
                const randomFactor = (Math.random() - 0.49) * volatility;
                let newPrice = asset.price * (1 + randomFactor / 100);

                if (asset.maxPrice && newPrice > asset.maxPrice) {
                    newPrice = asset.maxPrice * (1 - Math.random() * 0.1);
                }
                
                if (newPrice > state.cashBalance && state.assets.every(a => a.quantity === 0) && asset.maxPrice === undefined) {
                  newPrice = state.cashBalance * (0.8 + Math.random() * 0.15);
                }
                
                const change = (((newPrice - asset.price) / asset.price) * 100);
                asset.price = Math.max(1, newPrice);
                asset.change = change.toFixed(1);
                asset.changeType = change >= 0 ? 'gain' : 'loss';
            });
        });
        get().calculatePortfolio();
    },

    calculatePortfolio: () => {
        set(state => {
            const assetsValue = state.assets.reduce((total, asset) => total + (asset.price * asset.quantity), 0);
            state.portfolioValue = assetsValue;
            state.netWorth = state.cashBalance + assetsValue;
        });
    },

    setStarRating: () => {
      const { netWorth, startingBalance } = get();
      if (netWorth > startingBalance * 1.2) {
        set({ starRating: 3 });
      } else if (netWorth > startingBalance) {
        set({ starRating: 2 });
      } else if (netWorth === startingBalance) {
        set({ starRating: 1 });
      } else {
        set({ starRating: 0 });
      }
    },
    
    tick: () => {
        if (get().phase !== 'trading') return;
        const { timeRemaining } = get();
        if (timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
        } else {
            get().setStarRating();
            set({ isFinished: true, phase: 'debrief' });
        }
    },
    
    reset: (newAssets, newDuration, newStartingBalance) => {
        set({
            assets: newAssets.map(asset => ({ ...asset, quantity: 0, initialPrice: asset.price })),
            cashBalance: newStartingBalance,
            startingBalance: newStartingBalance,
            timeRemaining: newDuration,
            duration: newDuration,
            isFinished: false,
            phase: 'intro',
            portfolioValue: 0,
            netWorth: newStartingBalance,
            starRating: 0,
        });
    },

    playAgain: () => {
      const { assets, duration, startingBalance } = get();
      const initialAssets = assets.map(({ id, name, initialPrice, isValuation, volatility, maxPrice }) => ({ id, name, price: initialPrice, isValuation, volatility, maxPrice }));
      get().reset(initialAssets, duration, startingBalance);
    }
  }))
);

type GameStoreType = ReturnType<typeof createGameStore>;
const GameContext = createContext<GameStoreType | null>(null);

export function GameStateProvider({ children, initialAssets, duration, startingBalance }: { 
    children: React.ReactNode; 
    initialAssets: Omit<Asset, 'quantity' | 'initialPrice' | 'change' | 'changeType'>[];
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
    let timerInterval: NodeJS.Timeout | undefined;
    let priceInterval: NodeJS.Timeout | undefined;

    const unsubscribe = storeRef.current?.subscribe(state => {
      if (state.phase === 'trading') {
        if (!timerInterval) {
          timerInterval = setInterval(() => {
            storeRef.current?.getState().tick();
          }, 1000);
        }
        if (!priceInterval) {
          priceInterval = setInterval(() => {
            storeRef.current?.getState().updatePrices();
          }, 2000);
        }
      } else {
        if (timerInterval) clearInterval(timerInterval);
        if (priceInterval) clearInterval(priceInterval);
        timerInterval = undefined;
        priceInterval = undefined;
      }
    });

    return () => {
      if (timerInterval) clearInterval(timerInterval);
      if (priceInterval) clearInterval(priceInterval);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <GameContext.Provider value={storeRef.current}>
      {children}
    </GameContext.Provider>
  );
}

const useSafeContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    // This provides a dummy store when not in a provider.
    // Useful for components like the Header that might render outside a specific level.
    const dummyStore = createGameStore([], 0, 0);
    return dummyStore;
  }
  return context;
}

export function useGameStore<T>(selector: (state: GameState) => T) {
  const store = useSafeContext();
  return useStore(store, selector);
}

// A hook to get the entire state without selectors, useful for simple displays
export const useGameStoreState = () => {
    const store = useSafeContext();
    return useStore(store);
}
