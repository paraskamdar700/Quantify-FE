import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { useOrdersList } from '../features/orders/hooks/useOrders';
import { setFilters, setPagination } from '../features/orders/slices/orderSlice';
import { OrderStatusBadge } from '../features/orders/components/OrderStatusBadge'; // We'll create this next

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filters, pagination } = useSelector((state) => state.orders);
  
  // Fetch Data using the Hook
  const { data, isLoading, isError } = useOrdersList();
  const orders = data?.orders || [];
  const meta = data?.pagination || {};

  // Handlers
  const handleSearch = (e) => dispatch(setFilters({ search: e.target.value }));
  const handlePageChange = (newPage) => dispatch(setPagination({ page: newPage }));

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track customer orders.</p>
        </div>
        <button 
          onClick={() => navigate('/order/create')}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={18} /> Create Order
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Invoice # or Customer..." 
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
          />
        </div>
        
        {/* Status Filter */}
        <select 
          value={filters.orderStatus}
          onChange={(e) => dispatch(setFilters({ orderStatus: e.target.value }))}
          className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        {/* Date Filter (Simplified for demo) */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="date"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent"
            onChange={(e) => dispatch(setFilters({ startDate: e.target.value }))}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium uppercase">
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
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">No orders found.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[var(--primary-color)]">{order.invoice_no}</td>
                    <td className="px-6 py-4">{order.customer_name}</td>
                    <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-semibold">${Number(order.total_amount).toFixed(2)}</td>
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
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
          <span className="text-sm text-gray-500">Page {meta.currentPage} of {meta.totalPages}</span>
          <div className="flex gap-2">
            <button 
              disabled={!meta.hasPrevPage}
              onClick={() => handlePageChange(meta.currentPage - 1)}
              className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50"
            >
              Prev
            </button>
            <button 
              disabled={!meta.hasNextPage}
              onClick={() => handlePageChange(meta.currentPage + 1)}
              className="px-3 py-1 border rounded hover:bg-white disabled:opacity-50"
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