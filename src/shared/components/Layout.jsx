// src/shared/components/Layout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard, ShoppingCart, Package, Users, FileText,
  Settings, ChevronRight, PanelLeftClose, PanelLeft,
  Palette, Zap, LogOut, User, ChevronDown, Menu, X,
} from 'lucide-react';
import { ThemeSettings } from './ThemeSettings.jsx';
import { useSettings } from '../../features/settings/hooks/useSettings.js';

export const Layout = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const themeDropdownRef = useRef(null);

  const { firmQuery, logoutMutation } = useSettings();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target)) {
        setIsThemeSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Order', path: '/order', icon: ShoppingCart },
    {
      name: 'Inventory',
      path: '/inventory',
      icon: Package,
      subItems: [
        { name: 'Products', path: '/inventory/products' },
        { name: 'Categories', path: '/inventory/categories' }
      ]
    },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Invoices', path: '/invoices', icon: FileText },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`h-14 flex items-center border-b border-sidebar-border px-4 shrink-0 ${isSidebarOpen ? 'justify-start gap-2.5' : 'justify-center'}`}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}>
          <Zap size={14} className="text-white" />
        </div>
        {isSidebarOpen && (
          <span className="text-base font-bold tracking-tight text-sidebar-foreground">Quantify</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto thin-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <div key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                  isActive
                    ? 'text-white'
                    : 'text-sidebar-foreground-muted hover:text-sidebar-foreground hover:bg-sidebar-muted'
                } ${!isSidebarOpen ? 'justify-center' : ''}`}
                style={isActive ? { backgroundColor: 'var(--primary-color)' } : {}}
              >
                <Icon size={18} className={isActive ? 'text-white' : ''} />

                {isSidebarOpen && <span className="flex-1">{item.name}</span>}

                {isSidebarOpen && item.subItems && isActive && (
                  <ChevronRight size={14} className="text-white/60" />
                )}

                {/* Tooltip for collapsed */}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-lg font-medium">
                    {item.name}
                  </div>
                )}
              </Link>

              {/* Sub-items */}
              {item.subItems && isActive && isSidebarOpen && (
                <div className="ml-9 mt-1 space-y-0.5 border-l-2 border-sidebar-border pl-3">
                  {item.subItems.map((subItem) => {
                    const isSubActive = location.pathname === subItem.path;
                    return (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                          isSubActive
                            ? 'font-medium'
                            : 'text-sidebar-foreground-muted hover:text-sidebar-foreground'
                        }`}
                        style={isSubActive ? { color: 'var(--primary-color)' } : {}}
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

      {/* Bottom: Settings */}
      <div className="px-3 py-3 border-t border-sidebar-border shrink-0">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground-muted hover:text-sidebar-foreground hover:bg-sidebar-muted transition-colors ${
            !isSidebarOpen ? 'justify-center' : ''
          } ${location.pathname === '/settings' ? 'bg-sidebar-muted text-sidebar-foreground' : ''}`}
        >
          <Settings size={18} />
          {isSidebarOpen && <span>Settings</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-200">

      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside
        className={`bg-sidebar border-r border-sidebar-border flex-col transition-all duration-200 ease-in-out ${
          isSidebarOpen ? 'w-60' : 'w-[68px]'
        } hidden md:flex`}
      >
        <SidebarContent />
      </aside>

      {/* ═══ MOBILE SIDEBAR OVERLAY ═══ */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col shadow-2xl dropdown-animate">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ═══ MAIN CONTENT WRAPPER ═══ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ═══ HEADER ═══ */}
        <header className="h-14 bg-header border-b border-header-border flex items-center justify-between px-4 md:px-6 shrink-0">

          {/* Left: Sidebar toggle + Title */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
            >
              {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
              {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
            </button>

            <div className="h-5 w-px bg-border hidden md:block" />

            <h2 className="text-sm font-semibold text-foreground">
              {firmQuery.data?.[0]?.firm_name || "Loading..."}
            </h2>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">

            {/* Theme Settings */}
            <div ref={themeDropdownRef} className="relative">
              <button
                onClick={() => {
                  setIsThemeSettingsOpen(!isThemeSettingsOpen);
                  setIsUserDropdownOpen(false);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isThemeSettingsOpen
                    ? 'bg-muted'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
                style={isThemeSettingsOpen ? { color: 'var(--primary-color)' } : {}}
              >
                <Palette size={18} />
              </button>

              <ThemeSettings
                isOpen={isThemeSettingsOpen}
                onClose={() => setIsThemeSettingsOpen(false)}
              />
            </div>

            <div className="h-5 w-px bg-border mx-1" />

            {/* User Dropdown */}
            <div ref={userDropdownRef} className="relative">
              <button
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                  setIsThemeSettingsOpen(false);
                }}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  {user?.fullname?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-foreground leading-tight">{user?.fullname || 'User'}</p>
                  <p className="text-xs text-muted-foreground leading-tight">Admin</p>
                </div>
                <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-1.5 dropdown-animate">
                  {/* User info */}
                  <div className="px-3 py-2.5 border-b border-border">
                    <p className="text-sm font-semibold text-card-foreground">{user?.fullname || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    <Link
                      to="/settings"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-card-foreground hover:bg-muted transition-colors"
                    >
                      <User size={15} className="text-muted-foreground" />
                      Profile & Settings
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-border pt-1 pb-0.5">
                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        logoutMutation.mutate();
                      }}
                      disabled={logoutMutation.isPending}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors rounded-b-xl"
                    >
                      <LogOut size={15} />
                      {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ═══ PAGE CONTENT ═══ */}
        <main className="flex-1 overflow-auto bg-background transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};