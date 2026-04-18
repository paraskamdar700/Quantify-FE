import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Package, Truck, Users,
  ChevronRight, BarChart3,
} from 'lucide-react';

/* ────────────────────────────────────────────
   Report card data — placeholder until APIs
   ──────────────────────────────────────────── */
const reportSections = [
  {
    title: 'Sales Reports',
    description: 'Insights into your revenue and sales performance.',
    icon: TrendingUp,
    iconColor: '#3b82f6',
    items: [
      'Revenue Summary',
      'Top-Selling Items',
      'Sales Trends',
      'Sales by Location',
    ],
    cta: 'View Detailed Sales Report',
  },
  {
    title: 'Inventory Reports',
    description: 'Track your stock levels and product movement.',
    icon: Package,
    iconColor: '#8b5cf6',
    items: [
      'Current Stock Levels',
      'Low Stock Alerts',
      'Inventory Turnover',
      'Stock Valuation',
    ],
    cta: 'View Detailed Report',
    ctaLink: '/reports/inventory',
  },
  {
    title: 'Order Fulfillment Reports',
    description: 'Monitor your order processing efficiency.',
    icon: Truck,
    iconColor: '#f97316',
    items: [
      'Average Delivery Time',
      'Pending Deliveries',
      'Order Accuracy',
      'Returns Analysis',
    ],
    cta: 'View Detailed Report',
  },
  {
    title: 'Customer Reports',
    description: 'Understand your customer base behavior.',
    icon: Users,
    iconColor: '#22c55e',
    items: [
      'Top Customers by Revenue',
      'New Customer Growth',
      'Customer Retention Rate',
    ],
    cta: 'View Detailed Report',
  },
];

/* ────────────────────────────────────────────
   Single Report Row Item
   ──────────────────────────────────────────── */
const ReportItem = ({ label }) => (
  <button
    className="
      flex items-center justify-between w-full
      px-4 py-3 text-sm text-card-foreground
      hover:bg-muted/60 transition-colors duration-150
      cursor-pointer group
    "
  >
    <span className="group-hover:translate-x-0.5 transition-transform duration-150">
      {label}
    </span>
    <ChevronRight
      size={16}
      className="text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150"
    />
  </button>
);

/* ────────────────────────────────────────────
   Single Report Card
   ──────────────────────────────────────────── */
const ReportCard = ({ section }) => {
  const Icon = section.icon;
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (section.ctaLink) {
      navigate(section.ctaLink);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col card-hover overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-4 p-5 pb-4">
        <div
          className="p-2.5 rounded-lg shrink-0"
          style={{ backgroundColor: `${section.iconColor}15` }}
        >
          <Icon size={20} style={{ color: section.iconColor }} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-card-foreground leading-tight">
            {section.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
            {section.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Report Items */}
      <div className="flex-1 divide-y divide-border/50">
        {section.items.map((item) => (
          <ReportItem key={item} label={item} />
        ))}
      </div>

      {/* CTA Button */}
      <div className="p-4 pt-2">
        <button
          onClick={handleCtaClick}
          className="
            w-full flex items-center justify-center gap-2
            text-white text-sm font-medium
            px-4 py-2.5 rounded-lg
            hover:opacity-90 active:scale-[0.98]
            transition-all duration-150
          "
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <BarChart3 size={15} />
          {section.cta}
        </button>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────
   Reports Page
   ──────────────────────────────────────────── */
const ReportsPage = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen pb-20">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Reports
        </h1>
        <p className="text-sm text-muted-foreground">
          Access detailed reports to monitor every aspect of your business.
        </p>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {reportSections.map((section) => (
          <ReportCard key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
