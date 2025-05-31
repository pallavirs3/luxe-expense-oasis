import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { User, Bell, Shield, Palette, Globe, Download, Save } from 'lucide-react';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    currency: 'INR',
    timezone: 'UTC+5:30'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    billReminders: true,
    weeklyReports: false,
    budgetAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false
  });

  const handleProfileSave = () => {
    // Here you would integrate with your backend API
    console.log('Saving profile:', profile);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <button
          onClick={handleProfileSave}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Currency
                  </label>
                  <select
                    value={profile.currency}
                    onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {getNotificationDescription(key)}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      value ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {getPrivacyDescription(key)}
                    </p>
                  </div>
                  <button
                    onClick={() => setPrivacy({ ...privacy, [key]: !value })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      value ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Settings Sidebar */}
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Appearance</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isDark ? 'Dark theme active' : 'Light theme active'}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  isDark ? 'bg-orange-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                    isDark ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Account Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Download className="w-5 h-5" />
                <span>Export Data</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                <Globe className="w-5 h-5" />
                <span>Change Language</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <Shield className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">App Information</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-600 dark:text-slate-400">Version: 2.1.0</p>
              <p className="text-slate-600 dark:text-slate-400">Last Updated: May 30, 2024</p>
              <p className="text-slate-600 dark:text-slate-400">Build: Production</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getNotificationDescription = (key: string) => {
  const descriptions: { [key: string]: string } = {
    email: 'Receive notifications via email',
    push: 'Get push notifications on your device',
    billReminders: 'Reminders for upcoming bills',
    weeklyReports: 'Weekly spending summary reports',
    budgetAlerts: 'Alerts when approaching budget limits'
  };
  return descriptions[key] || '';
};

const getPrivacyDescription = (key: string) => {
  const descriptions: { [key: string]: string } = {
    dataSharing: 'Share anonymized data for improvements',
    analytics: 'Allow usage analytics collection',
    marketing: 'Receive marketing communications'
  };
  return descriptions[key] || '';
};

export default Settings;
