import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Search, Eye, Download } from 'lucide-react';
import { useOrdersList } from '../../orders/hooks/useOrders';
import { setFilters, setPagination } from '../../orders/slices/orderSlice';
import { OrderStatusBadge } from '../../orders/components/OrderStatusBadge';

const InvoiceListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters, pagination } = useSelector((state) => state.orders);
  
  const { data, isLoading } = useOrdersList();
  const invoices = data?.orders || [];
  const meta = data?.pagination || {};

  const handleSearch = (e) => dispatch(setFilters({ search: e.target.value }));
  const handlePageChange = (newPage) => dispatch(setPagination({ page: newPage }));

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground">View and manage customer invoices.</p>
        </div>
        <button 
          onClick={() => navigate('/order/create')}
          className="text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <Plus size={18} /> New Invoice
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search Invoice # or Customer..." 
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-transparent text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted border-b border-border text-muted-foreground font-medium uppercase">
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
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan="7" className="p-8 text-center text-muted-foreground">Loading invoices...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-muted-foreground">No invoices found.</td></tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium" style={{ color: 'var(--primary-color)' }}>
                      {inv.invoice_no || `ORD-${inv.id}`}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{inv.customer_name}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{new Date(inv.created_at || inv.order_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right font-semibold text-foreground">
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
                          className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                          style={{ '--hover-color': 'var(--primary-color)' }}
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
        
        {/* Pagination Controls */}
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

export default InvoiceListPage;