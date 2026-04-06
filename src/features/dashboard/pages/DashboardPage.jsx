import React, { useState } from 'react';
import { Calendar, Download, Loader } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';

// Components
import { DashboardStatsCards } from '../components/DashboardStatsCards';
import { RevenueChart } from '../components/RevenueChart';
import { TopProductsList } from '../components/TopProductsList';
import { RecentOrdersTable } from '../components/RecentOrdersTable';

const DashboardPage = () => {
  // Default to current month
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
  });

  const { data, isLoading, isError } = useDashboard(dateRange);

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin text-primary" /></div>;
  
  // Graceful error handling - shows UI even if API fails
  if (isError) return <div className="p-10 text-center text-red-500">Failed to load dashboard data.</div>;

  return (
    <div className="p-6 space-y-6 min-h-screen pb-20">
      
      {/* --- HEADER & CONTROLS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-sans text-pureWhite font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted font-sans">Overview of your business performance.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Date Picker Range */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
            <Calendar size={16} className="text-muted" />
            <input 
              type="date" 
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              className="bg-transparent text-sm outline-none text-foreground color-scheme-dark"
            />
            <span className="text-muted">-</span>
            <input 
              type="date" 
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
              className="bg-transparent text-sm outline-none text-foreground color-scheme-dark"
            />
          </div>

          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* --- 1. STATS CARDS --- */}
      <DashboardStatsCards summary={data?.summary} />

      {/* --- 2. CHARTS & LISTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Fixed Revenue Chart */}
          <RevenueChart data={data?.revenueChart} />
        </div>
        <div className="lg:col-span-1">
          {/* Fixed Top Products List */}
          <TopProductsList products={data?.topSelling} />
        </div>
      </div>

      {/* --- 3. RECENT ORDERS --- */}
      <RecentOrdersTable orders={data?.recentOrders} />

    </div>
  );
};

export default DashboardPage;