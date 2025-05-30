
import React from 'react';
import { Calendar, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: -125.50,
      category: 'Food & Dining',
      date: '2024-05-29',
      type: 'expense'
    },
    {
      id: 2,
      description: 'Salary Deposit',
      amount: 4200.00,
      category: 'Income',
      date: '2024-05-28',
      type: 'income'
    },
    {
      id: 3,
      description: 'Netflix Subscription',
      amount: -15.99,
      category: 'Entertainment',
      date: '2024-05-27',
      type: 'expense'
    },
    {
      id: 4,
      description: 'Gas Station',
      amount: -45.20,
      category: 'Transportation',
      date: '2024-05-26',
      type: 'expense'
    },
    {
      id: 5,
      description: 'Freelance Project',
      amount: 800.00,
      category: 'Income',
      date: '2024-05-25',
      type: 'income'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
        <Calendar className="w-5 h-5 text-slate-500" />
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                transaction.type === 'income' 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {transaction.type === 'income' ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-bold ${
                transaction.type === 'income' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 font-medium">
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactions;
