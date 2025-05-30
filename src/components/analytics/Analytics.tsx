
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const Analytics = () => {
  const monthlyData = [
    { month: 'Jan', income: 8200, expenses: 3200, savings: 5000 },
    { month: 'Feb', income: 8100, expenses: 3400, savings: 4700 },
    { month: 'Mar', income: 8300, expenses: 3100, savings: 5200 },
    { month: 'Apr', income: 8500, expenses: 3600, savings: 4900 },
    { month: 'May', income: 8200, expenses: 3750, savings: 4450 },
    { month: 'Jun', income: 8400, expenses: 3200, savings: 5200 }
  ];

  const weeklyData = [
    { week: 'Week 1', expenses: 850 },
    { week: 'Week 2', expenses: 920 },
    { week: 'Week 3', expenses: 780 },
    { week: 'Week 4', expenses: 1200 }
  ];

  const categoryTrends = [
    { month: 'Jan', food: 800, transport: 300, entertainment: 200, bills: 400 },
    { month: 'Feb', food: 850, transport: 320, entertainment: 180, bills: 410 },
    { month: 'Mar', food: 780, transport: 280, entertainment: 250, bills: 390 },
    { month: 'Apr', food: 900, transport: 350, entertainment: 300, bills: 420 },
    { month: 'May', food: 920, transport: 380, entertainment: 280, bills: 450 },
    { month: 'Jun', food: 800, transport: 320, entertainment: 220, bills: 430 }
  ];

  const insights = [
    {
      title: 'Monthly Savings Rate',
      value: '54.2%',
      change: '+2.3%',
      isPositive: true,
      icon: TrendingUp,
      description: 'You\'re saving more than last month!'
    },
    {
      title: 'Highest Expense Category',
      value: 'Food & Dining',
      change: '$920',
      isPositive: false,
      icon: DollarSign,
      description: 'Consider meal planning to reduce costs'
    },
    {
      title: 'Spending Trend',
      value: 'Decreasing',
      change: '-8.5%',
      isPositive: true,
      icon: TrendingDown,
      description: 'Great job controlling expenses!'
    },
    {
      title: 'Budget Adherence',
      value: '87%',
      change: '+5%',
      isPositive: true,
      icon: Calendar,
      description: 'You\'re staying within budget'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics & Insights</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors">
            This Month
          </button>
          <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Last 3 Months
          </button>
          <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            This Year
          </button>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <insight.icon className={`w-8 h-8 ${insight.isPositive ? 'text-green-600' : 'text-red-600'}`} />
              <span className={`text-sm font-medium ${
                insight.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {insight.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {insight.value}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
              {insight.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-slate-600 dark:text-slate-400" />
              <YAxis className="text-slate-600 dark:text-slate-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Savings Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Savings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-slate-600 dark:text-slate-400" />
              <YAxis className="text-slate-600 dark:text-slate-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#3B82F6" 
                fill="url(#colorSavings)" 
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Expenses */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Weekly Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="week" className="text-slate-600 dark:text-slate-400" />
              <YAxis className="text-slate-600 dark:text-slate-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="expenses" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Trends */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Category Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={categoryTrends}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-slate-600 dark:text-slate-400" />
              <YAxis className="text-slate-600 dark:text-slate-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="food" stroke="#3B82F6" strokeWidth={3} name="Food" />
              <Line type="monotone" dataKey="transport" stroke="#10B981" strokeWidth={3} name="Transport" />
              <Line type="monotone" dataKey="entertainment" stroke="#F59E0B" strokeWidth={3} name="Entertainment" />
              <Line type="monotone" dataKey="bills" stroke="#EF4444" strokeWidth={3} name="Bills" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending Patterns */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Spending Patterns & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Smart Tip</h4>
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              You spend 35% more on weekends. Consider setting a weekend budget to control impulse purchases.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">🎯 Goal Progress</h4>
            <p className="text-green-700 dark:text-green-400 text-sm">
              You're 87% towards your monthly savings goal of $5,000. Keep it up!
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
            <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">⚠️ Watch Out</h4>
            <p className="text-orange-700 dark:text-orange-400 text-sm">
              Food expenses increased by 15% this month. Consider meal planning to reduce costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
