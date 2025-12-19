import React from 'react';
import { Package, CheckCircle, Truck } from 'lucide-react';
import { useOrderResources } from '../../hooks/useOrders';

const OrderItemsTab = ({ orderId }) => {
  // 1. Fetch Items using the hook
  const { itemsQuery } = useOrderResources(orderId);
  const { data: items = [], isLoading } = itemsQuery;

  if (isLoading) return <div className="p-4 text-center">Loading items...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <Package size={18} className="text-[var(--primary-color)]" /> Order Items
        </h3>
        {/* Optional: Add Item Button could go here */}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 font-medium uppercase">
            <tr>
              <th className="px-6 py-4">Item Details</th>
              <th className="px-6 py-4 text-center">Qty Ordered</th>
              <th className="px-6 py-4 text-center">Qty Delivered</th>
              <th className="px-6 py-4 text-right">Unit Price</th>
              <th className="px-6 py-4 text-right">Subtotal</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {items.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500">No items in this order.</td></tr>
            ) : (
              items.map((item) => {
                // Assuming the API might return delivered quantity, or we calculate it. 
                // Based on docs, we might strictly only have 'quantity' from the Order Items endpoint.
                // We'll interpret 'quantity' as 'ordered'.
                const qtyOrdered = item.quantity; 
                const qtyDelivered = item.quantity_delivered || 0; // Fallback if API doesn't populate yet
                const isFullyDelivered = qtyDelivered >= qtyOrdered;

                return (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{item.stock_name}</p>
                      <p className="text-xs text-gray-500">SKU: {item.sku_code || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {qtyOrdered} {item.unit}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isFullyDelivered 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {qtyDelivered}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      ${Number(item.selling_price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      ${Number(item.subtotal).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {isFullyDelivered ? (
                        <div className="flex items-center justify-center text-green-600 gap-1 text-xs font-medium">
                          <CheckCircle size={14} /> Done
                        </div>
                      ) : (
                        <button 
                          onClick={() => alert(`Open Deliver Modal for Item #${item.id}`)}
                          className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1 mx-auto"
                        >
                          <Truck size={12} /> Deliver
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItemsTab;