import React, { useState } from 'react'; // 1. Import useState
import { Truck, Plus } from 'lucide-react';
import { useOrderResources } from '../../hooks/useOrders';
import { RecordDeliveryModal } from './RecordDeliveryModal'; // 2. Import Modal

const OrderDeliveriesTab = ({ orderId }) => {
  const { deliveriesQuery } = useOrderResources(orderId);
  const { data: deliveries = [], isLoading } = deliveriesQuery;

  // 3. Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      
      {/* Action Bar */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsModalOpen(true)} // 4. Open Modal
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Plus size={16} /> Record Delivery
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
           <h3 className="font-semibold flex items-center gap-2">
             <Truck size={18} className="text-[var(--primary-color)]" /> Delivery Logs
           </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 font-medium uppercase">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4 text-center">Qty Delivered</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading ? (
                 <tr><td colSpan="4" className="p-8 text-center">Loading delivery logs...</td></tr>
              ) : deliveries.length === 0 ? (
                 <tr><td colSpan="4" className="p-8 text-center text-gray-500">No deliveries recorded yet.</td></tr>
              ) : (
                deliveries.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                      {new Date(log.delivery_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {log.stock_name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                         {log.delivered_quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 italic">
                      {log.delivery_notes || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Render Modal */}
      <RecordDeliveryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderDeliveriesTab;