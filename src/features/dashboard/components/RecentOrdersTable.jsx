import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatusBadge } from '../../orders/components/OrderStatusBadge';

export const RecentOrdersTable = ({ orders = [] }) => {
  const navigate = useNavigate();
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <h3 className="text-base font-semibold text-card-foreground">Recent Orders</h3>
        <button
          onClick={() => navigate('/order')}
          className="text-sm font-medium hover:underline"
          style={{ color: 'var(--primary-color)' }}
        >
          View All Orders
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider font-medium">
            <tr>
              <th className="px-5 py-3">Invoice #</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Delivery</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {safeOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-8 text-center text-muted-foreground">
                  No recent orders found.
                </td>
              </tr>
            ) : (
              safeOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-sm" style={{ color: 'var(--primary-color)' }}>
                    #{order.invoice_no}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-card-foreground">{order.customer_name}</td>
                  <td className="px-5 py-3.5 font-semibold text-card-foreground">₹{Number(order.total_amount).toLocaleString()}</td>
                  <td className="px-5 py-3.5"><OrderStatusBadge status={order.payment_status} type="payment" /></td>
                  <td className="px-5 py-3.5"><OrderStatusBadge status={order.delivery_status} type="delivery" /></td>
                  <td className="px-5 py-3.5 text-muted-foreground">{new Date(order.order_date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};