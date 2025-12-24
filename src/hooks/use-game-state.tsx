
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

type MarketEvent = {
  headline: string;
  assetId: string;
  assetName: string;
  impact: number; // e.g., 0.2 for +20%
  impactType: 'gain' | 'loss';
};

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
  profitGoal?: number; // Optional profit goal for tutorial
  
  // Market event state
  eventInProgress: boolean;
  timeToNextEvent: number;
  activeEvent: MarketEvent | null;
};

type GameActions = {
  buyAsset: (assetId: string) => void;
  sellAsset: (assetId: string) => void;
  tick: () => void;
  updatePrices: () => void;
  calculatePortfolio: () => void;
  setStarRating: () => void;
  startGame: () => void;
  reset: (initialAssets: Omit<Asset, 'quantity' | 'initialPrice'>[], duration: number, startingBalance: number, profitGoal?: number) => void;
  playAgain: () => void;
  triggerEvent: () => void;
  setInitialEventTimer: () => void;
  clearEvent: () => void;
};

type GameStore = GameState & GameActions;

const createGameStore = (
    initialAssets: Omit<Asset, 'quantity' | 'initialPrice'>[], 
    duration: number, 
    startingBalance: number,
    profitGoal?: number
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
    profitGoal: profitGoal,

    eventInProgress: false,
    timeToNextEvent: 0,
    activeEvent: null,
    
    setInitialEventTimer: () => {
      // Events only trigger in non-tutorial levels
      if (!get().profitGoal) {
        set({ timeToNextEvent: 45 });
      }
    },

    startGame: () => {
      set({ phase: 'trading' });
      get().setInitialEventTimer();
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
    
    clearEvent: () => {
        set({
            eventInProgress: false,
            activeEvent: null,
        });
        get().setInitialEventTimer(); // Reset timer for the next event
    },

    triggerEvent: () => {
      if (get().assets.length === 0) return;
      
      const isTutorial = !!get().profitGoal;
      if (isTutorial) return; // No events in tutorial

      set({ eventInProgress: true });

      const assets = get().assets;
      const targetAssetIndex = Math.floor(Math.random() * assets.length);
      const targetAsset = assets[targetAssetIndex];

      const eventType = Math.random() < 0.5 ? 'merger' : 'breach';
      const impact = 0.2 + Math.random() * 0.1; // 20% to 30% impact

      let newPrice: number;
      let event: MarketEvent;

      if (eventType === 'merger') {
          newPrice = targetAsset.price * (1 + impact);
          event = {
              headline: `${targetAsset.name} announces a major merger`,
              assetId: targetAsset.id,
              assetName: targetAsset.name,
              impact: impact,
              impactType: 'gain',
          };
      } else { // Data Breach
          newPrice = targetAsset.price * (1 - impact);
          event = {
              headline: `${targetAsset.name} suffers a major data breach`,
              assetId: targetAsset.id,
              assetName: targetAsset.name,
              impact: -impact,
              impactType: 'loss',
          };
      }
      
      set(state => {
        const assetToUpdate = state.assets.find(a => a.id === targetAsset.id)!;
        assetToUpdate.price = Math.max(1, newPrice);
        state.activeEvent = event;
      });

      get().calculatePortfolio();

      setTimeout(() => {
        get().clearEvent();
      }, 5000); // Event lasts for 5 seconds
    },

    updatePrices: () => {
        if (get().phase !== 'trading' || get().eventInProgress) return;
        set(state => {
            state.assets.forEach(asset => {
                const volatility = asset.volatility ?? 0.8;
                let randomFactor;

                if (asset.volatility && asset.volatility >= 5.0) { // Tutorial Asset high volatility logic
                  const direction = Math.random() < 0.75 ? 1 : -1; // 75% chance of gain
                  let magnitude;
                  if (direction === 1) {
                    magnitude = Math.random() * (0.50 - 0.03) + 0.03; // 3% to 50% gain
                  } else {
                    magnitude = Math.random() * (0.10 - 0.01) + 0.01; // 1% to 10% loss
                  }
                  randomFactor = direction * magnitude;
                } else { // Normal level volatility
                  randomFactor = (Math.random() - 0.49) * volatility;
                }

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
      const { netWorth, startingBalance, profitGoal } = get();

      if (profitGoal) { // Tutorial logic
        if (netWorth >= startingBalance + profitGoal) {
          set({ starRating: 1 }); // Success
        } else {
          set({ starRating: 0 }); // Failure
        }
      } else { // Level logic
        if (netWorth > startingBalance * 1.2) {
          set({ starRating: 3 });
        } else if (netWorth > startingBalance) {
          set({ starRating: 2 });
        } else if (netWorth === startingBalance) {
          set({ starRating: 1 });
        } else {
          set({ starRating: 0 });
        }
      }
    },
    
    tick: () => {
        if (get().phase !== 'trading') return;
        const { timeRemaining, timeToNextEvent } = get();

        if (timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
        } else {
            get().setStarRating();
            set({ isFinished: true, phase: 'debrief' });
            return;
        }

        // Event timing logic
        if (!get().eventInProgress && !get().profitGoal && get().assets.length > 0) {
            if (timeToNextEvent <= 0) {
                get().triggerEvent();
            } else {
                set({ timeToNextEvent: timeToNextEvent - 1 });
            }
        }
    },
    
    reset: (newAssets, newDuration, newStartingBalance, newProfitGoal) => {
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
            profitGoal: newProfitGoal,
            eventInProgress: false,
            timeToNextEvent: 0,
            activeEvent: null,
        });
    },

    playAgain: () => {
      const { assets, duration, startingBalance, profitGoal } = get();
      const initialAssets = assets.map(({ id, name, initialPrice, isValuation, volatility, maxPrice }) => ({ id, name, price: initialPrice, isValuation, volatility, maxPrice }));
      get().reset(initialAssets, duration, startingBalance, profitGoal);
    }
  }))
);

type GameStoreType = ReturnType<typeof createGameStore>;
const GameContext = createContext<GameStoreType | null>(null);

export function GameStateProvider({ children, initialAssets, duration, startingBalance, profitGoal }: { 
    children: React.ReactNode; 
    initialAssets: Omit<Asset, 'quantity' | 'initialPrice' | 'change' | 'changeType'>[];
    duration: number;
    startingBalance: number;
    profitGoal?: number;
}) {
  const storeRef = useRef<GameStoreType>();
  if (!storeRef.current) {
    storeRef.current = createGameStore(initialAssets, duration, startingBalance, profitGoal);
  }

  useEffect(() => {
    storeRef.current?.getState().reset(initialAssets, duration, startingBalance, profitGoal);
  }, [initialAssets, duration, startingBalance, profitGoal]);

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

export function useGameStore<T>(selector: (state: GameStore) => T) {
  const store = useSafeContext();
  return useStore(store, selector);
}

// A hook to get the entire state without selectors, useful for simple displays
export const useGameStoreState = () => {
    const store = useSafeContext();
    return useStore(store);
}
