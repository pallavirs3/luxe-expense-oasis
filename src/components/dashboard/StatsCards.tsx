
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useAuth } from '../../contexts/AuthContext';

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsGoal: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;

    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];

      // Fetch monthly expenses
      const { data: expensesData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', firstDayOfMonth)
        .lte('date', lastDayOfMonth);

      // Fetch monthly income
      const { data: incomeData } = await supabase
        .from('income')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', firstDayOfMonth)
        .lte('date', lastDayOfMonth);

      // Fetch total income and expenses for balance
      const { data: totalExpensesData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', user.id);

      const { data: totalIncomeData } = await supabase
        .from('income')
        .select('amount')
        .eq('user_id', user.id);

      const monthlyExpenses = expensesData?.reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;
      const monthlyIncome = incomeData?.reduce((sum, income) => sum + Number(income.amount), 0) || 0;
      const totalExpenses = totalExpensesData?.reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;
      const totalIncome = totalIncomeData?.reduce((sum, income) => sum + Number(income.amount), 0) || 0;
      const totalBalance = totalIncome - totalExpenses;
      const savingsGoal = monthlyIncome - monthlyExpenses;

      setStats({
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        savingsGoal
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const statsConfig = [
    {
      title: 'Total Balance',
      value: formatCurrency(stats.totalBalance),
      change: stats.totalBalance > 0 ? '+' : '',
      isPositive: stats.totalBalance >= 0,
      icon: Wallet,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(stats.monthlyIncome),
      change: stats.monthlyIncome > 0 ? '+' : '',
      isPositive: true,
      icon: TrendingUp,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(stats.monthlyExpenses),
      change: stats.monthlyExpenses > 0 ? '-' : '',
      isPositive: false,
      icon: TrendingDown,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Monthly Savings',
      value: formatCurrency(stats.savingsGoal),
      change: stats.savingsGoal > 0 ? '+' : '',
      isPositive: stats.savingsGoal >= 0,
      icon: DollarSign,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 animate-pulse">
            <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className={`text-sm font-medium ${
              stat.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {stat.value}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
