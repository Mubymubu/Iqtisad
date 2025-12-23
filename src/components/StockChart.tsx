
"use client"
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const generateChartData = () => {
  const data = [];
  let value = 50;
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    value += (Math.random() - 0.5) * 5;
    data.push({
      date: date.toISOString().slice(0, 10),
      value: Math.max(10, value), // Ensure value doesn't drop too low
    });
  }
  return data;
};

const chartData = generateChartData();

export const StockChart = ({ isGain = true }: { isGain?: boolean }) => {
  const color = isGain ? '#10B981' : '#F43F5E';

  return (
    <div className="w-full h-24">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={`colorUv-${isGain}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2933',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#E5E7EB' }}
            itemStyle={{ color: '#E5E7EB' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#colorUv-${isGain})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
