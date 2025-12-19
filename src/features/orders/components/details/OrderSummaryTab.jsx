import React, { useState } from 'react';
import { User, CreditCard } from 'lucide-react';
import { OrderStatusBadge } from '../OrderStatusBadge';

// 1. Import the Modals
import { RecordPaymentModal } from './RecordPaymentModal';
import { RecordDeliveryModal } from './RecordDeliveryModal';

const OrderSummaryTab = ({ order }) => {
  // 2. Add State for Modals
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Customer Details Card */}
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={20} className="text-[var(--primary-color)]" /> Customer Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase">Customer Name</p>
              <p className="font-medium text-lg text-gray-900 dark:text-white">{order.customer_name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Payment Terms</p>
              <p className="font-medium text-gray-900 dark:text-white">{order.payment_terms || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase mb-1">Delivery Instructions</p>
              <p className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                {order.delivery_instructions || 'No specific instructions.'}
              </p>
            </div>
          </div>
        </div>

        {/* Order Totals Card */}
           <div className="col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
        <div>
           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
             <CreditCard size={20} className="text-[var(--primary-color)]" /> Financials
           </h3>
           <div className="space-y-3">
             <div className="flex justify-between">
               <span className="text-gray-500">Total Amount</span>
               <span className="font-bold text-lg">₹{Number(order.total_amount).toFixed(2)}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-500">Total Paid</span>
               <span className="font-medium text-green-600">₹{Number(order.total_amount_paid || 0).toFixed(2)}</span>
             </div>
             <div className="h-px bg-gray-100 dark:bg-gray-700 my-2"></div>
             <div className="flex justify-between items-center">
               <span className="text-gray-500">Balance Due</span>
               <span className="text-xl font-bold text-red-500">
                 ₹{(Number(order.total_amount) - Number(order.total_amount_paid || 0)).toFixed(2)}
               </span>
             </div>
           </div>
        </div>
          
          {/* Quick Actions */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2 rounded text-sm mb-4">
                <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                <OrderStatusBadge status={order.payment_status} type="payment" />
            </div>
            
            {/* 3. Attach Handlers to Buttons */}
            <button 
              onClick={() => setPaymentModalOpen(true)}
              className="w-full py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Record Payment
            </button>
            <button 
              onClick={() => setDeliveryModalOpen(true)}
              className="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Record Delivery
            </button>
          </div>
        </div>
      </div>

      {/* 4. Render Modals */}
      <RecordPaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setPaymentModalOpen(false)} 
        orderId={order.id} 
      />

      <RecordDeliveryModal 
        isOpen={isDeliveryModalOpen} 
        onClose={() => setDeliveryModalOpen(false)} 
        orderId={order.id} 
      />
    </>
  );
};

export default OrderSummaryTab;