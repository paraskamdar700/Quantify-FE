import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const CategoryModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.category_name || "",
          description: initialData.description || ""
        });
      } else {
        setFormData({ name: "", description: "" });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "w-full border border-border rounded-lg p-2 bg-card text-foreground focus:ring-2 focus:ring-[var(--primary-color)] outline-none placeholder:text-muted-foreground";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-border">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted">
          <h3 className="font-bold text-foreground">
            {initialData ? "Edit Category" : "Add New Category"}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Category Name *</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={inputClass}
              placeholder="e.g. Electronics"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
            <textarea 
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={inputClass + " resize-none"}
              placeholder="Optional description..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: 'var(--primary-color)' }}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};