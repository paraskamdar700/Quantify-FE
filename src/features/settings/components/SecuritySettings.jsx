import React, { useState } from 'react';
import { Lock, Save, Loader } from 'lucide-react';

export const SecuritySettings = ({ changePassword, isUpdating }) => {
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

  const handleChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) return alert("Password must be at least 6 characters");
    changePassword(passwords, {
        onSuccess: () => {
            alert("Password Changed Successfully");
            setPasswords({ currentPassword: '', newPassword: '' });
        },
        onError: (err) => alert(err.response?.data?.message || "Failed")
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Lock size={20} className="text-[var(--primary-color)]" /> Security
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input 
            type="password" 
            name="currentPassword" 
            value={passwords.currentPassword}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input 
            type="password" 
            name="newPassword" 
            value={passwords.newPassword}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
          />
        </div>
        <div className="flex justify-end pt-2">
          <button 
            type="submit"
            disabled={isUpdating}
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {isUpdating ? <Loader size={18} className="animate-spin" /> : <Save size={18} />} Update Password
          </button>
        </div>
      </form>
    </div>
  );
};