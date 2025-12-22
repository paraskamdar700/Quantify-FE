import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RevenueChart = ({ data = [] }) => {
  // FIX 1: Safety Check
  const safeData = Array.isArray(data) ? data : [];

  // Data mapping
  const chartData = safeData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    revenue: Number(item.revenue)
  }));

  return (
    <div className="bg-white dark:bg-pureBlack p-6 rounded-xl border border-gray-200 dark:border-darkBorder shadow-sm h-[400px] flex flex-col">
      <div className="mb-6 shrink-0">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Daily revenue performance</p>
      </div>

      {/* FIX 2: Explicit height on container parent and conditional render */}
      <div className="flex-1 w-full min-h-0">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="var(--primary-color)" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No revenue data to display
          </div>
        )}
      </div>
    </div>
  );
};