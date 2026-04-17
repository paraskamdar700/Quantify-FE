import React, { useState } from 'react';
import { Calendar, Download, Loader } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { dashboardApi } from '../api/dashboardApi';

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

  const [isExporting, setIsExporting] = useState(false);

  const { data, isLoading, isError } = useDashboard(dateRange);

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await dashboardApi.exportDashboard(dateRange);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="animate-spin text-muted-foreground" size={24} />
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-destructive font-medium">Failed to load dashboard data.</p>
        <p className="text-sm text-muted-foreground mt-1">Please check your connection and try again.</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen pb-20">

      {/* ── HEADER & CONTROLS ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your business performance.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Date Picker */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
            <Calendar size={14} className="text-muted-foreground shrink-0" />
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              className="bg-transparent text-sm outline-none text-foreground w-[120px]"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
              className="bg-transparent text-sm outline-none text-foreground w-[120px]"
            />
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {isExporting ? (
              <Loader size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>

      {/* ── 1. STATS CARDS ── */}
      <DashboardStatsCards summary={data?.summary} />

      {/* ── 2. CHARTS & LISTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart revenueChart={data?.revenueChart} />
        </div>
        <div className="lg:col-span-1">
          <TopProductsList topSelling={data?.topSelling} />
        </div>
      </div>

      {/* ── 3. RECENT ORDERS ── */}
      <RecentOrdersTable orders={data?.recentOrders} />
    </div>
  );
};

export default DashboardPage;