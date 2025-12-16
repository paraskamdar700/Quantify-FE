import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit2, Trash2, 
  ChevronLeft, ChevronRight, Loader 
} from 'lucide-react';

// Import Features
import { useInventory } from '../features/inventory/hooks/useInventory.js';
import { useCategories } from '../features/inventory/hooks/useCategories.js';
import { StockModal } from '../features/inventory/components/StockModal.jsx';

export const InventoryPage = () => {
  // --- Hooks ---
  const { 
    stockItems, pagination, isLoading, 
    fetchStock, addStockItem, updateStockItem, deleteStockItem 
  } = useInventory();
  
  // We reuse the Category hook to get the dropdown list for filters & modal
  const { categories } = useCategories(); 

  // --- Local UI State ---
  const [filters, setFilters] = useState({
    search: "",
    category_id: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // --- Effects ---
  useEffect(() => {
    fetchStock(filters);
  }, [filters, fetchStock]);

  // --- Handlers ---
  const handleModalSubmit = async (formData) => {
    let result;
    if (editingItem) {
      result = await updateStockItem(editingItem.id, formData);
    } else {
      result = await addStockItem(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
      setEditingItem(null);
      fetchStock(filters); // Refresh
      alert(editingItem ? "Updated successfully" : "Added successfully");
    } else {
      alert(result.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      const result = await deleteStockItem(id);
      if (result.success) fetchStock(filters);
      else alert(result.message);
    }
  };

  const openAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // --- Render ---
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage stock, track quantities, and update prices.</p>
        </div>
        <button onClick={openAdd} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm">
          <Plus size={18} /> Add New Item
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" placeholder="Search Name/SKU..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900/10 outline-none"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <select 
            className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-slate-900/10 outline-none"
            value={filters.category_id}
            onChange={(e) => setFilters({...filters, category_id: e.target.value, page: 1})}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.category_name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 col-span-2">
            <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm text-gray-600"
                value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
            <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm text-gray-600"
                value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                 <tr><td colSpan="6" className="p-8 text-center text-gray-500"><Loader className="animate-spin inline mr-2"/> Loading...</td></tr>
              ) : stockItems.length === 0 ? (
                 <tr><td colSpan="6" className="p-8 text-center text-gray-500">No items found.</td></tr>
              ) : (
                stockItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.stock_name}</td>
                    <td className="px-6 py-4 text-gray-500">{item.sku_code}</td>
                    <td className="px-6 py-4 text-gray-600">
                       {/* Lookup category name if API doesn't return it, otherwise use what API returned */}
                       {item.category_name || categories.find(c => c.id === item.category_id)?.category_name || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        Number(item.quantity_available) === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.quantity_available} {item.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">${item.buy_price}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                          <button onClick={() => handleDelete(item.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Page {pagination.currentPage}</span>
            <div className="flex gap-2">
              <button 
                disabled={filters.page <= 1}
                onClick={() => setFilters({...filters, page: filters.page - 1})}
                className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                disabled={stockItems.length < filters.limit}
                onClick={() => setFilters({...filters, page: filters.page + 1})}
                className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
        </div>
      </div>

      {/* Modal */}
      <StockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingItem}
        categories={categories} // Passing categories down to the modal
      />
    </div>
  );
};