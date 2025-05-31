
import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useAuth } from '../../contexts/AuthContext';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category_name: string;
  date: string;
  type: 'expense' | 'income';
}

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      // Fetch recent expenses
      const { data: expensesData } = await supabase
        .from('expenses')
        .select('id, description, amount, category_name, date')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(3);

      // Fetch recent income
      const { data: incomeData } = await supabase
        .from('income')
        .select('id, description, amount, source, date')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(2);

      // Combine and format transactions
      const expenses: Transaction[] = (expensesData || []).map(expense => ({
        id: expense.id,
        description: expense.description || 'Expense',
        amount: Number(expense.amount),
        category_name: expense.category_name,
        date: expense.date,
        type: 'expense' as const
      }));

      const income: Transaction[] = (incomeData || []).map(income => ({
        id: income.id,
        description: income.description || income.source,
        amount: Number(income.amount),
        category_name: 'Income',
        date: income.date,
        type: 'income' as const
      }));

      // Combine and sort by date
      const allTransactions = [...expenses, ...income]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setTransactions(allTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
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

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
          <Calendar className="w-5 h-5 text-slate-500" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
        <Calendar className="w-5 h-5 text-slate-500" />
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No transactions yet</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">Add your first expense to get started</p>
          </div>
        ) : (
          transactions.map((transaction) => (
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
                    {transaction.category_name} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.type === 'income' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="w-full mt-4 py-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 font-medium">
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactions;
