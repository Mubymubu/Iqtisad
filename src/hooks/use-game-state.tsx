
"use client";

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import React, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';
import { useStore, type StoreApi } from 'zustand';
import { getAuth, onAuthStateChanged, type User, signInAnonymously } from 'firebase/auth';
import { doc, setDoc, getFirestore, onSnapshot, type DocumentReference, type Firestore } from 'firebase/firestore';
import { auth, firestore } from '@/firebase';


export { useUser, useDoc };

function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, auth, firestore };
}

function useDoc<T>(ref: DocumentReference | null) {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        if (!ref) {
            setData(null);
            return;
        }
        const unsubscribe = onSnapshot(ref, (doc) => {
            setData(doc.exists() ? doc.data() as T : null);
        });
        return () => unsubscribe();
    }, [ref]);

    return { data };
}


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
    capitalUsed: number;
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
  
  // Market event state
  eventInProgress: boolean;
  timeToNextEvent: number;
  activeEvent: MarketEvent | null;
  eventCounter: number; // To track positive/negative sequence

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
  reset: (levelId: LevelId, initialAssets: Omit<Asset, 'quantity' | 'initialPrice'>[], duration: number, startingBalance: number, profitGoal?: number) => void;
  playAgain: () => void;
  triggerEvent: () => void;
  setInitialEventTimer: () => void;
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

    eventInProgress: false,
    timeToNextEvent: 0,
    activeEvent: null,
    eventCounter: 0,

    maxNetWorth: startingBalance,
    minNetWorth: startingBalance,
    trades: [],
    
    setInitialEventTimer: () => {
      // Events only trigger in non-tutorial levels
      if (!get().profitGoal) {
        set({ timeToNextEvent: 30 });
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
                capitalUsed: boughtAsset.price
            });
        });
        get().calculatePortfolio();
    },

    sellAsset: (assetId) => {
        const asset = get().assets.find(a => a.id === assetId);
        if (!asset || asset.quantity <= 0 || get().isFinished || get().phase !== 'trading') return;

        const isWin = asset.price > (asset.purchasePrice || asset.initialPrice);

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
                capitalUsed: soldAsset.price
            });
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
      
      set({ eventInProgress: true });
      
      const assets = get().assets;
      const targetAssetIndex = Math.floor(Math.random() * assets.length);
      const targetAsset = assets[targetAssetIndex];

      const isPositiveEvent = get().eventCounter % 2 === 0;

      let newPrice: number;
      let event: MarketEvent;
      let headline: string;
      let impact: number;

      if (isPositiveEvent) {
          const eventType = Math.random() < 0.5 ? 'merger' : 'growth';
          if (eventType === 'merger') {
              impact = 0.2 + Math.random() * 0.05; // 20% to 25%
              headline = `${targetAsset.name} announces a major merger`;
          } else { // growth
              impact = 0.15 + Math.random() * 0.07; // 15% to 22%
              headline = `${targetAsset.name} reports strong growth and increased adoption`;
          }
          newPrice = targetAsset.price * (1 + impact);
          event = { headline, assetId: targetAsset.id, assetName: targetAsset.name, impact, impactType: 'gain' };
      } else { // Negative Event
          const eventType = Math.random() < 0.5 ? 'breach' : 'regulatory';
          if (eventType === 'breach') {
              impact = 0.2 + Math.random() * 0.05; // 20% to 25%
              headline = `${targetAsset.name} suffers a major data breach`;
          } else { // regulatory
              impact = 0.15 + Math.random() * 0.07; // 15% to 22%
              headline = `${targetAsset.name} faces increased regulatory scrutiny`;
          }
          newPrice = targetAsset.price * (1 - impact);
          event = { headline, assetId: targetAsset.id, assetName: targetAsset.name, impact: -impact, impactType: 'loss' };
      }
      
      set(state => {
        const assetToUpdate = state.assets.find(a => a.id === targetAsset.id)!;
        assetToUpdate.price = Math.max(1, newPrice);
        state.activeEvent = event;
        state.eventCounter++;
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
      const { netWorth, startingBalance, profitGoal, trades, maxNetWorth, minNetWorth } = get();

      if (profitGoal) { // Tutorial logic
        if (netWorth >= startingBalance + profitGoal) {
          set({ starRating: 1 }); // Success
        } else {
          set({ starRating: 0 }); // Failure
        }
        return;
      } 
      
      // Level logic
      const finalNetWorth = netWorth;
      const tradeCount = trades.filter(t => t.type === 'buy' || t.type === 'sell').length;
      const winningTrades = trades.filter(t => t.type === 'sell' && t.isWin).length;
      const sellTradesCount = trades.filter(t => t.type === 'sell').length;
      const winRate = sellTradesCount > 0 ? winningTrades / sellTradesCount : 0;
      const maxDrawdown = maxNetWorth > startingBalance ? (maxNetWorth - minNetWorth) / maxNetWorth : 0;
      const totalCapital = startingBalance + trades.filter(t=>t.type === 'sell').reduce((acc, trade) => acc + trade.price, 0);
      const maxTradeSize = Math.max(...trades.map(t => t.capitalUsed), 0);

      let stars = 0;
      
      const oneStarMet = finalNetWorth >= startingBalance * 1.05;
      
      const twoStarMet = finalNetWorth >= startingBalance * 1.15 &&
        maxDrawdown <= 0.20 &&
        tradeCount >= 3;

      const threeStarMet = finalNetWorth >= startingBalance * 1.30 &&
        maxDrawdown <= 0.10 &&
        winRate >= 0.60 &&
        maxTradeSize <= (startingBalance * 0.40);

      if(threeStarMet){
        stars = 3;
      } else if (twoStarMet) {
        stars = 2;
      } else if (oneStarMet) {
        stars = 1;
      }
      
      set({ starRating: stars });
    },
    
    tick: () => {
        if (get().phase !== 'trading') return;
        const { timeRemaining, timeToNextEvent, duration, profitGoal, assets } = get();

        if (timeRemaining > 0) {
            set({ timeRemaining: timeRemaining - 1 });
        } else {
            get().setStarRating();
            set({ isFinished: true, phase: 'debrief' });
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
        if (!get().eventInProgress && !profitGoal && get().assets.length > 0) {
            if (timeToNextEvent <= 0) {
                get().triggerEvent();
            } else {
                set({ timeToNextEvent: timeToNextEvent - 1 });
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
            eventInProgress: false,
            timeToNextEvent: 0,
            activeEvent: null,
            eventCounter: 0,
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
            await setDoc(userDocRef, { progress: { [levelId]: { stars: starRating } } }, { merge: true });
        } catch (error) {
            console.error("Failed to save progress:", error);
        }
    };
    storeRef.current.setState({ saveProgress });
  }, [user, firestore]);

  useEffect(() => {
    storeRef.current?.getState().reset(levelId, initialAssets, duration, startingBalance, profitGoal);
  }, [levelId, initialAssets, duration, startingBalance, profitGoal]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;
    let priceInterval: NodeJS.Timeout | undefined;

    const store = storeRef.current;
    if (!store) return;

    const unsubscribe = store.subscribe(state => {
      if (state.phase === 'trading') {
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

    