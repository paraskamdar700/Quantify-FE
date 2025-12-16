// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LayoutDashboard, ShoppingCart, Package, Users, FileText, 
  Settings, LogOut, PanelLeftClose, PanelLeft, Palette, Bell 
} from 'lucide-react';
import { logout } from '../../features/auth/slices/authSlice.js';
import { ThemeSettings } from './ThemeSettings.jsx'; // Import the settings component

export const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // --- NEW STATES ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
    { 
      name: 'Inventory', 
      path: '/inventory', 
      icon: <Package size={20} />,
      subItems: [
        { name: 'Products', path: '/inventory/products' },
        { name: 'Categories', path: '/inventory/categories' }
      ]
    },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* --- SIDEBAR --- */}
      <aside 
        className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
          {/* Logo Logic: Show full logo if open, icon if closed */}
          {isSidebarOpen ? (
            <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>Quantify</span>
          ) : (
            <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>Q</span>
          )}
        </div>
        
        <nav className="flex-1 px-3 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-gray-700 text-[var(--primary-color)] font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  } ${!isSidebarOpen ? 'justify-center' : ''}`}
                >
                  <div style={isActive ? { color: 'var(--primary-color)' } : {}}>{item.icon}</div>
                  
                  {isSidebarOpen && <span className="flex-1">{item.name}</span>}
                  
                  {/* Tooltip for collapsed mode */}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                      {item.name}
                    </div>
                  )}
                </Link>

                {/* Sub-items: Only show when sidebar is OPEN */}
                {item.subItems && isActive && isSidebarOpen && (
                  <div className="ml-10 mt-1 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 pl-2">
                    {item.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      return (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            isSubActive 
                              ? 'text-[var(--primary-color)] font-medium bg-blue-50/50 dark:bg-gray-700/50' 
                              : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <button 
              onClick={handleLogout} 
              className={`flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-red-500 w-full px-3 py-2 transition-colors ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
                <LogOut size={20} />
                {isSidebarOpen && <span>Logout</span>}
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* --- NAVBAR --- */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-300">
           
           {/* Left: Sidebar Toggle & Title */}
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
             >
               {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
             </button>
             <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
               {navItems.find(i => location.pathname.startsWith(i.path))?.name || 'Dashboard'}
             </h2>
           </div>

           {/* Right: Actions */}
           <div className="flex items-center gap-4 relative">
              
              {/* Theme Settings Button */}
              <div className="relative">
                <button 
                  onClick={() => setIsThemeSettingsOpen(!isThemeSettingsOpen)}
                  className={`p-2 rounded-full transition-colors ${isThemeSettingsOpen ? 'bg-gray-100 dark:bg-gray-700 text-[var(--primary-color)]' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <Palette size={20} />
                </button>
                
                {/* --- THEME DROPDOWN COMPONENT --- */}
                <ThemeSettings 
                  isOpen={isThemeSettingsOpen} 
                  onClose={() => setIsThemeSettingsOpen(false)} 
                />
              </div>

              <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.fullname || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
           </div>
        </header>

        {/* --- PAGE CONTENT --- */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};