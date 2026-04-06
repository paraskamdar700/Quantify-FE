import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../features/auth/api/authApi.js';
import { Zap, ArrowRight, Eye, EyeOff, Mail, Lock, User, Phone, Building2, MapPin, FileText, Upload, Image } from 'lucide-react';

/* ──────────────────────────────────────────────
   REUSABLE INPUT COMPONENT (same style as login)
   ────────────────────────────────────────────── */
const FormInput = ({ label, name, type = 'text', icon: Icon, placeholder, value, onChange, required = false, showPasswordToggle = false, showPassword, onTogglePassword }) => (
  <div>
    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
      )}
      <input
        name={name}
        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} ${showPasswordToggle ? 'pr-12' : 'pr-4'} py-3.5 bg-white border border-gray-200 rounded-2xl text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FE4D27]/20 focus:border-[#FE4D27] transition-all text-sm`}
        value={value}
        onChange={onChange}
        required={required}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

export const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: Firm, 2: Owner

  // Unified State for both Firm and User
  const [formData, setFormData] = useState({
    // Firm
    firmName: '', gstNo: '', city: '', street: '',
    // User
    fullName: '', email: '', password: '', contactNo: '', bio: '',
    // File
    avatar: null
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, avatar: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.register(formData);

      if (response.success) {
        alert("Registration Successful! Please Login.");
        navigate('/login');
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F5F5F0] overflow-hidden">

      {/* ═══════════════════════════════════════
          LEFT SIDE — Form
          ═══════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 md:px-16 lg:px-20 xl:px-28 py-12 relative overflow-y-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mb-12 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#FE4D27] flex items-center justify-center shadow-lg shadow-[#FE4D27]/20 group-hover:scale-110 transition-transform">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-[#1A1A1A] font-bold text-xl tracking-tight">Quantify</span>
        </Link>

        {/* Heading */}
        <div className="mb-8 shrink-0">
          <h1 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold leading-[1] tracking-[-0.03em] text-[#1A1A1A]">
            Get Access
            <span className="inline-block w-3 h-3 rounded-full bg-[#FE4D27] ml-3 mb-1 animate-pulse" />
          </h1>
          <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-sm">
            Create your account and dive into data-driven insights.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8 shrink-0">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              step === 1
                ? 'bg-[#1A1A1A] text-white shadow-lg'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Building2 size={14} />
            Firm Details
          </button>
          <div className="w-6 h-px bg-gray-300" />
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              step === 2
                ? 'bg-[#1A1A1A] text-white shadow-lg'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <User size={14} />
            Owner Details
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm flex items-center gap-2 animate-fadeIn shrink-0">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">!</span>
            </div>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-lg flex-1">
          
          {/* STEP 1: FIRM DETAILS */}
          <div className={`space-y-5 ${step === 1 ? 'block animate-fadeIn' : 'hidden'}`}>
            <FormInput
              label="Firm Name"
              name="firmName"
              icon={Building2}
              placeholder="Evergreen Mart"
              value={formData.firmName}
              onChange={handleChange}
              required
            />
            <FormInput
              label="GST No"
              name="gstNo"
              icon={FileText}
              placeholder="09CC888..."
              value={formData.gstNo}
              onChange={handleChange}
              required
            />
            <FormInput
              label="City"
              name="city"
              icon={MapPin}
              placeholder="Lucknow"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Street / Address"
              name="street"
              icon={MapPin}
              placeholder="Hazratganj"
              value={formData.street}
              onChange={handleChange}
              required
            />

            {/* Next Step Button */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="group w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#2A2A2A] transition-all active:scale-[0.98] shadow-lg shadow-black/10 mt-4"
            >
              Continue to Owner Details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* STEP 2: OWNER DETAILS */}
          <div className={`space-y-5 ${step === 2 ? 'block animate-fadeIn' : 'hidden'}`}>
            <FormInput
              label="Full Name"
              name="fullName"
              icon={User}
              placeholder="Anjali Verma"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Contact No"
              name="contactNo"
              icon={Phone}
              placeholder="9021..."
              type="tel"
              value={formData.contactNo}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              name="email"
              icon={Mail}
              placeholder="user@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Password"
              name="password"
              icon={Lock}
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Bio</label>
              <textarea
                name="bio"
                rows="2"
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FE4D27]/20 focus:border-[#FE4D27] transition-all text-sm resize-none"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Profile Picture</label>
              <label className="flex items-center gap-4 px-4 py-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-[#FE4D27]/40 hover:bg-[#FE4D27]/[0.02] transition-all group">
                {avatarPreview ? (
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#FE4D27]/10 transition-colors">
                    <Image size={20} className="text-gray-400 group-hover:text-[#FE4D27] transition-colors" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    {formData.avatar ? formData.avatar.name : 'Upload your photo'}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                </div>
                <Upload size={16} className="text-gray-400 shrink-0" />
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3.5 border border-gray-200 text-gray-600 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                Back
              </button>
              <button
                id="signup-submit"
                disabled={loading}
                type="submit"
                className="group flex-1 flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#2A2A2A] transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-black/10"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Registering...
                  </div>
                ) : (
                  <>
                    Register Firm & Owner
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Footer link */}
        <p className="mt-8 text-sm text-gray-500 shrink-0">
          Already have an account?{' '}
          <Link to="/login" className="text-[#FE4D27] font-semibold hover:underline">
            Sign in
          </Link>
        </p>

        {/* Bottom decorative */}
        <div className="mt-8 flex items-center gap-4 text-xs text-gray-400 shrink-0 pb-4">
          <span>© 2026 Quantify</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>Privacy</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>Terms</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RIGHT SIDE — Dashboard Preview
          ═══════════════════════════════════════ */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[#EDEDEA] overflow-hidden">

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FE4D27]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFC021]/5 rounded-full blur-3xl" />

        {/* Floating accent circles */}
        <div className="absolute top-16 left-16 animate-float">
          <div className="w-12 h-12 rounded-full bg-[#FE4D27] flex items-center justify-center shadow-lg shadow-[#FE4D27]/30">
            <User size={18} className="text-white" />
          </div>
        </div>
        <div className="absolute top-20 left-36 animate-floatDelay">
          <div className="w-14 h-14 rounded-full bg-[#FFC021] flex items-center justify-center shadow-lg shadow-[#FFC021]/30">
            <Mail size={20} className="text-[#1A1A1A]" />
          </div>
        </div>

        {/* Close button */}
        <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center cursor-pointer hover:bg-[#2A2A2A] transition-colors">
          <Link to="/" className="text-white text-lg font-light">×</Link>
        </div>

        {/* Dashboard Preview Image */}
        <div className="relative px-12 w-full max-w-[600px]">
          <div className="relative">
            {/* Device frame */}
            <div className="bg-[#1A1A1A] rounded-[20px] p-2.5 shadow-2xl shadow-black/20 transform hover:scale-[1.02] transition-transform duration-700">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FE4D27]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFC021]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white/10 rounded-lg h-5 mx-8 flex items-center px-3">
                  <span className="text-[10px] text-gray-500">quantify.app/dashboard</span>
                </div>
              </div>
              {/* Screenshot */}
              <div className="rounded-[12px] overflow-hidden">
                <img
                  src="/dashboard-preview.png"
                  alt="Quantify Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl shadow-black/10 p-4 px-5 flex items-center gap-3 animate-floatDelay">
              <div className="w-10 h-10 rounded-xl bg-[#FFC021]/10 flex items-center justify-center">
                <Building2 size={18} className="text-[#FFC021]" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Active Firms</p>
                <p className="text-base font-bold text-[#1A1A1A]">500+</p>
              </div>
            </div>

            {/* Floating tag */}
            <div className="absolute -top-4 -right-4 bg-[#FE4D27] rounded-full px-4 py-2 shadow-lg shadow-[#FE4D27]/20 animate-float">
              <span className="text-xs font-bold text-white">Join Today 🚀</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};