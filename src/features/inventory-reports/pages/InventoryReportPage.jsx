import React, { useState } from 'react';
import { Calendar, FileDown, RefreshCw, Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventoryReport } from '../hooks/useInventoryReport';

// Components
import { InventorySummaryCards } from '../components/InventorySummaryCards';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { SellThroughAnalysis } from '../components/SellThroughAnalysis';

const InventoryReportPage = () => {
  // Default to current month
  const now = new Date();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0],
  });

  const { data, isLoading, isError, refetch, isFetching } = useInventoryReport(dateRange);

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleRefresh = () => {
    refetch();
  };

  /* ── LOADING STATE ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader className="animate-spin text-muted-foreground" size={24} />
          <p className="text-sm text-muted-foreground">Loading inventory data...</p>
        </div>
      </div>
    );
  }

  /* ── ERROR STATE ── */
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive font-medium">Failed to load inventory report data.</p>
          <p className="text-sm text-muted-foreground mt-1">Please check your connection and try again.</p>
          <button
            onClick={handleRefresh}
            className="mt-4 inline-flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen pb-20">

      {/* ── HEADER & CONTROLS ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Back to Reports */}
          <Link
            to="/reports"
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Inventory Report
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-time supply chain operational metrics and valuation.
            </p>
          </div>
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

          {/* Export PDF Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border text-card-foreground bg-card hover:bg-muted transition-colors"
          >
            <FileDown size={14} />
            Export PDF
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* ── 1. SUMMARY CARDS ── */}
      <InventorySummaryCards summary={data?.summary} />

      {/* ── 2. CATEGORY BREAKDOWN + SELL-THROUGH ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <CategoryBreakdown categories={data?.categoryBreakdown} />
        </div>
        <div className="lg:col-span-1">
          <SellThroughAnalysis sellThrough={data?.sellThrough} />
        </div>
      </div>
    </div>
  );
};

export default InventoryReportPage;
