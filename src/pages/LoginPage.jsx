import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../features/auth/api/authApi.js';
import { loginSuccess } from '../features/auth/slices/authSlice';
import { Zap, ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });

      if (response.success) {
        console.log("Login Response:", response);

        const payload = {
          user: response.data.user,
          token: response.token || response.data.token || "temp-token-if-missing"
        };

        dispatch(loginSuccess(payload));
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F5F5F0] overflow-hidden">

      {/* ═══════════════════════════════════════
          LEFT SIDE — Form
          ═══════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-12 relative">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mb-16 group">
          <div className="w-9 h-9 rounded-xl bg-[#FE4D27] flex items-center justify-center shadow-lg shadow-[#FE4D27]/20 group-hover:scale-110 transition-transform">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-[#1A1A1A] font-bold text-xl tracking-tight">Quantify</span>
        </Link>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] text-[#1A1A1A]">
            Welcome
            <br />
            Back
            <span className="inline-block w-3 h-3 rounded-full bg-[#FE4D27] ml-3 mb-1 animate-pulse" />
          </h1>
          <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-sm">
            Sign in to your account and get back to managing your business insights.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm flex items-center gap-2 animate-fadeIn">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">!</span>
            </div>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 max-w-md">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                id="login-email"
                type="email"
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FE4D27]/20 focus:border-[#FE4D27] transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FE4D27]/20 focus:border-[#FE4D27] transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="login-submit"
            disabled={loading}
            type="submit"
            className="group w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#2A2A2A] transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-black/10"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </div>
            ) : (
              <>
                Sign In
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-8 text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-[#FE4D27] font-semibold hover:underline">
            Register Business
          </Link>
        </p>

        {/* Bottom decorative */}
        <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 xl:left-28 flex items-center gap-4 text-xs text-gray-400">
          <span>&copy; 2026 Quantify</span>
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

        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FE4D27]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFC021]/5 rounded-full blur-3xl" />

        {/* Floating accent circles */}
        <div className="absolute top-16 left-16 animate-float">
          <div className="w-12 h-12 rounded-full bg-[#FE4D27] flex items-center justify-center shadow-lg shadow-[#FE4D27]/30">
            <Mail size={18} className="text-white" />
          </div>
        </div>
        <div className="absolute top-20 left-36 animate-floatDelay">
          <div className="w-14 h-14 rounded-full bg-[#FFC021] flex items-center justify-center shadow-lg shadow-[#FFC021]/30">
            <Lock size={20} className="text-[#1A1A1A]" />
          </div>
        </div>

        {/* Close / Back button */}
        <Link to="/" className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center cursor-pointer hover:bg-[#2A2A2A] transition-colors text-white text-lg font-light">
          &times;
        </Link>

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
              <div className="w-10 h-10 rounded-xl bg-[#FE4D27]/10 flex items-center justify-center">
                <Zap size={18} className="text-[#FE4D27]" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Revenue Growth</p>
                <p className="text-base font-bold text-[#1A1A1A]">+58%</p>
              </div>
            </div>

            {/* Floating tag */}
            <div className="absolute -top-4 -right-4 bg-[#FFC021] rounded-full px-4 py-2 shadow-lg shadow-[#FFC021]/20 animate-float">
              <span className="text-xs font-bold text-[#1A1A1A]">Live Data ⚡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};