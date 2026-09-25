import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  PlusCircle,
  BarChart3,
  Flame,
  CreditCard,
  Users,
  Heart,
  Bell,
  Settings
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Commitments', path: '/commitments', icon: Target },
    { label: 'New Task', path: '/commitments/create', icon: PlusCircle },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Streaks', path: '/streaks', icon: Flame },
    { label: 'Transactions', path: '/transactions', icon: CreditCard },
    { label: 'Accountability', path: '/accountability', icon: Users },
    { label: 'Charities', path: '/charities', icon: Heart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 p-4 space-y-2 overflow-y-auto">
      <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
        Main Menu
      </div>
      
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/commitments'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
              }`
            }
          >
            <Icon className="w-5 h-5 stroke-[2]" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}

      {/* Quick Demo Mode Badge */}
      <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
          <Flame className="w-4 h-4 fill-emerald-400" />
          <span>CommitGuard Sandbox</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          AI verification engine active. All payments operate in sandbox demo mode.
        </p>
      </div>
    </aside>
  );
};
