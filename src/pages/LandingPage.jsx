import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, Package, ShoppingCart, BarChart3, Users, Bell,
  Zap, TrendingUp, ArrowRight, ChevronRight, ArrowUpRight,
  Shield, Clock, FileText, Layers
} from 'lucide-react';

/* ──────────────────────────────────────────────
   ANIMATED NUMBER COUNTER
   ────────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

/* ──────────────────────────────────────────────
   GRID PATTERN SVG (for card backgrounds)
   ────────────────────────────────────────────── */
const GridPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

/* ──────────────────────────────────────────────
   MAIN LANDING PAGE
   ────────────────────────────────────────────── */
export const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1A1A1A] overflow-x-hidden">

      {/* ═══════════════════════════════════════
          FLOATING NAVBAR
          ═══════════════════════════════════════ */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'top-3' : 'top-5'
        }`}
      >
        <div
          className={`flex items-center gap-1 bg-[#1A1A1A]/95 backdrop-blur-xl rounded-full px-3 py-2 shadow-2xl shadow-black/20 transition-all duration-500 ${
            scrolled ? 'px-4' : 'px-3'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-3 py-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#FE4D27] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Quantify</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            <a href="#features" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10">
              Key Features
            </a>
            <a href="#product" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10">
              Explore
            </a>
            <a href="#insights" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10">
              Solutions
            </a>
            <a href="#footer" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10">
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] bg-white rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white ml-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#1A1A1A]/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl animate-fadeIn">
            <div className="flex flex-col gap-3">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-2 transition-colors">Key Features</a>
              <a href="#product" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-2 transition-colors">Explore</a>
              <a href="#insights" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-2 transition-colors">Solutions</a>
              <a href="#footer" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-2 transition-colors">Contact</a>
              <hr className="border-gray-700" />
              <Link to="/login" className="text-gray-300 hover:text-white py-2 transition-colors">Log In</Link>
              <Link to="/signup" className="text-center py-3 bg-white text-[#1A1A1A] rounded-full font-semibold hover:bg-gray-100 transition-colors">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20 min-h-[90vh] flex flex-col justify-center">
        {/* Decorative Elements */}
        <div className="absolute top-40 left-16 hidden lg:block animate-float">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <Zap size={22} className="text-[#FE4D27]" />
          </div>
        </div>
        <div className="absolute top-36 left-36 hidden lg:block animate-floatDelay">
          <div className="w-16 h-16 rounded-full bg-[#FE4D27] flex items-center justify-center shadow-lg shadow-[#FE4D27]/30">
            <TrendingUp size={24} className="text-white" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-[1400px] mx-auto w-full">
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            <span className="text-[#1A1A1A]">Inventory</span>
            <br />
            <span className="text-[#1A1A1A]">that </span>
            <span className="text-[#C8C8C0]">helps </span>
            <span className="text-[#1A1A1A]">you</span>
            <br className="hidden md:block" />
            {/* Dashboard Preview Card — floats in the hero */}
            <span className="inline-flex items-center gap-4">
              <span className="text-[#C8C8C0]">shape </span>
              <span className="hidden lg:inline-flex w-16 h-16 rounded-full bg-[#FFC021] items-center justify-center shadow-lg shadow-[#FFC021]/30 -mt-2">
                <BarChart3 size={28} className="text-[#1A1A1A]" />
              </span>
              <span className="text-[#1A1A1A]"> the future</span>
            </span>
          </h1>

          {/* Floating Dashboard Card */}
          <div className="hidden lg:block absolute top-32 right-12 xl:right-20 w-[380px]">
            <div className="relative bg-white rounded-[28px] shadow-2xl shadow-black/10 p-5 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
              <GridPattern />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue Overview</span>
                  <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-semibold">+58%</span>
                </div>
                <div className="text-3xl font-bold text-[#1A1A1A] mb-4">₹12,45,000</div>
                {/* Mini Bar Chart */}
                <div className="flex items-end gap-1.5 h-20">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md transition-all duration-500 hover:opacity-80"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i >= 10 ? '#FE4D27' : i >= 8 ? '#FFC021' : '#E5E5E0',
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                  <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                </div>
              </div>
            </div>

            {/* Small floating stat */}
            <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 px-4 flex items-center gap-3 animate-floatDelay">
              <div className="w-9 h-9 rounded-full bg-[#FE4D27]/10 flex items-center justify-center">
                <TrendingUp size={16} className="text-[#FE4D27]" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">This Month</p>
                <p className="text-sm font-bold text-[#1A1A1A]">+₹2.4L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-hero section */}
        <div className="max-w-[1400px] mx-auto w-full mt-16 lg:mt-24">
          <div className="bg-[#EDEDEA] rounded-[32px] p-8 md:p-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
                  Your key to strategic success through real-time business insights
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-gray-500 leading-relaxed">
                  Ready for instantaneous, all-accessible insights into your inventory, sales, and customer analytics? Quantify puts the power of data in your hands.
                </p>
              </div>
            </div>

            {/* Sub-hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              {/* Card 1: Dashboard Preview */}
              <div className="relative bg-white rounded-[24px] p-6 overflow-hidden group hover:shadow-lg transition-all duration-500">
                <GridPattern />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1.5 bg-[#F5F5F0] rounded-full text-xs font-semibold text-gray-600">Setting up reports</span>
                    <span className="text-xs text-gray-400">Sales statistic</span>
                  </div>
                  <div className="flex items-end gap-2 h-28">
                    {[30, 50, 35, 70, 45, 85, 55, 75, 40, 90, 60, 80].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1">
                        <div
                          className="w-full rounded-t-sm bg-[#FE4D27] transition-all duration-700 group-hover:bg-[#FE4D27]"
                          style={{ height: `${h * 0.6}%`, opacity: 0.3 + (i * 0.05) }}
                        />
                        <div
                          className="w-full rounded-t-sm bg-[#FFC021]"
                          style={{ height: `${h * 0.4}%`, opacity: 0.4 + (i * 0.04) }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Total Orders</p>
                      <p className="text-lg font-bold">1,247</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Revenue</p>
                      <p className="text-lg font-bold">₹8.2L</p>
                    </div>
                    <div className="px-3 py-1.5 bg-green-50 rounded-full">
                      <span className="text-xs font-semibold text-green-600">↑ 24%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Dark Analytics */}
              <div className="relative bg-[#1A1A1A] rounded-[24px] p-6 overflow-hidden group hover:shadow-lg transition-all duration-500">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Package size={14} className="text-white" />
                      </div>
                      <span className="text-xs text-gray-400">Transactions</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Monthly Volume</p>
                    <p className="text-4xl font-bold text-white mt-1">₹24.5L</p>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <div className="flex-1 bg-white/5 rounded-2xl p-4">
                      <p className="text-gray-500 text-[11px]">Active Customers</p>
                      <p className="text-white font-bold text-lg mt-1">342</p>
                      <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                        <div className="bg-[#FFC021] h-1 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-2xl p-4">
                      <p className="text-gray-500 text-[11px]">Pending Orders</p>
                      <p className="text-white font-bold text-lg mt-1">18</p>
                      <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                        <div className="bg-[#FE4D27] h-1 rounded-full" style={{ width: '22%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MAXIMIZE EFFICIENCY SECTION
          ═══════════════════════════════════════ */}
      <section id="features" className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative">
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              <span className="text-[#1A1A1A]">Maximize </span>
              <span className="text-[#C8C8C0]">efficiency</span>
              <br />
              <span className="text-[#1A1A1A]">with our </span>
              <span className="text-[#C8C8C0] italic">intuitive</span>
              <br />
              {/* Floating Stats */}
              <span className="inline-flex items-center gap-4 flex-wrap">
                <span className="hidden lg:inline-flex items-center gap-3">
                  <span className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <TrendingUp className="text-[#FE4D27]" size={24} />
                  </span>
                  <span className="w-20 h-20 rounded-full bg-[#FFC021] flex flex-col items-center justify-center shadow-lg shadow-[#FFC021]/20">
                    <span className="text-[#1A1A1A] font-bold text-lg leading-none">+30%</span>
                    <span className="text-[#1A1A1A]/60 text-[8px] font-medium mt-0.5 text-center leading-tight">Speed up your<br/>productivity</span>
                  </span>
                </span>
                <span className="text-[#1A1A1A]">inventory </span>
                <span className="hidden lg:inline-block">
                  <span className="px-8 py-4 bg-[#FFC021] rounded-full text-[clamp(2rem,4vw,4rem)] text-[#1A1A1A] font-bold shadow-lg shadow-[#FFC021]/20">
                    service
                  </span>
                </span>
              </span>
            </h2>
          </div>

          {/* Divider + CTA */}
          <div className="mt-16 pt-8 border-t border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-gray-500 max-w-lg leading-relaxed">
                Track stock levels, automate low-stock alerts, manage customer orders, and generate purchase analytics — all from a single, powerful dashboard. Your business doesn't just adapt — it evolves.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="px-7 py-3.5 bg-[#FE4D27] text-white text-sm font-semibold rounded-full hover:bg-[#e5431f] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#FE4D27]/20"
                >
                  Start for free
                </Link>
                <button className="px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] border border-gray-300 rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
                  Request a demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BRAND SPLASH SECTION (Full-width accent)
          ═══════════════════════════════════════ */}
      <section className="mx-4 md:mx-8 lg:mx-12 my-8">
        <div className="bg-[#FE4D27] rounded-[40px] py-20 md:py-32 px-8 md:px-16 overflow-hidden relative">
          {/* Decorative line + icons */}
          <div className="flex items-center gap-8 mb-8">
            <span className="text-white/70 text-sm font-medium tracking-wide">Inventory Management</span>
            <div className="flex-1 h-px bg-white/20" />
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Zap size={20} className="text-[#FE4D27]" />
            </div>
            <div className="flex-1 h-px bg-white/20 hidden md:block" />
            <div className="w-12 h-12 rounded-full bg-white hidden md:flex items-center justify-center">
              <TrendingUp size={20} className="text-[#FE4D27]" />
            </div>
            <div className="flex-1 h-px bg-white/20 hidden lg:block" />
          </div>

          {/* Giant Brand Text */}
          <h2 className="text-[clamp(4rem,12vw,12rem)] font-bold text-white leading-[0.85] tracking-[-0.04em]">
            Quantify
            <span className="text-[clamp(1.5rem,3vw,3rem)] align-super ml-2">®</span>
          </h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT DEEP DIVE SECTION
          ═══════════════════════════════════════ */}
      <section id="product" className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Feature Accordion */}
            <div className="space-y-4">
              {[
                {
                  title: 'Real-Time Inventory Tracking',
                  description: 'Monitor stock levels across all products with live updates. Get instant alerts when items fall below reorder thresholds.',
                  icon: Package,
                },
                {
                  title: 'Automated Low-Stock Alerts',
                  description: 'Never miss a stockout. Set custom thresholds and receive notifications when inventory runs low.',
                  icon: Bell,
                },
                {
                  title: 'Customer Purchase Analytics',
                  description: 'Understand buying patterns, identify your top customers, and predict demand with actionable insights.',
                  icon: Users,
                },
                {
                  title: 'Sales & Revenue Reports',
                  description: 'Generate comprehensive reports on sales trends, revenue growth, and product performance with exportable data.',
                  icon: BarChart3,
                },
              ].map((feature, index) => (
                <FeatureAccordionItem
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  isFirst={index === 0}
                />
              ))}
            </div>

            {/* Right: Product Screenshots */}
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-[280px] md:w-[320px]">
                <div className="bg-[#1A1A1A] rounded-[40px] p-3 shadow-2xl shadow-black/30">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1A1A1A] rounded-b-2xl z-10" />
                  <div className="bg-white rounded-[32px] p-5 pt-8 overflow-hidden">
                    {/* Phone Content */}
                    <div className="flex items-center justify-between mb-5">
                      <Menu size={18} className="text-gray-400" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dashboard</span>
                      <Bell size={18} className="text-gray-400" />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">Revenue amount</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-[#1A1A1A]">₹13,42,567</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full font-semibold">+21%</span>
                    </div>
                    {/* Mini chart */}
                    <div className="flex items-end gap-1 h-24 mt-4">
                      {[45, 60, 35, 80, 50, 90, 65, 85, 40, 95, 70, 88].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            backgroundColor: h > 80 ? '#FE4D27' : '#E5E5E0',
                          }}
                        />
                      ))}
                    </div>
                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-4 h-4 rounded-full bg-[#FE4D27]/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FE4D27]" />
                          </div>
                          <span className="text-[9px] text-gray-400">Total profit</span>
                        </div>
                        <p className="text-sm font-bold">₹2,64,200</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-4 h-4 rounded-full bg-[#FFC021]/20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FFC021]" />
                          </div>
                          <span className="text-[9px] text-gray-400">Sales revenue</span>
                        </div>
                        <p className="text-sm font-bold">₹1,32,400</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop preview floating behind */}
              <div className="absolute -top-4 -right-4 w-[55%] hidden lg:block">
                <div className="bg-[#1A1A1A] rounded-[20px] p-2 shadow-xl">
                  <div className="bg-white rounded-[14px] p-4 overflow-hidden relative">
                    <GridPattern />
                    <div className="relative z-10">
                      <div className="flex gap-4 mb-3">
                        {['Dashboard', 'Reports', 'Orders', 'History'].map((tab, i) => (
                          <span
                            key={i}
                            className={`text-[9px] font-medium px-2.5 py-1 rounded-full ${
                              i === 0 ? 'bg-[#1A1A1A] text-white' : 'text-gray-400'
                            }`}
                          >
                            {tab}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <p className="text-[8px] text-gray-400">Profit</p>
                          <p className="text-xs font-bold">₹4.2L</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <p className="text-[8px] text-gray-400">Revenue</p>
                          <p className="text-xs font-bold text-[#FE4D27]">₹13.2L</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <p className="text-[8px] text-gray-400">Avg. Bill</p>
                          <p className="text-xs font-bold">₹1,090</p>
                        </div>
                      </div>
                      {/* Visit stats mini chart */}
                      <div className="mt-3">
                        <p className="text-[8px] text-gray-400 mb-1.5">Visit statistics</p>
                        <div className="h-8 flex items-end gap-0.5">
                          {[20, 35, 25, 50, 40, 60, 45, 55, 30, 65, 50, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-[#FFC021] rounded-t-sm" style={{ height: `${h}%`, opacity: 0.4 + i * 0.05 }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DATA CONTROL SECTION
          ═══════════════════════════════════════ */}
      <section id="insights" className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Giant Headline */}
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-center mb-4">
            <span className="text-[#1A1A1A]">We give you full</span>
            <br />
            <span className="text-[#C8C8C0]">control </span>
            <span className="text-[#1A1A1A]">over your data</span>
          </h2>
          <div className="flex justify-center mb-16">
            <div className="w-3 h-3 rounded-full bg-[#FE4D27]" />
          </div>

          {/* Data Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Inventory Health */}
            <div className="relative bg-white rounded-[28px] p-8 overflow-hidden group hover:shadow-xl transition-all duration-500">
              <GridPattern />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">Inventory Health</h3>
                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 rounded-2xl bg-[#FFC021] flex flex-col items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-[#1A1A1A]">98%</span>
                    <span className="text-[10px] text-[#1A1A1A]/60 font-medium mt-1 text-center">Stock<br/>accuracy</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">In Stock</span>
                        <span className="font-semibold">186 items</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Low Stock</span>
                        <span className="font-semibold text-[#FFC021]">12 items</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-[#FFC021] h-2 rounded-full transition-all duration-1000" style={{ width: '15%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Out of Stock</span>
                        <span className="font-semibold text-[#FE4D27]">3 items</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-[#FE4D27] h-2 rounded-full transition-all duration-1000" style={{ width: '5%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Revenue Reports */}
            <div className="relative bg-white rounded-[28px] p-8 overflow-hidden group hover:shadow-xl transition-all duration-500">
              <GridPattern />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Finance Reports</h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FileText size={14} className="text-gray-400" />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Insights</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Total profit</p>
                  <p className="text-3xl font-bold text-[#1A1A1A]">₹2,64,200</p>
                  {/* Line chart visualization */}
                  <svg className="w-full h-12 mt-3" viewBox="0 0 200 40">
                    <path
                      d="M0,35 Q20,30 40,25 T80,20 T120,15 T160,18 T200,10"
                      fill="none"
                      stroke="#FFC021"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="200" cy="10" r="3" fill="#FFC021" />
                  </svg>
                </div>
                <div className="flex gap-3">
                  <span className="px-3 py-1.5 bg-[#FFC021]/10 text-[#1A1A1A] text-xs font-semibold rounded-full">Data visualization</span>
                  <span className="px-3 py-1.5 bg-[#FE4D27]/10 text-[#FE4D27] text-xs font-semibold rounded-full">Export Reports</span>
                </div>
              </div>
            </div>

            {/* Card 3: Top Customers */}
            <div className="relative bg-white rounded-[28px] p-8 overflow-hidden group hover:shadow-xl transition-all duration-500">
              <GridPattern />
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Top Customers</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Sharma General Store', amount: '₹4,82,000', percent: 90, color: '#FE4D27' },
                    { name: 'Patel Enterprises', amount: '₹3,15,000', percent: 70, color: '#FFC021' },
                    { name: 'Kumar Distributors', amount: '₹2,78,000', percent: 55, color: '#1A1A1A' },
                    { name: 'Singh Retail Hub', amount: '₹1,94,000', percent: 40, color: '#C8C8C0' },
                  ].map((customer, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: customer.color }}
                      >
                        {customer.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium truncate">{customer.name}</span>
                          <span className="text-sm font-bold text-[#1A1A1A] shrink-0 ml-2">{customer.amount}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all duration-1000"
                            style={{ width: `${customer.percent}%`, backgroundColor: customer.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4: Quick Actions */}
            <div className="relative bg-[#1A1A1A] rounded-[28px] p-8 overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Package, label: 'Add Stock', sublabel: 'Update inventory', color: '#FE4D27' },
                    { icon: ShoppingCart, label: 'New Order', sublabel: 'Create sales order', color: '#FFC021' },
                    { icon: Users, label: 'Customers', sublabel: 'Manage directory', color: '#22C55E' },
                    { icon: FileText, label: 'Invoices', sublabel: 'Generate & send', color: '#8B5CF6' },
                  ].map((action, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer group/action">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${action.color}20` }}
                      >
                        <action.icon size={18} style={{ color: action.color }} />
                      </div>
                      <p className="text-white text-sm font-semibold">{action.label}</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">{action.sublabel}</p>
                      <ArrowUpRight size={14} className="text-gray-600 mt-2 group-hover/action:text-white group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BANNER
          ═══════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: 500, suffix: '+', label: 'Active Distributors', color: '#FE4D27' },
              { value: 98, suffix: '%', label: 'Uptime Guaranteed', color: '#FFC021' },
              { value: 2, suffix: 'M+', label: 'Orders Processed', color: '#22C55E' },
              { value: 50, suffix: '%', label: 'Time Saved on Avg.', color: '#8B5CF6' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <p className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <span className="text-[#C8C8C0]">Ready to </span>
            <span className="text-[#1A1A1A]">transform</span>
            <br />
            <span className="text-[#1A1A1A]">your business?</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-relaxed">
            Join hundreds of distributors who trust Quantify to manage their inventory, track orders, and grow their business with data-driven insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/signup"
              className="group px-8 py-4 bg-[#FE4D27] text-white text-base font-semibold rounded-full hover:bg-[#e5431f] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#FE4D27]/20 flex items-center gap-2"
            >
              Get Started with Quantify
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 text-base font-semibold text-[#1A1A1A] border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer id="footer" className="mx-4 md:mx-8 lg:mx-12 mb-4 md:mb-8">
        <div className="bg-[#1A1A1A] rounded-[40px] px-8 md:px-16 py-16 md:py-20">
          {/* Top: Nav + Contact */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="flex flex-wrap gap-8 text-sm text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Key Features</a>
              <a href="#product" className="hover:text-white transition-colors">Explore</a>
              <a href="#insights" className="hover:text-white transition-colors">Solutions</a>
              <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            </div>
            <a
              href="mailto:hello@quantify.app"
              className="text-[clamp(1.5rem,4vw,3.5rem)] font-light text-white/90 hover:text-white transition-colors tracking-tight"
            >
              hello@quantify.app
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-12" />

          {/* Bottom: Info + Brand */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="flex flex-wrap gap-12 text-sm text-gray-500">
              <div>
                <p className="text-white font-medium mb-2">Product</p>
                <p>Features</p>
                <p className="mt-1">Pricing</p>
                <p className="mt-1">Integrations</p>
              </div>
              <div>
                <p className="text-white font-medium mb-2">Legal</p>
                <p>Privacy Policy</p>
                <p className="mt-1">Terms of Service</p>
              </div>
              <div>
                <p className="text-white font-medium mb-2">Support</p>
                <p>Documentation</p>
                <p className="mt-1">Contact Us</p>
              </div>
            </div>
          </div>

          {/* Giant Logo */}
          <div className="mt-16 flex items-end justify-between">
            <h2 className="text-[clamp(3rem,10vw,10rem)] font-bold text-white/10 leading-none tracking-[-0.04em]">
              Quantify<span className="text-[clamp(1rem,2.5vw,2.5rem)] align-super">®</span>
            </h2>
            <p className="text-xs text-gray-600 mb-4 hidden md:block">
              © {new Date().getFullYear()} Quantify, Inc.
            </p>
          </div>
          <p className="text-xs text-gray-600 mt-4 md:hidden">
            © {new Date().getFullYear()} Quantify, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* ──────────────────────────────────────────────
   FEATURE ACCORDION ITEM
   ────────────────────────────────────────────── */
const FeatureAccordionItem = ({ title, description, icon: Icon, isFirst }) => {
  const [isOpen, setIsOpen] = useState(isFirst);

  return (
    <div
      className={`bg-white rounded-[20px] overflow-hidden transition-all duration-500 ${
        isOpen ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            isOpen ? 'bg-[#FE4D27]/10' : 'bg-gray-100'
          }`}>
            <Icon size={18} className={isOpen ? 'text-[#FE4D27]' : 'text-gray-400'} />
          </div>
          <span className="text-lg font-semibold text-[#1A1A1A]">{title}</span>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isOpen ? 'bg-[#FE4D27] rotate-45' : 'bg-gray-100'
        }`}>
          <span className={`text-xl leading-none font-light ${isOpen ? 'text-white' : 'text-gray-400'}`}>+</span>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="px-6 text-gray-500 leading-relaxed text-sm pl-20">
          {description}
        </p>
      </div>
    </div>
  );
};