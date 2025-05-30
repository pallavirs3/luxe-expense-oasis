
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Balance',
      value: '$12,450.00',
      change: '+12.5%',
      isPositive: true,
      icon: Wallet,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Monthly Income',
      value: '$8,200.00',
      change: '+8.2%',
      isPositive: true,
      icon: TrendingUp,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Monthly Expenses',
      value: '$3,750.00',
      change: '-5.1%',
      isPositive: false,
      icon: TrendingDown,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Savings Goal',
      value: '$4,500.00',
      change: '75%',
      isPositive: true,
      icon: DollarSign,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
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
