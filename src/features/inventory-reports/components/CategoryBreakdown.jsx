import React from 'react';

/* ────────────────────────────────────────────
   Single Category Row
   ──────────────────────────────────────────── */
const CategoryRow = ({ name, value, percentage }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-card-foreground">{name}</span>
      <span className="text-sm font-semibold text-card-foreground">
        ${Number(value).toLocaleString()}
      </span>
    </div>
    {/* Progress Bar — uses CSS var directly so it's always reactive to theme changes */}
    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${Math.min(percentage, 100)}%`,
          backgroundColor: 'var(--primary-color)',
        }}
      />
    </div>
  </div>
);

/* ────────────────────────────────────────────
   Category Breakdown Card
   ──────────────────────────────────────────── */
export const CategoryBreakdown = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">No category data available</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-card-foreground">
          Inventory Value by Category
        </h3>
        <button
          className="text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: 'var(--primary-color)' }}
        >
          View Details
        </button>
      </div>

      {/* Category List */}
      <div className="flex-1 space-y-5">
        {categories.map((cat) => (
          <CategoryRow
            key={cat.category_id}
            name={cat.category_name}
            value={cat.total_value}
            percentage={cat.percentage}
          />
        ))}
      </div>
    </div>
  );
};
