import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // 1. Import Redux hooks
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { logout } from '../../features/auth/slices/authSlice'; // 2. Import logout action

export const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 3. Get real user data from Redux Store
  const { user } = useSelector((state) => state.auth);

  // 4. Handle Logout Logic
  const handleLogout = () => {
    dispatch(logout()); // Clear Redux + LocalStorage
    navigate('/login'); // Redirect to Login page
  };

  // Navigation Items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-primary">Quantify</div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-primary font-medium' // Fixed typo: 'font-' -> 'font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
            <button 
              onClick={handleLogout} // Attached click handler
              className="flex items-center gap-3 text-gray-600 hover:text-red-500 w-full px-4 py-2 transition-colors"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
           <h2 className="text-xl font-semibold text-gray-800">
             {navItems.find(i => location.pathname.startsWith(i.path))?.name || 'Dashboard'}
           </h2>
           
           <div className="flex items-center gap-4">
              {/* Dynamic User Name */}
              <span className="text-sm font-medium text-gray-700">
                {user?.fullname || 'User'}
              </span>

              {/* Dynamic Avatar with Fallback */}
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {/* Show first letter of name or 'U' */}
                  {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
           </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};