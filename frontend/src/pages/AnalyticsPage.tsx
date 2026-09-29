import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Flame,
  Coins,
  AlertTriangle,
  Award,
  BookOpen,
  Dumbbell,
  Code2,
  Pill,
  User,
  Clock,
  Calendar
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m' | '1y'>('7d');

  const weeklyData = [
    { day: 'Mon', rate: 90 },
    { day: 'Tue', rate: 70 },
    { day: 'Wed', rate: 95 },
    { day: 'Thu', rate: 80 },
    { day: 'Fri', rate: 92 },
    { day: 'Sat', rate: 88 },
    { day: 'Sun', rate: 96 }
  ];

  const categoryPerformance = [
    { name: 'Study', icon: BookOpen, percentage: 90, color: 'bg-purple-500', barBg: 'bg-purple-100 dark:bg-purple-950/60' },
    { name: 'Fitness', icon: Dumbbell, percentage: 85, color: 'bg-emerald-500', barBg: 'bg-emerald-100 dark:bg-emerald-950/60' },
    { name: 'Work', icon: Code2, percentage: 94, color: 'bg-amber-500', barBg: 'bg-amber-100 dark:bg-amber-950/60' },
    { name: 'Personal', icon: User, percentage: 76, color: 'bg-blue-500', barBg: 'bg-blue-100 dark:bg-blue-950/60' },
    { name: 'Health', icon: Pill, percentage: 82, color: 'bg-rose-500', barBg: 'bg-rose-100 dark:bg-rose-950/60' }
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-200">
      
      {/* Top Header & Range Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-500" /> Consistency Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Understand your commitment habits, completion trends, and accountability insights.
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#0F172A] p-1 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold shadow-sm">
          {(['7d', '30d', '3m', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-[#2563EB] text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '3m' ? '3 Months' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Overall Consistency Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Your Consistency Score</span>
          <div className="text-4xl font-black mt-1 flex items-baseline gap-3">
            <span>87%</span>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full text-white flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> ↑ 8% from last month
            </span>
          </div>
          <p className="text-xs text-blue-100 mt-2">
            You've completed 42 commitments out of 51 scheduled tasks.
          </p>
        </div>

        {/* Quick summary numbers */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/10">
            <span className="text-[10px] uppercase font-bold text-blue-200">Completed</span>
            <div className="text-xl font-black">42</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/10">
            <span className="text-[10px] uppercase font-bold text-rose-200">Missed</span>
            <div className="text-xl font-black text-rose-300">6</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center border border-white/10">
            <span className="text-[10px] uppercase font-bold text-amber-200">Pending</span>
            <div className="text-xl font-black text-amber-300">3</div>
          </div>
        </div>
      </div>

      {/* 2 & 3. Main Analytics Grid: Weekly Performance & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Performance Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Weekly Performance</h3>
              <p className="text-xs text-slate-400">Daily completion rate percentage over the last 7 days</p>
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
              Avg 87.5%
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(value: any) => [`${value}%`, 'Completion Rate']}
                />
                <Area type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance Bars */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
              Category Performance
            </h3>
            <p className="text-xs text-slate-400 mb-5">Consistency breakdown per category</p>

            <div className="space-y-4">
              {categoryPerformance.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CatIcon className="w-3.5 h-3.5 text-blue-500" />
                        {cat.name}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{cat.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Highest: <strong>Work (94%)</strong></span>
            <span>Needs Focus: <strong>Personal (76%)</strong></span>
          </div>
        </div>

      </div>

      {/* 4, 5, 6. Bottom KPI Widgets: Streaks, Missed Task Pattern & Penalty History */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Streak Analytics */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Streak Analytics</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Current Streak</span>
              <span className="font-black text-lg text-orange-500">🔥 12 Days</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Longest Streak</span>
              <span className="font-black text-lg text-emerald-500">🏆 42 Days</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Average Streak</span>
              <span className="font-black text-lg text-blue-500">8 Days</span>
            </div>
          </div>
        </div>

        {/* Missed Commitment Analysis */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Missed Task Pattern</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500 dark:text-slate-400">Total Missed Tasks</span>
              <span className="font-bold text-rose-500 text-sm">6 Tasks</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500 dark:text-slate-400">Most Missed Category</span>
              <span className="font-bold text-slate-900 dark:text-white">Study (3 tasks)</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500 dark:text-slate-400">Peak Missed Window</span>
              <span className="font-bold text-slate-900 dark:text-white">8:00 PM – 10:00 PM</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500 dark:text-slate-400">Total Penalties Paid</span>
              <span className="font-bold text-slate-900 dark:text-white">₹30</span>
            </div>
          </div>
        </div>

        {/* Penalty History */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-5 h-5 text-purple-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Penalty History</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500 dark:text-slate-400">Total Penalty Amount</span>
              <span className="font-extrabold text-base text-purple-500">₹30</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500 dark:text-slate-400">This Month</span>
              <span className="font-bold text-slate-900 dark:text-white">₹20</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500 dark:text-slate-400">Last Month</span>
              <span className="font-bold text-slate-900 dark:text-white">₹10</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500 dark:text-slate-400">Total Penalty Count</span>
              <span className="font-bold text-slate-900 dark:text-white">3 Penalties</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

