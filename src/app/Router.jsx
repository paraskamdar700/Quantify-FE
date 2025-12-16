import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../shared/components/Layout';
import { Placeholder } from '../pages/Placeholder.jsx';

import { LandingPage } from '../pages/LandingPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx'; // Assume you created this

import { InventoryPage } from '../pages/InventoryPage.jsx';
import CategoryManagement from '../pages/CategoryManagement.jsx';

import { ProtectedRoute } from './ProtectedRoute.jsx';

export const AppRouter = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* --- PROTECTED ROUTES --- */}
      {/* 1. First, we check if the user is logged in using ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        
        {/* 2. If yes, we render the Main App Layout (Sidebar + Navbar) */}
        <Route element={<Layout />}>
          
          {/* 3. Redirect /app root to dashboard */}
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          
          {/* 4. The actual feature pages */}
          <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
          <Route path="/orders" element={<Placeholder title="Orders List" />} />

          <Route path="/inventory">
            <Route index element={<Navigate to="products" replace />} />

            <Route path="products" element={<InventoryPage />} />
            <Route path="categories" element={<CategoryManagement />} />
          </Route>
          
          <Route path="/customers" element={<Placeholder title="Customers" />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
          
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};