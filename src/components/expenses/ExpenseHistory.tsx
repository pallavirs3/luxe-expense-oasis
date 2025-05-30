
import React, { useState } from 'react';
import { Calendar, Search, Filter, Download } from 'lucide-react';

const ExpenseHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const expenses = [
    { id: 1, description: 'Grocery Shopping', amount: 125.50, category: 'Food & Dining', date: '2024-05-29', notes: 'Weekly groceries' },
    { id: 2, description: 'Gas Station', amount: 45.20, category: 'Transportation', date: '2024-05-28', notes: 'Fill up tank' },
    { id: 3, description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-05-27', notes: 'Monthly subscription' },
    { id: 4, description: 'Coffee Shop', amount: 8.50, category: 'Food & Dining', date: '2024-05-26', notes: 'Morning coffee' },
    { id: 5, description: 'Uber Ride', amount: 12.30, category: 'Transportation', date: '2024-05-25', notes: 'To downtown' },
    { id: 6, description: 'Pharmacy', amount: 25.80, category: 'Healthcare', date: '2024-05-24', notes: 'Medications' },
    { id: 7, description: 'Amazon Purchase', amount: 89.99, category: 'Shopping', date: '2024-05-23', notes: 'Office supplies' },
    { id: 8, description: 'Restaurant Dinner', amount: 67.45, category: 'Food & Dining', date: '2024-05-22', notes: 'Date night' }
  ];

  const categories = ['All', 'Food & Dining', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping'];

  const filteredExpenses = expenses
    .filter(expense => 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || filterCategory === 'All' || expense.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'amount') return b.amount - a.amount;
      return a.description.localeCompare(b.description);
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Expense History</h1>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All' ? '' : category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="description">Sort by Description</option>
          </select>

          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-slate-500" />
            <input
              type="date"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Description</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Date</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-600 dark:text-slate-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {expense.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-red-600">
                      -${expense.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                    {expense.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No expenses found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">
            ${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Average Per Day</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${(filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0) / 30).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Transaction Count</h3>
          <p className="text-3xl font-bold text-purple-600">{filteredExpenses.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHistory;
