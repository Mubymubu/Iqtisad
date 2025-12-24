
"use client"
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useGameStore } from '@/hooks/use-game-state.tsx';
import type { Asset } from '@/hooks/use-game-state.tsx';

export const StockChart = ({ isGain = true, isVolatile = false, assetId }: { isGain?: boolean, isVolatile?: boolean, assetId: string }) => {
  const { phase, getAssetById } = useGameStore(state => ({
    phase: state.phase,
    getAssetById: (id: string) => state.assets.find(a => a.id === id),
  }));

  const asset = getAssetById(assetId);

  const [data, setData] = useState(() => {
    if (!asset) return [];
    return [{ date: new Date().toISOString(), value: asset.initialPrice }];
  });

  const color = isGain ? '#10B981' : '#F43F5E';

  useEffect(() => {
    if (phase !== 'trading' || !asset) return;

    const priceUpdateInterval = setInterval(() => {
      const currentAsset = getAssetById(assetId);
      if (currentAsset) {
        setData(currentData => {
          const newData = [...currentData];
          if (newData.length >= 30) {
            newData.shift();
          }
          newData.push({
            date: new Date().toISOString(),
            value: currentAsset.price,
          });
          return newData;
        });
      }
    }, 2000); // Matches price update interval in use-game-state

    return () => clearInterval(priceUpdateInterval);
  }, [phase, assetId, getAssetById]);

  // Reset data when the game restarts
  useEffect(() => {
    if (phase === 'intro' && asset) {
      setData([{ date: new Date().toISOString(), value: asset.initialPrice }]);
    }
  }, [phase, asset]);


  return (
    <div className="w-full h-24">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={`colorUv-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
            }}
            labelStyle={{ display: 'none' }}
            itemStyle={{ color: color }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
            animationDuration={200}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#colorUv-${color.replace('#', '')})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
