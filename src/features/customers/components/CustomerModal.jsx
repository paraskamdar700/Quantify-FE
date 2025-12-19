import React, { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';

export const CustomerModal = ({ isOpen, onClose, onSubmit, initialData, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    firm_name: "",
    contact_no: "",
    gst_no: "",
    city: "",
    street: ""
  });

  // Populate form for Edit Mode
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          fullname: initialData.fullname || "",
          firm_name: initialData.firm_name || "",
          contact_no: initialData.contact_no || "",
          gst_no: initialData.gst_no || "",
          city: initialData.city || "",
          street: initialData.street || ""
        });
      } else {
        // Reset for Add Mode
        setFormData({ fullname: "", firm_name: "", contact_no: "", gst_no: "", city: "", street: "" });
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {initialData ? "Edit Customer" : "Add New Customer"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Full Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
            <input 
              name="fullname" 
              value={formData.fullname} 
              onChange={handleChange} 
              required 
              placeholder="e.g. John Doe"
              className="w-full border dark:border-gray-600 rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all" 
            />
          </div>

          {/* Firm Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Firm Name *</label>
            <input 
              name="firm_name" 
              value={formData.firm_name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. Doe Trading Co"
              className="w-full border dark:border-gray-600 rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all" 
            />
          </div>

          {/* Contact No */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact No</label>
            <input 
              name="contact_no" 
              value={formData.contact_no} 
              onChange={handleChange} 
              placeholder="9876543210"
              className="w-full border dark:border-gray-600 rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all" 
            />
          </div>

          {/* GST No */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GST No</label>
            <input 
              name="gst_no" 
              value={formData.gst_no} 
              onChange={handleChange} 
              placeholder="29ABCDE1234F1Z5"
              className="w-full border dark:border-gray-600 rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all" 
            />
          </div>

          {/* Address Section */}
          <div className="col-span-2 mt-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Address Details</h4>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
            <input 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              placeholder="e.g. Mumbai"
              className="w-full border dark:border-gray-600 rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all" 
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street</label>
            <input 
              name="street" 
              value={formData.street} 
              onChange={handleChange} 
              placeholder="e.g. Main Road, Sector 5"
              className="w-full border dark:border-gray-600 rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all" 
            />
          </div>

          {/* Footer Actions */}
          <div className="col-span-2 flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};