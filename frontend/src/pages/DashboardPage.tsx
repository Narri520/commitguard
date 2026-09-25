import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Flame, CheckCircle2, AlertTriangle, TrendingUp, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Commitment, Streak, AnalyticsSummary } from '../types';
import { ProgressCard, StreakCard, TaskCard } from '../components/Cards';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [streak, setStreak] = useState<Streak>({ currentStreak: 23, longestStreak: 28, history: [] });
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [commRes, streakRes, analyticsRes] = await Promise.all([
        api.get('/commitments'),
        api.get('/streaks'),
        api.get('/analytics')
      ]);

      if (commRes.data.success) setCommitments(commRes.data.data);
      if (streakRes.data.success) setStreak(streakRes.data.data);
      if (analyticsRes.data.success) setAnalytics(analyticsRes.data.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetDemo = async () => {
    try {
      await api.post('/demo/reset');
      fetchData();
    } catch (e) {}
  };

  const completedCount = commitments.filter(c => c.status === 'COMPLETED').length;
  const totalCount = commitments.length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card rounded-3xl p-6 sm:p-8 gradient-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            AI Commitment Guard Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {getGreeting()}, {user?.name || 'User'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            You have <span className="font-bold text-slate-900 dark:text-slate-200">{totalCount - completedCount} pending commitments</span> due today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset sandbox demo dataset"
          >
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            <span>Reset Demo</span>
          </button>
          <Link
            to="/commitments/create"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create Commitment</span>
          </Link>
        </div>
      </div>

      {/* Progress & Streak Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressCard completed={completedCount} total={totalCount} />
        <StreakCard streak={streak.currentStreak} longest={streak.longestStreak} />
      </div>

      {/* Summary KPI Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Weekly Completion</div>
          <div className="text-2xl font-black text-emerald-500 mt-1">
            {analytics?.weeklyCompletionRate || 91}%
          </div>
          <span className="text-[11px] text-slate-400">Based on past 7 days</span>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Total Penalties</div>
          <div className="text-2xl font-black text-rose-500 mt-1">
            ₹{analytics?.totalPenaltiesAmount || 30}
          </div>
          <span className="text-[11px] text-slate-400">Sent to accountability</span>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Tasks Completed</div>
          <div className="text-2xl font-black text-cyan-500 mt-1">
            {analytics?.completedTasks || 42}
          </div>
          <span className="text-[11px] text-slate-400">Verified by Python AI</span>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Current Streak</div>
          <div className="text-2xl font-black text-amber-500 mt-1">
            {streak.currentStreak} Days
          </div>
          <span className="text-[11px] text-slate-400">Consecutive consistency</span>
        </div>
      </div>

      {/* Upcoming Commitments List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Upcoming Commitments</span>
            <span className="text-xs font-bold bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full">
              {commitments.length}
            </span>
          </h2>
          <Link to="/commitments" className="text-xs font-bold text-emerald-500 hover:underline">
            View All →
          </Link>
        </div>

        {commitments.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center">
            <p className="text-sm text-slate-400 mb-4">No active commitments found for today.</p>
            <Link
              to="/commitments/create"
              className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl"
            >
              <Plus className="w-4 h-4" /> Create Commitment Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((commitment) => (
              <TaskCard key={commitment._id} commitment={commitment} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
