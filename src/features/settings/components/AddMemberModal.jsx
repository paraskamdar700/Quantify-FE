import React, { useState } from 'react';
import { X, Save, Loader } from 'lucide-react';

export const AddMemberModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    contact_no: '',
    role: 'STAFF'
  });

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, {
        onSuccess: () => {
            onClose();
            setFormData({ fullname: '', email: '', password: '', contact_no: '', role: 'STAFF' });
        },
        onError: (err) => alert(err.response?.data?.message || "Failed")
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold">Add Team Member</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input 
            name="fullname" 
            placeholder="Full Name" 
            required
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" 
          />
           <input 
            name="email" 
            type="email"
            placeholder="Email Address" 
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" 
          />
           <input 
            name="contact_no" 
            placeholder="Contact Number" 
            required
            value={formData.contact_no}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" 
          />
           <input 
            name="password" 
            type="password"
            placeholder="Initial Password" 
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" 
          />
          <select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"
          >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
                {isSubmitting ? <Loader size={16} className="animate-spin" /> : <Save size={16} />} Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};