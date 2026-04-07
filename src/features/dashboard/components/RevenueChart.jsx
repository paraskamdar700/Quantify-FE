import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RevenueChart = ({ data = [] }) => {
  const safeData = Array.isArray(data) ? data : [];

  const chartData = safeData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    revenue: Number(item.revenue)
  }));

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-[400px] flex flex-col">
      <div className="mb-4 shrink-0">
        <h3 className="text-base font-semibold text-card-foreground">Revenue Overview</h3>
        <p className="text-sm text-muted-foreground">Daily revenue performance</p>
      </div>

      <div className="flex-1 w-full min-h-0">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis
                dataKey="date"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--card-foreground)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                itemStyle={{ color: 'var(--card-foreground)' }}
                cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
              />
              <Bar
                dataKey="revenue"
                fill="var(--primary-color)"
                radius={[4, 4, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No revenue data to display
          </div>
        )}
      </div>
    </div>
  );
};