
"use client"
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { useGameStore } from '@/hooks/use-game-state.tsx';

const generateInitialData = (initialPrice: number, points = 30) => {
  const data = [];
  let price = initialPrice;
  const now = new Date().getTime();
  for (let i = 0; i < points; i++) {
    data.push({ time: now - (points - i - 1) * 2000, value: price });
    const randomFactor = (Math.random() - 0.5) * 0.5; // smaller fluctuations for pre-history
    price = price * (1 + randomFactor / 100);
    price = Math.max(price, initialPrice * 0.95); // Don't let it dip too low initially
  }
  return data;
};

export const StockChart = ({ assetId }: { assetId: string }) => {
  const { phase, getAssetById } = useGameStore(state => ({
    phase: state.phase,
    getAssetById: (id: string) => state.assets.find(a => a.id === id),
  }));

  const asset = getAssetById(assetId);
  const isGain = asset?.changeType !== 'loss';

  const [data, setData] = useState(() => {
    if (!asset) return [];
    // Initialize with multiple data points to avoid the "single dot" issue
    return generateInitialData(asset.initialPrice);
  });

  const color = isGain ? 'hsl(var(--chart-1))' : '#F43F5E';
  const gradientColor = isGain ? 'hsl(var(--chart-1))' : '#F43F5E';
  const gradientId = `colorUv-${assetId}`;

  useEffect(() => {
    if (phase !== 'trading' || !asset) return;

    const priceUpdateInterval = setInterval(() => {
      const currentAsset = getAssetById(assetId); // Fetch the latest asset state
      if (currentAsset) {
        setData(currentData => {
          const newData = [...currentData, {
            time: new Date().getTime(),
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
  }, [phase, assetId, getAssetById, asset]);

  // Reset data when the game restarts
  useEffect(() => {
    if (phase === 'intro' && asset) {
      setData(generateInitialData(asset.initialPrice));
    }
  }, [phase, asset]);
  
  if (!asset) {
    return <div className="h-24 w-full bg-muted/30 rounded-md" />;
  }
  
  const minPrice = Math.min(...data.map(d => d.value));
  const maxPrice = Math.max(...data.map(d => d.value));
  const domainMargin = (maxPrice - minPrice || 1) * 0.1; // Add a small margin to the domain

  return (
    <div className="w-full h-full">
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
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
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
            fill={`url(#${gradientId})`}
            dot={false}
            isAnimationActive={false} // Important for smooth real-time updates
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
