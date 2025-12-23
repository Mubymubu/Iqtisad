
"use client"
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useGameStore } from '@/hooks/use-game-state.tsx';

const generateInitialChartData = () => {
  const data = [];
  let value = 50 + Math.random() * 50;
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    value += (Math.random() - 0.5) * 5;
    data.push({
      date: date.toISOString().slice(0, 10),
      value: Math.max(10, value),
    });
  }
  return data;
};

export const StockChart = ({ isGain = true, isVolatile = false }: { isGain?: boolean, isVolatile?: boolean }) => {
  const { phase, eventInProgress } = useGameStore(state => ({
    phase: state.phase,
    eventInProgress: state.eventInProgress
  }));

  const [data, setData] = useState(generateInitialChartData());
  const color = isGain ? '#10B981' : '#F43F5E';

  useEffect(() => {
    if (phase !== 'trading') return;

    const interval = setInterval(() => {
      setData(currentData => {
        const newData = [...currentData];
        const lastValue = newData[newData.length - 1].value;
        let newValue = lastValue;

        // Normal fluctuation only if no event is happening
        if (!eventInProgress) {
            const volatilityFactor = isVolatile ? 10 : 5;
            newValue = lastValue + (Math.random() - 0.5) * volatilityFactor;
            
            // Add a trend based on gain/loss
            const trend = isGain ? 0.1 : -0.1;
            newValue += trend * volatilityFactor;
        }

        newData.shift();
        newData.push({
          date: new Date().toISOString().slice(0, 10),
          value: Math.max(10, newValue),
        });
        return newData;
      });
    }, 2000); // Same interval as price updates in store

    return () => clearInterval(interval);
  }, [phase, isGain, isVolatile, eventInProgress]);

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
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: color }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={() => ''}
            cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#colorUv-${color.replace('#', '')})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
