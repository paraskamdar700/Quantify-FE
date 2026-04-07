import React from 'react';
import { DollarSign, ShoppingCart, AlertCircle, Package } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, iconColor }) => (
  <div className="bg-card border border-border rounded-xl p-5 card-hover group">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold text-card-foreground tracking-tight">{value}</h3>
      </div>
      <div
        className="p-2.5 rounded-lg transition-colors"
        style={{ backgroundColor: `${iconColor}15` }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
    </div>
    {subtext && <p className="text-xs text-muted-foreground mt-2">{subtext}</p>}
  </div>
);

export const DashboardStatsCards = ({ summary }) => {
  if (!summary) return null;

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#3b82f6';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value={`₹${Number(summary.total_revenue).toLocaleString()}`}
        icon={DollarSign}
        iconColor="#22c55e"
      />
      <StatCard
        title="Total Orders"
        value={summary.total_orders}
        icon={ShoppingCart}
        iconColor={primaryColor}
      />
      <StatCard
        title="Pending Payments"
        value={`₹${Number(summary.pending_payments?.amount || 0).toLocaleString()}`}
        subtext={`${summary.pending_payments?.count || 0} invoices pending`}
        icon={AlertCircle}
        iconColor="#f97316"
      />
      <StatCard
        title="Active Products"
        value={summary.total_products}
        icon={Package}
        iconColor="#8b5cf6"
      />
    </div>
  );
};