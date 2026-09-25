import React from 'react';
import { User, Mail, Globe, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="w-6 h-6 text-emerald-500" /> My Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          User account details, timezone settings, and platform authentication info.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 font-black flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{user?.name}</h2>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" /> Configured Timezone
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{user?.timezone || 'Asia/Kolkata'}</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-500" /> Account Type
            </span>
            <span className="font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded">
              Verified CommitGuard Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
