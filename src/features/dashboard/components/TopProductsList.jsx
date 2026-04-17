import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

// Color palette for pie slices — works well in both light & dark modes
const COLORS = [
  'var(--primary-color)',
  '#8b5cf6',
  '#22c55e',
  '#f97316',
  '#ef4444',
  '#06b6d4',
  '#ec4899',
  '#eab308',
];

// Active slice renderer (expanded with label)
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="var(--card-foreground)" className="text-sm font-semibold">
        {payload.stock_name}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--muted-foreground)" className="text-xs">
        ₹{Number(value).toLocaleString()} ({(percent * 100).toFixed(1)}%)
      </text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius - 1}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export const TopProductsList = ({ topSelling }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle both old flat-array format and new { grand_total, products } format
  const products = Array.isArray(topSelling)
    ? topSelling
    : Array.isArray(topSelling?.products)
      ? topSelling.products
      : [];

  const grandTotal = topSelling?.grand_total || 0;

  const chartData = products.map((p) => ({
    stock_name: p.stock_name,
    sku_code: p.sku_code,
    value: Number(p.total_sales_amount),
    percentage: p.percentage,
    quantity: p.total_sold_quantity,
  }));

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-2 shrink-0">
        <div>
          <h3 className="text-base font-semibold text-card-foreground">Top Selling</h3>
          {grandTotal > 0 && (
            <p className="text-sm text-muted-foreground">
              Total: ₹{Number(grandTotal).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          No sales data available.
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Pie Chart */}
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  paddingAngle={2}
                  stroke="none"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="shrink-0 space-y-1.5 max-h-[100px] overflow-y-auto thin-scrollbar pt-2 border-t border-border">
            {chartData.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between text-xs px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  activeIndex === index ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-card-foreground font-medium truncate max-w-[120px]">
                    {item.stock_name}
                  </span>
                </div>
                <span className="text-muted-foreground font-medium">
                  {item.percentage != null ? `${item.percentage}%` : `₹${item.value.toLocaleString()}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};