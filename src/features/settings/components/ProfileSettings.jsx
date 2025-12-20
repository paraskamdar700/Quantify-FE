import React, { useState, useEffect } from 'react';
import { User, Camera, Save, Loader } from 'lucide-react';

export const ProfileSettings = ({ data, updateProfile, updateAvatar, isUpdating }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact_no: '',
    bio: ''
  });

  useEffect(() => {
    if (data?.user) {
      setFormData({
        fullname: data.user.fullname || '',
        email: data.user.email || '',
        contact_no: data.user.contact_no || '',
        bio: data.user.bio || ''
      });
    }
  }, [data]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const form = new FormData();
      form.append('avatar', file);
      updateAvatar(form);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <User size={20} className="text-[var(--primary-color)]" /> User Profile
      </h3>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-100">
              <img 
                src={data?.user?.avatar || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
              <Camera size={24} />
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </label>
          </div>
          <span className="text-xs text-gray-500">Click to upload</span>
        </div>

        {/* Form Section */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              name="fullname" 
              value={formData.fullname} 
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact No</label>
            <input 
              type="text" 
              name="contact_no" 
              value={formData.contact_no} 
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none" 
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea 
              name="bio" 
              rows="3" 
              value={formData.bio} 
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none resize-none"
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button 
              onClick={() => updateProfile(formData)}
              disabled={isUpdating}
              className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-70"
            >
              {isUpdating ? <Loader size={18} className="animate-spin" /> : <Save size={18} />} Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};