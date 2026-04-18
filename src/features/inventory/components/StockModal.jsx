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

  const inputClass = "w-full border border-border rounded-lg p-2 bg-card text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none placeholder:text-muted-foreground";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-border">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted">
          <h3 className="text-lg font-bold text-foreground">{initialData ? "Edit Item" : "Add New Item"}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-muted-foreground mb-1">Item Name *</label>
            <input name="stock_name" value={formData.stock_name} onChange={handleChange} required 
              className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">SKU Code *</label>
            <input name="sku_code" value={formData.sku_code} onChange={handleChange} required 
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Category *</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} required 
              className={inputClass}>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Quantity *</label>
            <input type="number" name="quantity_available" value={formData.quantity_available} onChange={handleChange} required 
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Unit (e.g. pcs) *</label>
            <input name="unit" value={formData.unit} onChange={handleChange} required 
              className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Buy Price *</label>
            <input type="number" name="buy_price" value={formData.buy_price} onChange={handleChange} required 
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Low Stock Alert</label>
            <input type="number" name="low_unit_threshold" value={formData.low_unit_threshold} onChange={handleChange} 
              className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Weight per Unit</label>
            <input type="number" name="weight_per_unit" value={formData.weight_per_unit} onChange={handleChange} 
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Weight Unit</label>
            <select name="weight_unit" value={formData.weight_unit} onChange={handleChange} 
              className={inputClass}>
              <option value="kg">KG</option>
              <option value="g">G</option>
              <option value="lb">LB</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: 'var(--primary-color)' }}>
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};