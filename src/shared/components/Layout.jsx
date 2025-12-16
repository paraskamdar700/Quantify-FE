import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight // Optional: Add an icon for sub-menus
} from 'lucide-react';
import { logout } from '../../features/auth/slices/authSlice'; 
// import authApi from ... (Ensure authApi is imported if you use it)

export const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // ... your existing logout logic
    dispatch(logout()); 
    navigate('/login'); 
  };

  // 1. Modified Nav Structure with subItems
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
    { 
      name: 'Inventory', 
      path: '/inventory', 
      icon: <Package size={20} />,
      // Add sub-routes here
      subItems: [
        { name: 'Products', path: '/inventory/products' },
        { name: 'Categories', path: '/inventory/categories' }
      ]
    },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-primary">Quantify</div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            // Check if this item is currently active
            const isActive = location.pathname.startsWith(item.path);

            return (
              <div key={item.name}>
                {/* Parent Link */}
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1">{item.name}</span>
                </Link>

                {/* 2. Render Sub-items if they exist and parent is active */}
                {item.subItems && isActive && (
                  <div className="ml-12 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      return (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                            isSubActive 
                              ? 'text-blue-600 font-medium bg-blue-50/50' 
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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

        <div className="p-4 border-t">
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 text-gray-600 hover:text-red-500 w-full px-4 py-2 transition-colors"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
           <h2 className="text-xl font-semibold text-gray-800">
             {/* Logic to show correct header title even for sub-routes */}
             {navItems.find(i => location.pathname.startsWith(i.path))?.name || 'Dashboard'}
           </h2>
           <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">{user?.fullname || 'User'}</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {user?.fullname?.charAt(0).toUpperCase() || 'U'}
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};