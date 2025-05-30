
import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Welcome to ExpenseTracker
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Your professional expense management solution
        </p>
        <a 
          href="/login" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Index;
