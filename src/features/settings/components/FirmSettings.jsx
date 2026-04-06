import React, { useState, useEffect } from 'react';
import { Building2, Save, Loader } from 'lucide-react';

export const FirmSettings = ({ data, updateFirm, isUpdating }) => {
  const [formData, setFormData] = useState({
    firm_name: '',
    gst_no: '',
    firm_city: '',
    firm_street: ''
  });

  useEffect(() => {
    if (data) {
      setFormData({
        firm_name: data.firm_name || '',
        gst_no: data.gst_no || '',
        firm_city: data.firm_city || '',
        firm_street: data.firm_street || ''
      });
    }
  }, [data]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Building2 size={20} className="text-[var(--primary-color)]" /> Firm Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Firm Name</label>
          <input 
            type="text" 
            name="firm_name" 
            value={formData.firm_name} 
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GST Number</label>
          <input 
            type="text" 
            name="gst_no" 
            value={formData.gst_no} 
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input 
            type="text" 
            name="firm_city" 
            value={formData.firm_city} 
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <input 
            type="text" 
            name="firm_street" 
            value={formData.firm_street} 
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end mt-2">
          <button 
            onClick={() => updateFirm(formData)}
            disabled={isUpdating}
            className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-70"
          >
             {isUpdating ? <Loader size={18} className="animate-spin" /> : <Save size={18} />} Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};