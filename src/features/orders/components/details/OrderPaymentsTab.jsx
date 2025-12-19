import React, { useState } from 'react'; // 1. Import useState
import { DollarSign, Plus } from 'lucide-react';
import { useOrderResources } from '../../hooks/useOrders.js';
import { RecordPaymentModal } from './RecordPaymentModal.jsx'; // 2. Import the modal

const OrderPaymentsTab = ({ orderId }) => {
  const { paymentsQuery } = useOrderResources(orderId);
  const { data: payments = [], isLoading } = paymentsQuery;

  // 3. Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      
      {/* Action Bar */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsModalOpen(true)} // 4. Open Modal on click
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:opacity-90 shadow-sm transition-all"
        >
          <Plus size={16} /> Record Payment
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* ... (Existing Table Code remains the same) ... */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
           <h3 className="font-semibold flex items-center gap-2">
             <DollarSign size={18} className="text-[var(--primary-color)]" /> Payment History
           </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 font-medium uppercase">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Reference No</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Remarks</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading ? (
                 <tr><td colSpan="5" className="p-8 text-center">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                 <tr><td colSpan="5" className="p-8 text-center text-gray-500">No payments recorded yet.</td></tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {payment.reference_no || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-0.5 border rounded text-xs font-medium bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                        {payment.payment_method}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 italic">
                      {payment.remarks || '-'}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-green-600 dark:text-green-400">
                      ${Number(payment.amount_paid).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Render the Modal */}
      <RecordPaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        orderId={orderId}
      />
    </div>
  );
};

export default OrderPaymentsTab;