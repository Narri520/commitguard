import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  BarChart3,
  Flame,
  CreditCard,
  Users,
  Heart,
  Bell,
  User,
  Settings,
  ShieldCheck,
  Mountain
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Commitments', path: '/commitments', icon: ListTodo },
    { label: 'Create Commitment', path: '/commitments/create', icon: PlusCircle },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Streaks', path: '/streaks', icon: Flame },
    { label: 'Transactions', path: '/transactions', icon: CreditCard },
    { label: 'Accountability Partner', path: '/accountability', icon: Users },
    { label: 'Charity', path: '/charities', icon: Heart },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: 3 },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 hidden lg:flex flex-col h-screen sticky top-0 bg-[#0B132B] text-slate-300 p-4 border-r border-slate-800/80 z-30 select-none justify-between">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold text-lg text-white tracking-tight leading-none flex items-center gap-1">
              CommitGuard
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              Better Choices. Stronger You.
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/commitments'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 stroke-[2]" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Quote Card */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-3">
        <p className="italic leading-relaxed text-[11px] text-slate-300">
          "Discipline today builds the freedom you want tomorrow."
        </p>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold pt-2 border-t border-slate-800/80">
          <Mountain className="w-4 h-4 text-blue-400" />
          <span>CommitGuard</span>
        </div>
      </div>
    </aside>
  );
};

