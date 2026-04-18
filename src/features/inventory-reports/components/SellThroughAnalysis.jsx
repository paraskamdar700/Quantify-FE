import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../../shared/context/ThemeContext.jsx';

/* ────────────────────────────────────────────
   Sell-Through Analysis Card (Donut Chart)
   ──────────────────────────────────────────── */
export const SellThroughAnalysis = ({ sellThrough }) => {
  const { primaryColor, themeMode } = useTheme();

  if (!sellThrough) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">No sell-through data available</p>
      </div>
    );
  }

  const rate = Number(sellThrough.sell_through_rate) || 0;
  const targetRate = Number(sellThrough.target_rate) || 75;
  const trend = Number(sellThrough.trend) || 0;
  const isPositiveTrend = trend >= 0;

  // Muted color for the donut remainder — adapts to dark/light mode
  const mutedColor = themeMode === 'dark' ? '#27272a' : '#f4f4f5';

  // Data for donut
  const chartData = [
    { name: 'Rate', value: rate },
    { name: 'Remaining', value: Math.max(100 - rate, 0) },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-base font-semibold text-card-foreground">Sell-Through Analysis</h3>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          The percentage of inventory sold compared to the amount received from suppliers.
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
                animationBegin={0}
                animationDuration={1000}
              >
                <Cell fill={primaryColor} />
                <Cell fill={mutedColor} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-card-foreground">{rate.toFixed(0)}%</span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
              Rate
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="space-y-3 pt-2 border-t border-border">
        {/* Target Rate */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Target Rate</span>
          <span className="text-sm font-semibold text-card-foreground">{targetRate}%</span>
        </div>

        {/* Trend */}
        <div className="flex items-center gap-1.5">
          {isPositiveTrend ? (
            <TrendingUp size={14} className="text-emerald-500" />
          ) : (
            <TrendingDown size={14} className="text-red-500" />
          )}
          <span
            className="text-sm font-medium"
            style={{ color: isPositiveTrend ? '#22c55e' : '#ef4444' }}
          >
            {isPositiveTrend ? 'Up' : 'Down'} {Math.abs(trend).toFixed(1)}% from last cycle
          </span>
        </div>
      </div>
    </div>
  );
};
