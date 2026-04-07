import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../features/auth/api/authApi.js';
import { Upload } from 'lucide-react';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Unified State for both Firm and User
  const [formData, setFormData] = useState({
    // Firm
    firmName: '', gstNo: '', city: '', street: '',
    // User
    fullName: '', email: '', password: '', contactNo: '', bio: '',
    // File
    avatar: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    // Store the actual file object
    setFormData(prev => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the API
      const response = await authApi.register(formData);
      
      if (response.success) {
        alert("Registration Successful! Please Login.");
        navigate('/login'); // Redirect to login since we don't have a token yet
      }
    } catch (err) {
      console.error("Signup Error:", err);
      // Try to get the error message from backend or fallback
      setError(err.response?.data?.message || "Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Register your Firm and Owner account</p>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: FIRM DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 border-b pb-1">Firm Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="firmName" label="Firm Name" placeholder="Evergreen Mart" onChange={handleChange} required />
              <Input name="gstNo" label="GST No" placeholder="09CC888..." onChange={handleChange} required />
              <Input name="city" label="City" placeholder="Lucknow" onChange={handleChange} required />
              <Input name="street" label="Street / Address" placeholder="Hazratganj" onChange={handleChange} required />
            </div>
          </div>

          {/* SECTION 2: OWNER DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 border-b pb-1">Owner Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="fullName" label="Full Name" placeholder="Anjali Verma" onChange={handleChange} required />
              <Input name="contactNo" label="Contact No" placeholder="9021..." type="tel" onChange={handleChange} required />
              <Input name="email" label="Email" placeholder="user@example.com" type="email" onChange={handleChange} required />
              <Input name="password" label="Password" placeholder="******" type="password" onChange={handleChange} required />
            </div>
            
            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea name="bio" rows="2" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange}></textarea>
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture (Avatar)</label>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center gap-4 bg-gray-50">
                <Upload size={20} className="text-gray-400" />
                <input type="file" name="avatar" onChange={handleFileChange} accept="image/*" />
              </div>
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-300">
            {loading ? 'Registering...' : 'Register Firm & Owner'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

// Simple reusable input helper for this page
const Input = ({ label, name, type="text", ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input name={name} type={type} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" {...props} />
  </div>
);