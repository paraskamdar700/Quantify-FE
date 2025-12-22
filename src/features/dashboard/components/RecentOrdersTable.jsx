import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatusBadge } from '../../orders/components/OrderStatusBadge';

export const RecentOrdersTable = ({ orders = [] }) => {
  const navigate = useNavigate();

  // SAFETY CHECK: Ensure orders is an array
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="bg-white dark:bg-pureBlack border border-gray-200 dark:border-darkBorder rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-darkBorder flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h3>
        <button 
          onClick={() => navigate('/orders')}
          className="text-sm font-medium text-[var(--primary-color)] hover:underline"
        >
          View All Orders
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Invoice #</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Delivery</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {safeOrders.length === 0 ? (
                <tr><td colSpan="6" className="p-6 text-center text-gray-500">No recent orders found.</td></tr>
            ) : (
                safeOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-[var(--primary-color)]">#{order.invoice_no}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.customer_name}</td>
                    <td className="px-6 py-4 font-semibold">${Number(order.total_amount).toLocaleString()}</td>
                    <td className="px-6 py-4"><OrderStatusBadge status={order.payment_status} type="payment" /></td>
                    <td className="px-6 py-4"><OrderStatusBadge status={order.delivery_status} type="delivery" /></td>
                    <td className="px-6 py-4 text-gray-500">{new Date(order.order_date).toLocaleDateString()}</td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};