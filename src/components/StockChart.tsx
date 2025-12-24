
"use client"
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { useGameStore } from '@/hooks/use-game-state.tsx';

export const StockChart = ({ isGain = true, assetId }: { isGain?: boolean, isVolatile?: boolean, assetId: string }) => {
  const { phase, getAssetById } = useGameStore(state => ({
    phase: state.phase,
    getAssetById: (id: string) => state.assets.find(a => a.id === id),
  }));

  const asset = getAssetById(assetId);

  const [data, setData] = useState(() => {
    if (!asset) return [];
    // Initialize with a single data point
    return [{ date: new Date().toISOString(), value: asset.initialPrice }];
  });

  const color = isGain ? 'hsl(var(--chart-1))' : '#F43F5E';
  const gradientColor = isGain ? 'hsl(var(--chart-1))' : '#F43F5E';


  useEffect(() => {
    if (phase !== 'trading' || !asset) return;

    const priceUpdateInterval = setInterval(() => {
      const currentAsset = getAssetById(assetId);
      if (currentAsset) {
        setData(currentData => {
          const newData = [...currentData, {
            date: new Date().toISOString(),
            value: currentAsset.price,
          }];
          // Keep the data array at a fixed size for a scrolling window effect
          if (newData.length > 30) {
            return newData.slice(newData.length - 30);
          }
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
  
  const minPrice = Math.min(...data.map(d => d.value));
  const maxPrice = Math.max(...data.map(d => d.value));
  const domainMargin = (maxPrice - minPrice) * 0.2;


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
            <linearGradient id={`colorUv-${assetId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
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
            position={{ y: -20 }}
          />
          <YAxis domain={[minPrice - domainMargin, maxPrice + domainMargin]} hide={true} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#colorUv-${assetId})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
