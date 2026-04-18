import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { useOrdersList } from '../features/orders/hooks/useOrders';
import { setFilters, setPagination } from '../features/orders/slices/orderSlice';
import { OrderStatusBadge } from '../features/orders/components/OrderStatusBadge';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filters, pagination } = useSelector((state) => state.orders);
  
  const { data, isLoading, isError } = useOrdersList();
  const orders = data?.orders || [];
  const meta = data?.pagination || {};

  const handleSearch = (e) => dispatch(setFilters({ search: e.target.value }));
  const handlePageChange = (newPage) => dispatch(setPagination({ page: newPage }));

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground">Manage and track customer orders.</p>
        </div>
        <button 
          onClick={() => navigate('/order/create')}
          className="text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <Plus size={18} /> Create Order
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search Invoice # or Customer..." 
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-transparent text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none placeholder:text-muted-foreground"
          />
        </div>
        
        <select 
          value={filters.orderStatus}
          onChange={(e) => dispatch(setFilters({ orderStatus: e.target.value }))}
          className="p-2 border border-border rounded-lg bg-card text-foreground"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="date"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-transparent text-foreground"
            onChange={(e) => dispatch(setFilters({ startDate: e.target.value }))}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted border-b border-border text-muted-foreground font-medium uppercase">
              <tr>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Delivery</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan="7" className="p-8 text-center text-muted-foreground">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-muted-foreground">No orders found.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-medium" style={{ color: 'var(--primary-color)' }}>{order.invoice_no}</td>
                    <td className="px-6 py-4 text-foreground">{order.customer_name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">${Number(order.total_amount).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.payment_status} type="payment" />
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.delivery_status} type="delivery" />
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.order_status} type="overall" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-muted/50">
          <span className="text-sm text-muted-foreground">Page {meta.currentPage} of {meta.totalPages}</span>
          <div className="flex gap-2">
            <button 
              disabled={!meta.hasPrevPage}
              onClick={() => handlePageChange(meta.currentPage - 1)}
              className="px-3 py-1 border border-border rounded-lg hover:bg-muted text-foreground disabled:opacity-50 transition-colors"
            >
              Prev
            </button>
            <button 
              disabled={!meta.hasNextPage}
              onClick={() => handlePageChange(meta.currentPage + 1)}
              className="px-3 py-1 border border-border rounded-lg hover:bg-muted text-foreground disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;