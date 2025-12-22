import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  RefreshCw, 
  Settings, 
  BarChart2, 
  Warehouse, 
  X 
} from 'lucide-react';

export const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark flex flex-col">
      
      {/* Top Navbar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 md:px-10 py-3 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
          <div className="text-primary w-6 h-6">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">Quantify</h2>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors" href="#features">Features</a>
            <a className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors" href="#pricing">Pricing</a>
            <Link to="/login" className="text-text-light dark:text-text-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors">Log In</Link>
          </div>
          <Link to="/signup">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
              <span className="truncate">Get Started</span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="text-text-light dark:text-text-dark" /> : <Menu className="text-text-light dark:text-text-dark" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background-light dark:bg-background-dark border-b border-border-light p-4 flex flex-col gap-4">
          <a href="#features" className="text-text-light dark:text-text-dark">Features</a>
          <a href="#pricing" className="text-text-light dark:text-text-dark">Pricing</a>
          <Link to="/login" className="text-text-light dark:text-text-dark">Log In</Link>
          <Link to="/signup" className="bg-primary text-white p-2 rounded text-center">Get Started</Link>
        </div>
      )}

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="my-10 px-4 md:px-10 lg:px-20 xl:px-40">
          <div className="p-4">
            <div 
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10 md:px-10" 
              style={{
                backgroundImage: 'linear-gradient(rgba(10, 25, 34, 0.4) 0%, rgba(10, 25, 34, 0.8) 100%), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
              }}
            >
              <div className="flex flex-col gap-2 text-left max-w-2xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                  Effortless Inventory & Order Management for B2B
                </h1>
                <h2 className="text-gray-200 text-sm font-normal leading-normal md:text-base">
                  Streamline your operations, reduce costs, and scale your business with our all-in-one management platform.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] md:text-base hover:opacity-90 transition-opacity">
                    <span className="truncate">Get Started Free</span>
                  </button>
                </Link>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white text-sm font-bold leading-normal tracking-[0.015em] md:text-base hover:bg-white/30 dark:hover:bg-white/20 transition-colors">
                  <span className="truncate">Watch a Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="py-10">
          <h4 className="text-text-muted-light dark:text-text-muted-dark text-sm font-bold leading-normal tracking-[0.015em] px-4 py-2 text-center">
            TRUSTED BY LEADING BUSINESSES
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 p-4 items-center justify-items-center opacity-60 grayscale">
            <img className="w-24 h-12 object-contain" alt="Company A" src="https://placehold.co/200x80?text=Logo+A" />
            <img className="w-24 h-12 object-contain" alt="Company B" src="https://placehold.co/200x80?text=Logo+B" />
            <img className="w-24 h-12 object-contain" alt="Company C" src="https://placehold.co/200x80?text=Logo+C" />
            <img className="w-24 h-12 object-contain" alt="Company D" src="https://placehold.co/200x80?text=Logo+D" />
            <img className="w-24 h-12 object-contain hidden lg:block" alt="Company E" src="https://placehold.co/200x80?text=Logo+E" />
          </div>
        </div>

        {/* Feature Section */}
        <div id="features" className="flex flex-col gap-10 px-4 md:px-10 lg:px-20 xl:px-40 py-10 my-10">
          <div className="flex flex-col gap-4 text-center items-center">
            <h1 className="text-text-light dark:text-text-dark tracking-light text-[32px] font-bold leading-tight md:text-4xl max-w-[720px]">
              Everything you need to scale your operations
            </h1>
            <p className="text-text-light dark:text-text-dark text-base font-normal leading-normal max-w-[720px]">
              Quantify provides a complete suite of tools to manage your inventory and orders with precision and efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-0">
            <FeatureCard 
              icon={<RefreshCw className="w-8 h-8" />}
              title="Real-Time Inventory Sync"
              description="Keep your stock levels accurate across all channels, preventing overselling and stockouts."
            />
            <FeatureCard 
              icon={<Settings className="w-8 h-8" />}
              title="Automated Order Processing"
              description="Automate routine tasks from order entry to fulfillment, freeing up your team for growth."
            />
            <FeatureCard 
              icon={<BarChart2 className="w-8 h-8" />}
              title="Advanced Reporting"
              description="Gain valuable insights into your sales trends, inventory performance, and operational efficiency."
            />
            <FeatureCard 
              icon={<Warehouse className="w-8 h-8" />}
              title="Multi-Warehouse Support"
              description="Manage and track inventory across multiple locations from a single, centralized dashboard."
            />
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 px-4 md:px-10 lg:px-20 xl:px-40">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark sm:text-4xl tracking-tight">How It Works in 3 Simple Steps</h2>
            <p className="mt-4 text-lg leading-6 text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">Get up and running with Quantify quickly and seamlessly.</p>
          </div>
          
          <div className="relative">
            <div aria-hidden="true" className="absolute left-1/2 top-0 h-full w-px bg-border-light dark:bg-border-dark hidden md:block"></div>
            <div className="grid md:grid-cols-2 gap-y-12 md:gap-x-12">
              
              {/* Step 1 */}
              <div className="md:text-right relative">
                <div className="absolute left-1/2 -ml-3 top-3 hidden md:block">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">1</div>
                </div>
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                  <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">Connect Your Systems</h3>
                  <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">Easily integrate Quantify with your existing e-commerce platforms, marketplaces, and accounting software in just a few clicks.</p>
                </div>
              </div>
              <div className="hidden md:block"></div>

              {/* Step 2 */}
              <div className="hidden md:block"></div>
              <div className="md:text-left relative">
                <div className="absolute left-1/2 -ml-3 top-3 hidden md:block">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">2</div>
                </div>
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                  <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">Centralize Your Data</h3>
                  <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">All your inventory, orders, and customer data are synced and centralized into a single, easy-to-use dashboard.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="md:text-right relative">
                <div className="absolute left-1/2 -ml-3 top-3 hidden md:block">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">3</div>
                </div>
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                  <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">Scale Your Operations</h3>
                  <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">Leverage automation and powerful insights to fulfill orders faster, reduce errors, and grow your business with confidence.</p>
                </div>
              </div>
              <div className="hidden md:block"></div>
              
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16 px-4 md:px-10 lg:px-20 xl:px-40">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark sm:text-4xl tracking-tight">What Our Customers Say</h2>
            <p className="mt-4 text-lg leading-6 text-text-muted-light dark:text-text-muted-dark">Don't just take our word for it. Hear from businesses like yours.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Quantify has been a game-changer for our business. We've cut our order processing time by 50% and completely eliminated stockout issues."
              name="Sarah Johnson"
              role="CEO, Acme Innovations"
              img="https://placehold.co/100x100?text=SJ"
            />
            <TestimonialCard 
              quote="The reporting features are incredible. We now have a clear view of our inventory performance which has helped us make much smarter purchasing decisions."
              name="Mark Chen"
              role="Ops Manager, Global Exports"
              img="https://placehold.co/100x100?text=MC"
            />
            <TestimonialCard 
              quote="We manage inventory across three warehouses, and Quantify makes it feel like one. The multi-warehouse support is seamless and has saved us countless hours."
              name="Emily Rodriguez"
              role="Founder, Craft Supplies Co."
              img="https://placehold.co/100x100?text=ER"
            />
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="px-4 md:px-10 lg:px-20 xl:px-40">
          <div className="bg-primary rounded-xl my-16 p-12 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight">Ready to streamline your business?</h2>
            <p className="mt-4 max-w-2xl mx-auto">Join hundreds of businesses that trust Quantify to manage their inventory and orders. Get started today.</p>
            <Link to="/signup">
              <button className="mt-8 flex mx-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white text-primary text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-100 transition-colors">
                <span className="truncate">Get Started with Quantify</span>
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-light dark:border-border-dark mt-10 py-8 px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-text-muted-light dark:text-text-muted-dark">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="text-primary w-5 h-5">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path></svg>
              </div>
              <span class="font-bold text-text-light dark:text-text-dark">Quantify</span>
            </div>
            <span>© 2024 Quantify, Inc. All rights reserved.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="font-bold text-text-light dark:text-text-dark">Product</h4>
            <a className="hover:text-primary transition-colors" href="#">Features</a>
            <a className="hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="hover:text-primary transition-colors" href="#">Integrations</a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <h4 className="font-bold text-text-light dark:text-text-dark">Legal</h4>
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-component for Feature Cards
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-1 gap-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-6 flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="text-secondary">
      {icon}
    </div>
    <div className="flex flex-col gap-1">
      <h2 className="text-text-light dark:text-text-dark text-base font-bold leading-tight">{title}</h2>
      <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">{description}</p>
    </div>
  </div>
);

// Sub-component for Testimonials
const TestimonialCard = ({ quote, name, role, img }) => (
  <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
    <p className="text-text-muted-light dark:text-text-muted-dark">"{quote}"</p>
    <div className="mt-4 flex items-center">
      <img className="h-12 w-12 rounded-full object-cover" alt={`Profile of ${name}`} src={img} />
      <div className="ml-4">
        <div className="text-base font-medium text-text-light dark:text-text-dark">{name}</div>
        <div className="text-sm text-text-muted-light dark:text-text-muted-dark">{role}</div>
      </div>
    </div>
  </div>
);