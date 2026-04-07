import React from 'react';
import { Link } from 'react-router-dom';

export const TopProductsList = ({ products = [] }) => {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h3 className="text-base font-semibold text-card-foreground">Top Selling</h3>
        <Link
          to="/inventory/products"
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--primary-color)' }}
        >
          View All
        </Link>
      </div>

      <div className="overflow-y-auto flex-1 pr-1 space-y-2 thin-scrollbar">
        {safeProducts.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No sales data available.
          </div>
        ) : (
          safeProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: 'var(--primary-color)', opacity: 0.8 + (index * 0.05) }}
                >
                  #{index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{product.stock_name}</p>
                  <p className="text-xs text-muted-foreground">{product.sku_code}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: 'var(--primary-color)' }}>
                  {Number(product.total_sold_quantity)} sold
                </p>
                <p className="text-xs text-muted-foreground">₹{Number(product.total_sales_amount).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};