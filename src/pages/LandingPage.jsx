import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Package, Shield } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">Quantify</div>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">Log in</Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Turn Inventory Chaos into <br />
          <span className="text-blue-600">Business Growth</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Quantify gives B2B distributors a single source of truth for orders, inventory, and fulfillment. Stop guessing, start scaling.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Package size={32} className="text-blue-600" />}
            title="Smart Inventory"
            desc="Real-time stock tracking with automated low-stock alerts and historical trends."
          />
          <FeatureCard 
            icon={<BarChart2 size={32} className="text-blue-600" />}
            title="Actionable Reports"
            desc="Visualize sales data, fulfillment speeds, and customer retention metrics instantly."
          />
          <FeatureCard 
            icon={<Shield size={32} className="text-blue-600" />}
            title="Team Controls"
            desc="Granular permissions for Admins, Managers, and Viewers to keep data secure."
          />
        </div>
      </section>
    </div>
  );
};

// Helper Component for Features
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);