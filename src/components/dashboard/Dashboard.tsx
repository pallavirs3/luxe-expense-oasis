
import React, { useState, useEffect } from 'react';
import StatsCards from './StatsCards';
import ExpenseChart from './ExpenseChart';
import RecentTransactions from './RecentTransactions';
import AddExpenseModal from './AddExpenseModal';
import { Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  const handleExpenseAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back, {user.user_metadata?.full_name || user.email}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      <StatsCards key={refreshKey} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseChart key={refreshKey} />
        </div>
        <div>
          <RecentTransactions key={refreshKey} />
        </div>
      </div>

      {showAddModal && (
        <AddExpenseModal 
          onClose={() => setShowAddModal(false)} 
          onExpenseAdded={handleExpenseAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;
