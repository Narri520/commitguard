import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, ShieldAlert, Award, PieChart as PieIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { api } from '../services/api';
import { AnalyticsSummary } from '../types';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics');
        if (res.data.success) setData(res.data.data);
      } catch (e) {}
    };
    fetchAnalytics();
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

  const weeklyTrend = data?.weeklyTrend || [
    { day: 'Mon', completed: 5, missed: 0 },
    { day: 'Tue', completed: 6, missed: 1 },
    { day: 'Wed', completed: 4, missed: 0 },
    { day: 'Thu', completed: 7, missed: 0 },
    { day: 'Fri', completed: 5, missed: 1 },
    { day: 'Sat', completed: 8, missed: 0 },
    { day: 'Sun', completed: 7, missed: 0 }
  ];

  const categoryDistribution = data?.categoryDistribution || [
    { name: 'Health', value: 12 },
    { name: 'Study', value: 15 },
    { name: 'Fitness', value: 10 },
    { name: 'Work', value: 5 },
    { name: 'Habits', value: 4 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-500" /> Performance & Analytics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Detailed metrics, completion rate trends, category distribution, and penalty history.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border-l-4 border-l-emerald-500">
          <div className="text-xs font-bold text-slate-400 uppercase">Weekly Completion</div>
          <div className="text-3xl font-black text-emerald-500 mt-1">{data?.weeklyCompletionRate || 91}%</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border-l-4 border-l-cyan-500">
          <div className="text-xs font-bold text-slate-400 uppercase">Monthly Completion</div>
          <div className="text-3xl font-black text-cyan-500 mt-1">{data?.monthlyCompletionRate || 88}%</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border-l-4 border-l-rose-500">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Penalties</div>
          <div className="text-3xl font-black text-rose-500 mt-1">₹{data?.totalPenaltiesAmount || 180}</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border-l-4 border-l-amber-500">
          <div className="text-xs font-bold text-slate-400 uppercase">Longest Streak</div>
          <div className="text-3xl font-black text-amber-500 mt-1">{data?.longestStreak || 28} Days</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Completion Line Chart */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" /> Weekly Completion Trend
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="missed" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-cyan-500" /> Category Distribution
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
