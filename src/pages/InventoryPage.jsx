import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit2, Trash2, 
  ChevronLeft, ChevronRight, Loader 
} from 'lucide-react';

import { useInventory } from '../features/inventory/hooks/useInventory.js';
import { useCategories } from '../features/inventory/hooks/useCategories.js';
import { StockModal } from '../features/inventory/components/StockModal.jsx';

export const InventoryPage = () => {
  const { 
    stockItems, pagination, isLoading, 
    fetchStock, addStockItem, updateStockItem, deleteStockItem 
  } = useInventory();
  
  const { categories } = useCategories(); 

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

  useEffect(() => {
    fetchStock(filters);
  }, [filters, fetchStock]);

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
      fetchStock(filters);
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

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage stock, track quantities, and update prices.</p>
        </div>
        <button 
          onClick={openAdd} 
          className="text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <Plus size={18} /> Add New Item
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" placeholder="Search Name/SKU..." 
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-transparent text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none placeholder:text-muted-foreground"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <select 
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg appearance-none bg-card text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
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
            <input type="date" className="w-full px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground bg-transparent"
                value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
            <input type="date" className="w-full px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground bg-transparent"
                value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                 <tr><td colSpan="6" className="p-8 text-center text-muted-foreground"><Loader className="animate-spin inline mr-2"/> Loading...</td></tr>
              ) : stockItems.length === 0 ? (
                 <tr><td colSpan="6" className="p-8 text-center text-muted-foreground">No items found.</td></tr>
              ) : (
                stockItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{item.stock_name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.sku_code}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                       {item.category_name || categories.find(c => c.id === item.category_id)?.category_name || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        Number(item.quantity_available) === 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                      }`}>
                        {item.quantity_available} {item.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">${item.buy_price}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(item)} className="p-1 rounded hover:bg-muted transition-colors" style={{ color: 'var(--primary-color)' }}><Edit2 size={16}/></button>
                          <button onClick={() => handleDelete(item.id)} className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"><Trash2 size={16}/></button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/50">
            <span className="text-sm text-muted-foreground">Page {pagination.currentPage}</span>
            <div className="flex gap-2">
              <button 
                disabled={filters.page <= 1}
                onClick={() => setFilters({...filters, page: filters.page - 1})}
                className="p-2 border border-border rounded-lg hover:bg-muted text-foreground disabled:opacity-50 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                disabled={stockItems.length < filters.limit}
                onClick={() => setFilters({...filters, page: filters.page + 1})}
                className="p-2 border border-border rounded-lg hover:bg-muted text-foreground disabled:opacity-50 transition-colors"
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
        categories={categories}
      />
    </div>
  );
};