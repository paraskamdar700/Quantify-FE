import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, 
  ChevronLeft, ChevronRight, User, MapPin, Phone 
} from 'lucide-react';
import { useCustomers } from '../features/customers/hooks/useCustomers.js';
import { CustomerModal } from '../features/customers/components/CustomerModal.jsx';

const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

const CustomerList = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const { 
    customers, pagination, isLoading, isError, 
    addCustomer, updateCustomer, deleteCustomer, isMutating 
  } = useCustomers(filters);

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingCustomer) {
        await updateCustomer({ id: editingCustomer.id, ...formData });
      } else {
        await addCustomer(formData);
      }
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
      } catch (error) {
        alert("Failed to delete customer");
      }
    }
  };

  const openAdd = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const openEdit = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen pb-20">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your client base and view purchase history.</p>
        </div>
        <button 
          onClick={openAdd}
          className="text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by Name, Firm, or Phone..." 
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-transparent text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all placeholder:text-muted-foreground"
            value={filters.search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* 3. Data Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted border-b border-border text-muted-foreground font-medium uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4 hidden md:table-cell">Contact Info</th>
                <th className="px-6 py-4 hidden lg:table-cell">Location</th>
                <th className="px-6 py-4">Last Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan="5" className="p-8 text-center text-muted-foreground">Loading customers...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-muted-foreground">No customers found.</td></tr>
              ) : (
                customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-muted/50 transition-colors group">
                    {/* Name & Firm */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold" style={{ color: 'var(--primary-color)' }}>
                          {cust.fullname.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{cust.firm_name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <User size={12} /> {cust.fullname}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact & GST */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <p className="text-foreground flex items-center gap-2">
                          <Phone size={14} className="text-muted-foreground" /> {cust.contact_no || '-'}
                        </p>
                        {cust.gst_no && (
                          <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800">
                            GST: {cust.gst_no}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 hidden lg:table-cell text-muted-foreground">
                      {(cust.city || cust.street) ? (
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="mt-0.5 text-muted-foreground" />
                          <span>{cust.street}, {cust.city}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">No address</span>
                      )}
                    </td>

                    {/* Last Order Date */}
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        cust.last_order_date 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {formatDate(cust.last_order_date)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEdit(cust)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          style={{ color: 'var(--primary-color)' }}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cust.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/50">
          <span className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              disabled={!pagination.hasPrevPage}
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
              className="p-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-foreground transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              disabled={!pagination.hasNextPage}
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
              className="p-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-foreground transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleModalSubmit}
        initialData={editingCustomer}
        isSubmitting={isMutating}
      />
    </div>
  );
};

export default CustomerList;