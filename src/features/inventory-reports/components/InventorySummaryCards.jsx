import React from 'react';
import { DollarSign, RefreshCw, Target, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../../shared/context/ThemeContext.jsx';

/* ────────────────────────────────────────────
   Single Stat Card
   ──────────────────────────────────────────── */
const StatCard = ({ title, value, subtext, subtextColor, icon: Icon, iconColor, iconBg }) => (
  <div className="bg-card border border-border rounded-xl p-5 card-hover group">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-card-foreground tracking-tight">{value}</h3>
      </div>
      <div
        className="p-2.5 rounded-lg transition-colors"
        style={{ backgroundColor: iconBg || `${iconColor}15` }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
    </div>
    {subtext && (
      <p className="text-xs mt-2.5 font-medium" style={{ color: subtextColor || 'var(--muted-foreground)' }}>
        {subtext}
      </p>
    )}
  </div>
);

/* ────────────────────────────────────────────
   Summary Cards Row
   ──────────────────────────────────────────── */
export const InventorySummaryCards = ({ summary }) => {
  const { primaryColor } = useTheme();

  if (!summary) return null;

  const formattedValue = `$${Number(summary.total_value || 0).toLocaleString()}`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Value"
        value={formattedValue}
        icon={DollarSign}
        iconColor={primaryColor}
      />
      <StatCard
        title="Turnover Ratio"
        value={`${Number(summary.turnover_ratio || 0).toFixed(1)}x`}
        subtext={Number(summary.turnover_ratio) >= 2 ? '● Above industry avg' : '● Below industry avg'}
        subtextColor={Number(summary.turnover_ratio) >= 2 ? '#22c55e' : '#f97316'}
        icon={RefreshCw}
        iconColor="#8b5cf6"
      />
      <StatCard
        title="Sell-Through Rate"
        value={`${Number(summary.sell_through_rate || 0).toFixed(0)}%`}
        icon={Target}
        iconColor={primaryColor}
      />
      <StatCard
        title="Stock Alerts"
        value={`${summary.stock_alerts || 0} Items`}
        subtext={Number(summary.stock_alerts) > 0 ? '⚠ Requires immediate restock' : 'All stock levels healthy'}
        subtextColor={Number(summary.stock_alerts) > 0 ? '#ef4444' : '#22c55e'}
        icon={AlertTriangle}
        iconColor={Number(summary.stock_alerts) > 0 ? '#ef4444' : '#22c55e'}
      />
    </div>
  );
};
