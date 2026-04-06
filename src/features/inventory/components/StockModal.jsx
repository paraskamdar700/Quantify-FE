import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const StockModal = ({ isOpen, onClose, onSubmit, initialData, categories = [] }) => {
  const [formData, setFormData] = useState({
    stock_name: "",
    sku_code: "",
    unit: "",
    quantity_available: "",
    buy_price: "",
    weight_per_unit: "",
    weight_unit: "kg",
    low_unit_threshold: "",
    category_id: ""
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          stock_name: initialData.stock_name,
          sku_code: initialData.sku_code,
          unit: initialData.unit,
          quantity_available: initialData.quantity_available,
          buy_price: initialData.buy_price,
          weight_per_unit: initialData.weight_per_unit || "",
          weight_unit: initialData.weight_unit || "kg",
          low_unit_threshold: initialData.low_unit_threshold || "",
          category_id: initialData.category_id || ""
        });
      } else {
        // Reset for Add Mode
        setFormData({
          stock_name: "", sku_code: "", unit: "", quantity_available: "",
          buy_price: "", weight_per_unit: "", weight_unit: "kg",
          low_unit_threshold: "", category_id: ""
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">{initialData ? "Edit Item" : "Add New Item"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
            <input name="stock_name" value={formData.stock_name} onChange={handleChange} required 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code *</label>
            <input name="sku_code" value={formData.sku_code} onChange={handleChange} required 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} required 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none bg-white">
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
            <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} required 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit (e.g. pcs) *</label>
            <input name="unit" value={formData.unit} onChange={handleChange} required 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price *</label>
            <input type="number" name="buy_price" value={formData.buy_price} onChange={handleChange} required 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Alert</label>
            <input type="number" name="low_unit_threshold" value={formData.low_unit_threshold} onChange={handleChange} 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight per Unit</label>
            <input type="number" name="weight_per_unit" value={formData.weight_per_unit} onChange={handleChange} 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight Unit</label>
            <select name="weight_unit" value={formData.weight_unit} onChange={handleChange} 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-slate-900/10 outline-none bg-white">
              <option value="kg">KG</option>
              <option value="g">G</option>
              <option value="lb">LB</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};