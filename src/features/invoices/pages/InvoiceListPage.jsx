import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Search, Eye, Download } from 'lucide-react';
import { useOrdersList } from '../../orders/hooks/useOrders'; // Reusing Order Hook
import { setFilters, setPagination } from '../../orders/slices/orderSlice'; // Reusing Order Slice
import { OrderStatusBadge } from '../../orders/components/OrderStatusBadge';

const InvoiceListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters, pagination } = useSelector((state) => state.orders);
  
  // Fetching data using Order API as requested
  const { data, isLoading } = useOrdersList();
  const invoices = data?.orders || [];
  const meta = data?.pagination || {};

  const handleSearch = (e) => dispatch(setFilters({ search: e.target.value }));
  const handlePageChange = (newPage) => dispatch(setPagination({ page: newPage }));

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage customer invoices.</p>
        </div>
        <button 
          onClick={() => navigate('/order/create')} // Invoices usually start as Orders
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90"
        >
          <Plus size={18} /> New Invoice
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Invoice # or Customer..." 
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
          />
        </div>
        {/* Add Date Range / Status Filters here if needed */}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium uppercase">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Delivery</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading invoices...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">No invoices found.</td></tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-[var(--primary-color)]">
                      {inv.invoice_no || `ORD-${inv.id}`}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">{inv.customer_name}</p>
                    </td>
                    <td className="px-6 py-4">{new Date(inv.created_at || inv.order_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      ${Number(inv.total_amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <OrderStatusBadge status={inv.delivery_status} type="delivery" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <OrderStatusBadge status={inv.order_status} type="overall" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/invoices/${inv.id}`)}
                          className="p-2 text-gray-500 hover:text-[var(--primary-color)] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls (Reusing logic from Orders) */}
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

export default InvoiceListPage;