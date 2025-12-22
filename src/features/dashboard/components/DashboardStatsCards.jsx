import React from 'react';
import { DollarSign, ShoppingCart, Users, Package, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }) => (
  <div className="bg-white font-sans text-{pureWhite} dark:bg-pureBlack p-6 rounded-xl border border-gray-200 dark:border-darkBorder shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-20`}>
        <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
      </div>
    </div>
    {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
  </div>
);

export const DashboardStatsCards = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 font-sans text-white md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Revenue" 
        value={`₹${Number(summary.total_revenue).toLocaleString()}`} 
        icon={DollarSign}
        colorClass="bg-green-100 text-green-600"
      />
      <StatCard 
        title="Total Orders" 
        value={summary.total_orders} 
        icon={ShoppingCart}
        colorClass="bg-blue-100 text-blue-600"
      />
      <StatCard 
        title="Pending Payments" 
        value={`₹${Number(summary.pending_payments?.amount || 0).toLocaleString()}`} 
        subtext={`${summary.pending_payments?.count || 0} invoices pending`}
        icon={AlertCircle}
        colorClass="bg-orange-100 text-orange-600"
      />
      <StatCard 
        title="Active Products" 
        value={summary.total_products} 
        icon={Package}
        colorClass="bg-purple-100 text-purple-600"
      />
    </div>
  );
};