import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3.5 py-2.5 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-semibold text-card-foreground">
        ₹{Number(payload[0].value).toLocaleString()}
      </p>
      {payload[0].payload.order_count != null && (
        <p className="text-xs text-muted-foreground mt-0.5">
          {payload[0].payload.order_count} orders
        </p>
      )}
    </div>
  );
};

// Format date labels based on granularity
const formatDateLabel = (dateStr, granularity) => {
  const date = new Date(dateStr);
  switch (granularity) {
    case 'daily':
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    case 'weekly':
      return `W${Math.ceil(date.getDate() / 7)} ${date.toLocaleDateString('en-US', { month: 'short' })}`;
    case 'monthly':
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    case 'yearly':
      return date.getFullYear().toString();
    default:
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }
};

export const RevenueChart = ({ revenueChart }) => {
  // Handle both old flat-array format and new { granularity, data } format
  const granularity = revenueChart?.granularity || 'daily';
  const rawData = Array.isArray(revenueChart)
    ? revenueChart
    : Array.isArray(revenueChart?.data)
      ? revenueChart.data
      : [];

  const chartData = rawData.map(item => ({
    date: formatDateLabel(item.date, granularity),
    revenue: Number(item.revenue),
    order_count: item.order_count,
  }));

  const granularityLabel = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  }[granularity] || 'Daily';

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-[400px] flex flex-col">
      <div className="mb-4 shrink-0 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">{granularityLabel} revenue performance</p>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md uppercase tracking-wider">
          {granularityLabel}
        </span>
      </div>

      <div className="flex-1 w-full min-h-0">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
              <XAxis
                dataKey="date"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dy={8}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
                dx={-4}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary-color)"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: 'var(--primary-color)',
                  stroke: 'var(--card)',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
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