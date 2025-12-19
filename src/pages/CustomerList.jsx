import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, 
  ChevronLeft, ChevronRight, User, MapPin, Phone 
} from 'lucide-react';
import { useCustomers } from '../features/customers/hooks/useCustomers.js';
import { CustomerModal } from '../features/customers/components/CustomerModal.jsx';

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

const CustomerList = () => {
  // State
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Hook Data
  const { 
    customers, pagination, isLoading, isError, 
    addCustomer, updateCustomer, deleteCustomer, isMutating 
  } = useCustomers(filters);

  // Handlers
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
    <div className="p-6 space-y-6 min-h-screen text-gray-900 dark:text-gray-100">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your client base and view purchase history.</p>
        </div>
        <button 
          onClick={openAdd}
          className="bg-[var(--primary-color)] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Name, Firm, or Phone..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all placeholder:text-gray-400"
            value={filters.search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* 3. Data Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4 hidden md:table-cell">Contact Info</th>
                <th className="px-6 py-4 hidden lg:table-cell">Location</th>
                <th className="px-6 py-4">Last Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading customers...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No customers found.</td></tr>
              ) : (
                customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                    {/* Name & Firm */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-[var(--primary-color)] font-bold">
                          {cust.fullname.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{cust.firm_name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <User size={12} /> {cust.fullname}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact & GST */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" /> {cust.contact_no || '-'}
                        </p>
                        {cust.gst_no && (
                          <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800">
                            GST: {cust.gst_no}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 hidden lg:table-cell text-gray-600 dark:text-gray-400">
                      {(cust.city || cust.street) ? (
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="mt-0.5 text-gray-400" />
                          <span>{cust.street}, {cust.city}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No address</span>
                      )}
                    </td>

                    {/* Last Order Date */}
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        cust.last_order_date 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatDate(cust.last_order_date)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEdit(cust)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cust.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              disabled={!pagination.hasPrevPage}
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
              className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-300 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              disabled={!pagination.hasNextPage}
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
              className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-300 transition-colors"
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