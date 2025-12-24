
"use client";

import { useGameStore } from "@/hooks/use-game-state.tsx";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function NewsEventPopup() {
  const { activeEvent } = useGameStore(state => ({
    activeEvent: state.activeEvent,
  }));
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (activeEvent) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Popup is visible for 5 seconds

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [activeEvent]);

  if (!activeEvent) {
    return null;
  }

  const { headline, assetName, impact, impactType } = activeEvent;
  const isGain = impactType === 'gain';

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 w-80 transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <Card className="p-4 bg-card/90 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-tight">{headline}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">{assetName}</span>
              <div className={cn(
                "flex items-center text-sm font-bold",
                isGain ? "text-green-400" : "text-red-400"
              )}>
                {isGain ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {isGain ? '+' : ''}{(impact * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
