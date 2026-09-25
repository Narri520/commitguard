import React from 'react';
import { Settings, Sun, Moon, Bell, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-500" /> Platform Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Customize theme preferences, notification reminders, and security settings.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Appearance Mode</h3>
            <p className="text-xs text-slate-400">Switch between dark mode and light mode.</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-900 dark:text-slate-100"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            <span>{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Push Notification Warnings</h3>
            <p className="text-xs text-slate-400">Receive alerts 15 minutes before deadline expiration.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-500 rounded cursor-pointer" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Accountability Partner Alerts</h3>
            <p className="text-xs text-slate-400">Notify partner automatically on missed deadline.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-500 rounded cursor-pointer" />
        </div>

      </div>
    </div>
  );
};
