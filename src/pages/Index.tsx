
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Dashboard from '../components/dashboard/Dashboard';
import ExpenseHistory from '../components/expenses/ExpenseHistory';
import Analytics from '../components/analytics/Analytics';
import Reminders from '../components/reminders/Reminders';
import Settings from '../components/settings/Settings';
import AdminPanel from '../components/admin/AdminPanel';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const Index = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/expenses" element={<ExpenseHistory />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/reminders" element={<Reminders />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
