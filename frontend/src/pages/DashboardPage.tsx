import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Coins,
  Trophy,
  ChevronRight,
  BookOpen,
  Dumbbell,
  Pill,
  Code2,
  Clock,
  Sparkles,
  Heart,
  TrendingUp,
  Check,
  X,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Commitment, Streak, AnalyticsSummary } from '../types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [streak, setStreak] = useState<Streak>({ currentStreak: 12, longestStreak: 42, history: [] });
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  const fetchData = async () => {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayName = user?.name || 'Rahul';

  // Demo fallback commitment list matching screenshot if backend empty
  const defaultCommitments = [
    {
      id: '1',
      title: 'Study Python',
      time: '8:00 PM - 9:00 PM',
      category: 'Study',
      categoryColor: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300',
      status: 'ACTION_REQUIRED',
      icon: BookOpen,
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300'
    },
    {
      id: '2',
      title: 'Workout',
      time: '6:00 PM - 7:00 PM',
      category: 'Fitness',
      categoryColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300',
      status: 'COMPLETED',
      icon: Dumbbell,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300'
    },
    {
      id: '3',
      title: 'Take Medicine',
      time: '9:00 PM - 9:15 PM',
      category: 'Health',
      categoryColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300',
      status: 'PENDING',
      icon: Pill,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300'
    },
    {
      id: '4',
      title: 'Read a Book',
      time: '10:00 PM - 11:00 PM',
      category: 'Personal',
      categoryColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300',
      status: 'PENDING',
      icon: BookOpen,
      iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300'
    },
    {
      id: '5',
      title: 'DSA Practice',
      time: '7:00 PM - 8:00 PM',
      category: 'Study',
      categoryColor: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300',
      status: 'MISSED',
      icon: Code2,
      iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300'
    }
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-200">
      
      {/* 1. Header Greeting & Streak Card Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Good Morning, {displayName.split(' ')[0]}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Stay consistent. Build the life you want.
          </p>
        </div>

        {/* Streak Top Banner Widget */}
        <Link
          to="/streaks"
          className="flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl px-5 py-3 shadow-sm hover:shadow transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-xl text-slate-900 dark:text-white leading-none">
              <span>{streak.currentStreak || 12}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Day Streak</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <span>Longest Streak <strong className="text-slate-700 dark:text-slate-200">{streak.longestStreak || 42} days</strong></span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* 2. Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Today's Progress */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Progress</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">3 / 5</div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-emerald-500 rounded-full w-[60%]" />
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-medium">3 completed • 2 pending</div>
          </div>
        </div>

        {/* Stat 2: This Week */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">This Week</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">91%</span>
              <span className="text-xs font-bold text-emerald-500">Completion Rate</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> ↑ 12%
              </span>
              {/* Sparkline curve visualization */}
              <svg className="w-16 h-5 stroke-blue-500 fill-none stroke-2" viewBox="0 0 60 20">
                <path d="M 0 15 Q 15 18 30 8 T 60 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stat 3: Total Penalties */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Coins className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Penalties</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">₹ 30</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] font-bold text-purple-500">This Month ↓ 70%</span>
              {/* Sparkline curve visualization */}
              <svg className="w-16 h-5 stroke-purple-500 fill-none stroke-2" viewBox="0 0 60 20">
                <path d="M 0 5 Q 20 18 40 10 T 60 16" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stat 4: Longest Streak */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Trophy className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Longest Streak</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">42 Days</div>
            <div className="text-[11px] font-semibold text-orange-500 mt-2 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-orange-500" /> Keep it up!
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Dashboard Grid (2 Columns Left, 1 Column Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT 2-COLUMNS SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* Today's Commitments Section */}
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Today's Commitments</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Tue, 29 Apr 2025</span>
            </div>

            {/* Commitment List Items */}
            <div className="space-y-3">
              {defaultCommitments.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Status indicator radio icon */}
                      {item.status === 'COMPLETED' ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : item.status === 'MISSED' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-rose-500 text-rose-500 flex items-center justify-center">
                          <X className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 opacity-60" />
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                        <ItemIcon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {/* Category Badge */}
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${item.categoryColor}`}>
                        {item.category}
                      </span>

                      {/* Action / Status Button */}
                      {item.status === 'ACTION_REQUIRED' ? (
                        <Link
                          to="/commitments/1/proof"
                          className="bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg shadow-sm shadow-blue-500/20 transition-colors"
                        >
                          Submit Proof
                        </Link>
                      ) : item.status === 'COMPLETED' ? (
                        <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : item.status === 'MISSED' ? (
                        <span className="bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                          ❌ Missed
                        </span>
                      ) : (
                        <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                          ⏳ Pending
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2-Column Row: Weekly Completion Donut & Category Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Weekly Completion Donut Chart */}
            <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">
                Weekly Completion
              </h3>
              
              <div className="flex items-center justify-between gap-4">
                {/* SVG Donut */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500"
                      strokeDasharray="91, 100"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white">91%</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Completed</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex items-center justify-between gap-6">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">42</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Missed
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">6</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Pending
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">
                Category Performance
              </h3>

              <div className="space-y-3 text-xs">
                {/* Study */}
                <div>
                  <div className="flex items-center justify-between mb-1 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-purple-500" /> Study</span>
                    <span className="font-bold text-slate-900 dark:text-white">90%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[90%]" />
                  </div>
                </div>

                {/* Fitness */}
                <div>
                  <div className="flex items-center justify-between mb-1 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2"><Dumbbell className="w-3.5 h-3.5 text-emerald-500" /> Fitness</span>
                    <span className="font-bold text-slate-900 dark:text-white">85%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
                  </div>
                </div>

                {/* Personal */}
                <div>
                  <div className="flex items-center justify-between mb-1 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-blue-500" /> Personal</span>
                    <span className="font-bold text-slate-900 dark:text-white">76%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[76%]" />
                  </div>
                </div>

                {/* Work */}
                <div>
                  <div className="flex items-center justify-between mb-1 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2"><Code2 className="w-3.5 h-3.5 text-amber-500" /> Work</span>
                    <span className="font-bold text-slate-900 dark:text-white">94%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[94%]" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom 3 Promo Banner Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Promo 1: AI-Powered Verification */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 rounded-2xl p-5 text-white flex flex-col justify-between shadow-md">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-1">AI-Powered Verification</h4>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  Upload your proof and let AI verify your completion. Get accurate results and stay accountable.
                </p>
              </div>
              <Link
                to="/commitments/1/proof"
                className="mt-4 inline-flex items-center gap-1.5 bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs px-3.5 py-1.5 rounded-lg w-fit transition-colors shadow-sm"
              >
                Learn More →
              </Link>
            </div>

            {/* Promo 2: Mountain Quote Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/60 dark:from-slate-800/80 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between text-center relative overflow-hidden">
              <p className="italic text-xs text-slate-600 dark:text-slate-300 font-medium my-auto leading-relaxed">
                "Small steps every day lead to big results."
              </p>
              <div className="mt-4 flex justify-center opacity-40">
                <svg className="w-24 h-12 text-blue-500 fill-current" viewBox="0 0 100 50">
                  <polygon points="0,50 35,15 70,50" />
                  <polygon points="40,50 70,25 100,50" />
                </svg>
              </div>
            </div>

            {/* Promo 3: Charity Impact */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-500 flex items-center justify-center mb-3">
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Your Charity Impact</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Choose a cause and let your penalties create a positive impact.
                </p>
              </div>
              <Link
                to="/charities"
                className="mt-4 inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg w-fit transition-colors shadow-sm"
              >
                Explore Charities →
              </Link>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN SECTION */}
        <div className="space-y-6">

          {/* Upcoming Reminders Card */}
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Upcoming Reminders</h3>
              </div>
              <Link to="/commitments" className="text-xs font-bold text-blue-500 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-500 dark:text-slate-400 w-14">7:45 PM</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Study Python</div>
                    <div className="text-[10px] text-slate-400">Reminder: 15 min before</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-500 dark:text-slate-400 w-14">9:00 PM</span>
                  <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                    <Pill className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Take Medicine</div>
                    <div className="text-[10px] text-slate-400">Reminder: 30 min before</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-500 dark:text-slate-400 w-14">10:00 PM</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Read a Book</div>
                    <div className="text-[10px] text-slate-400">Reminder: 30 min before</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-500 dark:text-slate-400 w-14">7:00 PM</span>
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">DSA Practice</div>
                    <div className="text-[10px] text-slate-400">Reminder: 15 min before</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-500" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Recent Activity</h3>
              </div>
              <Link to="/notifications" className="text-xs font-bold text-blue-500 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">You completed 'Workout'</div>
                  <div className="text-[10px] text-slate-400">2 hours ago</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">Proof submitted for 'Study Python'</div>
                  <div className="text-[10px] text-slate-400">4 hours ago</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">Penalty of ₹10 recorded (Missed Task)</div>
                  <div className="text-[10px] text-slate-400">Yesterday</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 dark:text-white">You earned 1 day streak!</div>
                  <div className="text-[10px] text-slate-400">Yesterday</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

