
"use client";

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useStore, type StoreApi } from 'zustand';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useUser } from '@/firebase';
import { toast } from './use-toast';


export type LevelId = 'tutorial' | 'level1' | 'level2' | 'level3';

export type Progress = {
    [key in LevelId]?: {
        stars: number;
    }
}
export interface UserProgress {
    progress: Progress;
}

export type Asset = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  initialPrice: number;
  purchasePrice?: number;
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
  impact: number;
  impactType: 'gain' | 'loss';
};

type Trade = {
    type: 'buy' | 'sell';
    assetId: string;
    price: number;
    quantity: number;
    isWin?: boolean;
}

type GameState = {
  levelId: LevelId,
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
  isPaused: boolean;
  
  // Market event state
  eventInProgress: boolean;
  activeEvent: MarketEvent | null;
  eventCounter: number; // To track positive/negative sequence
  lastEventTime: number; // Tracks time of the last event trigger

  // Star metrics
  maxNetWorth: number;
  minNetWorth: number;
  trades: Trade[];
};

type GameActions = {
  buyAsset: (assetId: string) => void;
  sellAsset: (assetId: string) => void;
  tick: () => void;
  updatePrices: () => void;
  calculatePortfolio: () => void;
  setStarRating: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  reset: (levelId: LevelId, initialAssets: Omit<Asset, 'quantity' | 'initialPrice'>[], duration: number, startingBalance: number, profitGoal?: number) => void;
  playAgain: () => void;
  triggerEvent: () => void;
  clearEvent: () => void;
  saveProgress: (levelId: LevelId) => void;
};

type GameStore = GameState & GameActions;

const createGameStore = (
    levelId: LevelId,
    initialAssets: Omit<Asset, 'quantity' | 'initialPrice'>[], 
    duration: number, 
    startingBalance: number,
    profitGoal?: number
) => create<GameStore>()(
  immer((set, get) => ({
    levelId,
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
    isPaused: false,

    eventInProgress: false,
    activeEvent: null,
    eventCounter: 0,
    lastEventTime: duration,

    maxNetWorth: startingBalance,
    minNetWorth: startingBalance,
    trades: [],
    
    startGame: () => {
      set(state => {
        state.phase = 'trading';
        state.isPaused = false;
        // Events only trigger in non-tutorial levels
        if (!state.profitGoal) {
          state.lastEventTime = state.duration;
        }
      });
    },

    pauseGame: () => {
        set({ isPaused: true });
    },

    resumeGame: () => {
        set({ isPaused: false });
    },

    endGame: () => {
        if(get().phase !== 'trading') return;
        get().setStarRating();
        set({ isFinished: true, phase: 'debrief' });
    },

    buyAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || get().isFinished || get().phase !== 'trading' || get().isPaused) return;

        if (get().cashBalance < asset.price) {
            toast({
                variant: 'insufficient_funds',
                duration: 5000,
            })
            return;
        }

        set(state => {
            const boughtAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance -= boughtAsset.price;
            boughtAsset.quantity += 1;
            if (boughtAsset.purchasePrice === undefined) {
                boughtAsset.purchasePrice = boughtAsset.price;
            } else {
                // Average purchase price
                boughtAsset.purchasePrice = (boughtAsset.purchasePrice * (boughtAsset.quantity - 1) + boughtAsset.price) / boughtAsset.quantity;
            }

            state.trades.push({
                type: 'buy',
                assetId,
                price: boughtAsset.price,
                quantity: 1,
            });
        });
        get().calculatePortfolio();
    },

    sellAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || asset.quantity <= 0 || get().isFinished || get().phase !== 'trading' || get().isPaused) return;

        const isWin = asset.price >= (asset.purchasePrice || asset.initialPrice);

        set(state => {
            const soldAsset = state.assets.find(a => a.id === assetId)!;
            state.cashBalance += soldAsset.price;
            soldAsset.quantity -= 1;
            if (soldAsset.quantity === 0) {
                soldAsset.purchasePrice = undefined;
            }
            state.trades.push({
                type: 'sell',
                assetId,
                price: soldAsset.price,
                quantity: 1,
                isWin,
            });
        });
        get().calculatePortfolio();
    },
    
    clearEvent: () => {
        set({
            eventInProgress: false,
            activeEvent: null,
        });
    },

    triggerEvent: () => {
      const { assets, eventCounter, timeRemaining } = get();
      if (assets.length === 0) return;
      
      set({ eventInProgress: true, lastEventTime: timeRemaining });
      
      const targetAssetIndex = Math.floor(Math.random() * assets.length);
      const targetAsset = assets[targetAssetIndex];

      let headline: string;
      let impact: number;
      let impactType: 'gain' | 'loss';

      // Determine if the event is positive or negative based on the counter
      if (eventCounter === 0) { // First event is always positive
        impactType = 'gain';
      } else if (eventCounter === 1) { // Second event is always negative
        impactType = 'loss';
      } else { // Subsequent events are random
        impactType = Math.random() < 0.5 ? 'gain' : 'loss';
      }

      // Set impact and headline based on event type
      if (impactType === 'gain') {
          impact = 0.20 + Math.random() * 0.05; // 20% to 25% gain
          headline = `${targetAsset.name} reports strong growth and increased adoption.`;
      } else { // 'loss'
          impact = 0.20 + Math.random() * 0.05; // 20% to 25% loss
          headline = `${targetAsset.name} faces increased regulatory scrutiny.`;
      }
      
      const newPrice = targetAsset.price * (1 + (impactType === 'gain' ? impact : -impact));
      const event: MarketEvent = { 
          headline, 
          assetId: targetAsset.id, 
          assetName: targetAsset.name, 
          impact: impactType === 'gain' ? impact : -impact, 
          impactType: impactType
      };
      
      set(state => {
        const assetToUpdate = state.assets.find(a => a.id === targetAsset.id)!;
        assetToUpdate.price = Math.max(1, newPrice);
        state.activeEvent = event;
        state.eventCounter++; // Increment counter for every event
      });

      get().calculatePortfolio();

      setTimeout(() => {
        get().clearEvent();
      }, 5000); // Event popup visible for 5 seconds
    },

    updatePrices: () => {
        if (get().phase !== 'trading' || get().isPaused || get().eventInProgress) return;
        set(state => {
            state.assets.forEach(asset => {
                const volatility = asset.volatility ?? 0.8;
                let randomFactor;

                if (asset.volatility && asset.volatility >= 5.0) { // Tutorial Asset high volatility logic
                  const direction = Math.random() < 0.5 ? 1 : -1;
                  const magnitude = Math.random() * (0.07 - 0.04) + 0.04; // 4% to 7%
                  randomFactor = direction * magnitude * 100; // Adjust for division
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
            const newNetWorth = state.cashBalance + assetsValue;
            state.netWorth = newNetWorth;

            if(newNetWorth > state.maxNetWorth) state.maxNetWorth = newNetWorth;
            if(newNetWorth < state.minNetWorth) state.minNetWorth = newNetWorth;
        });
    },

    setStarRating: () => {
      const { netWorth, startingBalance, profitGoal, trades } = get();

      if (profitGoal) { // Tutorial logic
        set({ starRating: netWorth >= startingBalance + profitGoal ? 1 : 0 });
        return;
      } 
      
      const finalNetWorth = netWorth;
      const tradeCount = trades.length;
      const winningTrades = trades.filter(t => t.type === 'sell' && t.isWin).length;
      const losingTrades = trades.filter(t => t.type === 'sell' && !t.isWin).length;

      // 3-Star Condition Check
      if (finalNetWorth >= startingBalance * 1.15 && winningTrades > losingTrades) {
        set({ starRating: 3 });
        return; // Exit after setting 3 stars
      }

      // 2-Star Condition Check
      if (finalNetWorth >= startingBalance * 1.10 && tradeCount >= 5) {
        set({ starRating: 2 });
        return; // Exit after setting 2 stars
      }

      // 1-Star Condition Check
      if (finalNetWorth >= startingBalance * 1.05 && tradeCount >= 2) {
        set({ starRating: 1 });
        return; // Exit after setting 1 star
      }
      
      // Default to 0 stars if no conditions are met
      set({ starRating: 0 });
    },
    
    tick: () => {
        if (get().phase !== 'trading' || get().isPaused) return;
        const { timeRemaining, lastEventTime, duration, profitGoal, assets, eventInProgress } = get();

        if (timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
        } else {
            get().endGame();
            return;
        }
        
        // Tutorial-specific scripted event
        if (profitGoal && timeRemaining === duration - 20) {
            set({ eventInProgress: true });
            const targetAsset = assets[0];
            const impact = 0.20; // 20% increase
            const newPrice = targetAsset.price * (1 + impact);
            const event = { 
                headline: `${targetAsset.name} announces a breakthrough innovation!`, 
                assetId: targetAsset.id, 
                assetName: targetAsset.name, 
                impact, 
                impactType: 'gain' as const
            };
            
            set(state => {
              const assetToUpdate = state.assets[0];
              assetToUpdate.price = newPrice;
              state.activeEvent = event;
            });

            get().calculatePortfolio();

            setTimeout(() => {
                get().clearEvent();
            }, 5000);
            return; // Don't run regular event logic
        }

        // Regular Event timing logic for levels
        if (!profitGoal && !eventInProgress && assets.length > 0) {
            const timeSinceLastEvent = lastEventTime - timeRemaining;
            if (timeSinceLastEvent >= 30) {
                get().triggerEvent();
            }
        }
    },
    
    reset: (newLevelId, newAssets, newDuration, newStartingBalance, newProfitGoal) => {
        set({
            levelId: newLevelId,
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
            isPaused: false,
            eventInProgress: false,
            activeEvent: null,
            eventCounter: 0,
            lastEventTime: newDuration,
            maxNetWorth: newStartingBalance,
            minNetWorth: newStartingBalance,
            trades: [],
        });
    },

    playAgain: () => {
      const { levelId, assets, duration, startingBalance, profitGoal } = get();
      const initialAssets = assets.map(({ id, name, initialPrice, isValuation, volatility, maxPrice }) => ({ id, name, price: initialPrice, isValuation, volatility, maxPrice }));
      get().reset(levelId, initialAssets, duration, startingBalance, profitGoal);
    },
    saveProgress: (levelId: LevelId) => {
        // This is a placeholder. The actual implementation is injected in the provider.
    }
  }))
);

type GameStoreType = ReturnType<typeof createGameStore>;
const GameContext = React.createContext<GameStoreType | null>(null);

export function GameStateProvider({ children, initialAssets, duration, startingBalance, profitGoal, levelId }: { 
    children: React.ReactNode; 
    levelId: LevelId,
    initialAssets: Omit<Asset, 'quantity' | 'initialPrice' | 'change' | 'changeType'>[];
    duration: number;
    startingBalance: number;
    profitGoal?: number;
}) {
  const storeRef = React.useRef<GameStoreType>();
  const { user, firestore } = useUser();
  
  if (!storeRef.current) {
    storeRef.current = createGameStore(levelId, initialAssets, duration, startingBalance, profitGoal);
  }

  // Effect to inject the saveProgress implementation into the store
  useEffect(() => {
    const saveProgress = async (levelId: LevelId) => {
        if (!user || !firestore || !storeRef.current) return;

        const { starRating } = storeRef.current.getState();
        const userDocRef = doc(firestore, 'users', user.uid);
        
        try {
            const userDocSnap = await getDoc(userDocRef);
            const existingData = userDocSnap.data() as UserProgress | undefined;
            const existingStars = existingData?.progress?.[levelId]?.stars || 0;

            if (starRating > existingStars) {
                await setDoc(userDocRef, { progress: { [levelId]: { stars: starRating } } }, { merge: true });
            }
        } catch (error) {
            console.error("Failed to save progress:", error);
        }
    };
    storeRef.current.setState({ saveProgress });
  }, [user, firestore, levelId]);

  useEffect(() => {
    storeRef.current?.getState().reset(levelId, initialAssets, duration, startingBalance, profitGoal);
  }, [levelId, JSON.stringify(initialAssets), duration, startingBalance, profitGoal]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;
    let priceInterval: NodeJS.Timeout | undefined;

    const store = storeRef.current;
    if (!store) return;

    const unsubscribe = store.subscribe(state => {
      if (state.phase === 'trading' && !state.isPaused) {
        if (!timerInterval) {
          timerInterval = setInterval(() => store.getState().tick(), 1000);
        }
        if (!priceInterval) {
          priceInterval = setInterval(() => store.getState().updatePrices(), 2000);
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
      unsubscribe();
    };
  }, []);

  return (
    <GameContext.Provider value={storeRef.current}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameStore<T>(selector: (state: GameStore) => T) {
  const store = useContext(GameContext);
  if (!store) {
    throw new Error('useGameStore must be used within a GameStateProvider');
  }
  return useStore(store, selector);
}

export const useGameStoreState = () => {
    const store = useContext(GameContext);
    if (!store) {
      return null;
    }
    return useStore(store);
}
