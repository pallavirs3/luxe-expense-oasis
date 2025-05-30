
import React, { useState } from 'react';
import { Plus, Bell, Calendar, Clock, DollarSign, X } from 'lucide-react';

const Reminders = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Electricity Bill',
      amount: 125.00,
      dueDate: '2024-06-05',
      time: '09:00',
      frequency: 'Monthly',
      category: 'Bills & Utilities',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Netflix Subscription',
      amount: 15.99,
      dueDate: '2024-06-08',
      time: '12:00',
      frequency: 'Monthly',
      category: 'Entertainment',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Car Insurance',
      amount: 89.50,
      dueDate: '2024-06-15',
      time: '10:00',
      frequency: 'Monthly',
      category: 'Transportation',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Gym Membership',
      amount: 45.00,
      dueDate: '2024-06-01',
      time: '08:00',
      frequency: 'Monthly',
      category: 'Healthcare',
      status: 'paid'
    }
  ]);

  const AddReminderModal = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [time, setTime] = useState('');
    const [frequency, setFrequency] = useState('Monthly');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newReminder = {
        id: Date.now(),
        title,
        amount: parseFloat(amount),
        dueDate,
        time,
        frequency,
        category,
        status: 'pending'
      };
      setReminders([...reminders, newReminder]);
      setShowAddModal(false);
      // Here you would integrate with Azure Logic Apps for email notifications
      console.log('Setting up email reminder for:', newReminder);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add Reminder</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Bill title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="number"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Once">Once</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              <option value="Bills & Utilities">Bills & Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Insurance">Insurance</option>
            </select>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Add Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const markAsPaid = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, status: 'paid' } : reminder
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const pendingReminders = reminders.filter(r => r.status === 'pending');
  const paidReminders = reminders.filter(r => r.status === 'paid');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Bill Reminders</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Pending Bills</p>
              <p className="text-3xl font-bold">{pendingReminders.length}</p>
            </div>
            <Bell className="w-8 h-8 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Due</p>
              <p className="text-3xl font-bold">
                ${pendingReminders.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Paid This Month</p>
              <p className="text-3xl font-bold">{paidReminders.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* Pending Reminders */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Upcoming Bills</h2>
        
        {pendingReminders.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No pending reminders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {reminder.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {reminder.category} • {reminder.frequency}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center text-sm text-slate-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(reminder.dueDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center text-sm text-slate-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {reminder.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      ${reminder.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => markAsPaid(reminder.id)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                    >
                      Mark Paid
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Payments */}
      {paidReminders.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Payments</h2>
          <div className="space-y-3">
            {paidReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{reminder.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{reminder.category}</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">${reminder.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddModal && <AddReminderModal />}
    </div>
  );
};

export default Reminders;
