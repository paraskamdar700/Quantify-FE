import React from 'react';

// FIX: Add default prop value
export const TopProductsList = ({ products = [] }) => {
  
  // SAFETY CHECK: Force 'products' to be an array. 
  // If API returns null, undefined, or an object, this falls back to [].
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="bg-white dark:bg-pureBlack p-6 rounded-xl border border-gray-200 dark:border-darkBorder shadow-sm h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Selling</h3>
        <button className="text-sm text-[var(--primary-color)] hover:underline">View All</button>
      </div>

      <div className="overflow-y-auto flex-1 pr-2 space-y-4">
        {safeProducts.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
                No sales data available.
            </div>
        ) : (
            safeProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-300">
                    #{index + 1}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{product.stock_name}</p>
                    <p className="text-xs text-gray-500">{product.sku_code}</p>
                </div>
                </div>
                <div className="text-right">
                <p className="text-sm font-bold text-[var(--primary-color)]">{Number(product.total_sold_quantity)} sold</p>
                <p className="text-xs text-gray-500">${Number(product.total_sales_amount).toLocaleString()}</p>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};