import React, { useState } from 'react';
import { useCategories } from '../features/inventory/hooks/useCategories.js';
import { CategoryModal } from '../features/inventory/components/categoryModal.jsx';
import { Plus, Edit2, Trash2, Loader, AlertCircle } from 'lucide-react';

const CategoryManagement = () => {
  const { 
    categories, 
    isLoading, 
    error, 
    addCategory, 
    editCategory, 
    removeCategory 
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This might affect products using this category.")) {
      const result = await removeCategory(id);
      if (!result.success) alert(result.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    let result;
    if (editingCategory) {
      result = await editCategory(editingCategory.id, formData);
    } else {
      result = await addCategory(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage product categories.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-2">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Content Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Created By</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
               <tr><td colSpan="4" className="p-8 text-center text-gray-500 flex justify-center items-center gap-2"><Loader className="animate-spin" size={18}/> Loading...</td></tr>
            ) : categories.length === 0 ? (
               <tr><td colSpan="4" className="p-8 text-center text-gray-500">No categories found. Add one to get started.</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{cat.category_name}</td>
                  <td className="px-6 py-4 text-gray-500">{cat.description || '-'}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs font-mono">
                    {cat.created_by_name || 'System'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenEdit(cat)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors">
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

      {/* Modal Injection */}
      <CategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCategory}
      />
    </div>
  );
};

export default CategoryManagement;