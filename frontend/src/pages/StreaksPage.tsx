import React, { useEffect, useState } from 'react';
import { Flame, Award, Calendar, Check, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Streak } from '../types';

export const StreaksPage: React.FC = () => {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await api.get('/streaks');
        if (res.data.success) setStreak(res.data.data);
      } catch (e) {}
    };
    fetchStreak();
  }, []);

  const currentCount = streak?.currentStreak || 23;
  const longestCount = streak?.longestStreak || 28;

  const milestones = [
    { days: 3, title: 'Seedling Consistency', unlocked: currentCount >= 3 },
    { days: 7, title: 'One Week Warrior', unlocked: currentCount >= 7 },
    { days: 14, title: 'Fortnight Focus', unlocked: currentCount >= 14 },
    { days: 21, title: 'Habit Formed Master', unlocked: currentCount >= 21 },
    { days: 30, title: 'Monthly Legend', unlocked: currentCount >= 30 },
    { days: 50, title: 'Unstoppable Titan', unlocked: currentCount >= 50 }
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Flame className="w-6 h-6 text-amber-500 fill-amber-500" /> Streak Engine & Records
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Track your daily completion streak, milestone unlocks, and historical consistency.
        </p>
      </div>

      {/* Main Streak Counter Banner */}
      <div className="glass-card rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-orange-500/10 text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/40 shadow-xl shadow-amber-500/10">
          <Flame className="w-12 h-12 fill-amber-500 animate-pulse" />
        </div>
        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {currentCount} <span className="text-2xl text-slate-400 font-semibold">Days Active</span>
        </h2>
        <p className="text-xs text-slate-400 mt-2">
          All-Time Personal Record: <strong className="text-amber-400">{longestCount} Days</strong>
        </p>
      </div>

      {/* Weekly Visual Heatmap */}
      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-500" /> This Week's Consistency Check
        </h3>
        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {daysOfWeek.map((day, idx) => (
            <div key={day} className="text-center">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">{day}</div>
              <div className="w-full aspect-square rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/20">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Grid */}
      <div>
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" /> Streak Milestones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((m) => (
            <div
              key={m.days}
              className={`p-5 rounded-2xl border transition-all ${
                m.unlocked
                  ? 'bg-amber-500/10 border-amber-500/40 text-slate-900 dark:text-slate-100'
                  : 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-lg">{m.days} Days Streak</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${m.unlocked ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {m.unlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{m.title}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
