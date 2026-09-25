import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, CheckCircle, Clock, AlertTriangle, Shield, Check, ArrowUpRight, Upload } from 'lucide-react';
import { Commitment, Transaction, NotificationItem } from '../types';

export const ProgressCard: React.FC<{ completed: number; total: number }> = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden gradient-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Today's Progress
          </span>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {completed} <span className="text-lg text-slate-400 font-medium">/ {total} Done</span>
          </h3>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-lg border border-emerald-500/30">
          {percentage}%
        </div>
      </div>
      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const StreakCard: React.FC<{ streak: number; longest: number }> = ({ streak, longest }) => {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-amber-500 animate-bounce" />
            Active Commitment Streak
          </div>
          <h3 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            🔥 {streak} <span className="text-base font-semibold text-slate-400">Days</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Personal Record: <span className="font-bold text-slate-700 dark:text-slate-200">{longest} Days</span>
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
          <Flame className="w-9 h-9 fill-amber-500" />
        </div>
      </div>
    </div>
  );
};

export const TaskCard: React.FC<{ commitment: Commitment; onUploadClick?: () => void }> = ({ commitment, onUploadClick }) => {
  const isCompleted = commitment.status === 'COMPLETED';
  const isMissed = commitment.status === 'MISSED' || commitment.status === 'PENALTY_PROCESSED';
  const isActive = commitment.status === 'ACTIVE' || commitment.status === 'SCHEDULED';

  const categoryIcons: Record<string, string> = {
    Health: '💊',
    Study: '📚',
    Fitness: '🏋️',
    Work: '💼',
    Personal: '🎯',
    Habits: '🔄',
    Other: '📌'
  };

  return (
    <div className="glass-card rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <span>{categoryIcons[commitment.category] || '📌'}</span>
            <span>{commitment.category}</span>
          </span>
          <span
            className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
              isCompleted
                ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20'
                : isMissed
                ? 'bg-rose-500/10 text-rose-500 dark:bg-rose-500/20'
                : 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20'
            }`}
          >
            {commitment.status}
          </span>
        </div>

        <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-1">
          {commitment.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {commitment.description || 'No description provided.'}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 py-2 border-t border-slate-100 dark:border-slate-800 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {commitment.time}
          </span>
          <span className="font-semibold text-rose-500">
            Penalty: ₹{commitment.penaltyAmount}
          </span>
        </div>

        {isCompleted ? (
          <div className="w-full py-2 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 text-center font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4 stroke-[3]" /> Completed & Verified
          </div>
        ) : isMissed ? (
          <div className="w-full py-2 bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 text-center font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Penalty Charged (₹{commitment.penaltyAmount})
          </div>
        ) : (
          <Link
            to={`/commitments/${commitment._id}/proof`}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Upload className="w-4 h-4 stroke-[2.5]" /> Submit Proof
          </Link>
        )}
      </div>
    </div>
  );
};

export const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  return (
    <div className="glass-card rounded-2xl p-4 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold border border-rose-500/20">
          ₹
        </div>
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Penalty to {transaction.recipient}
          </div>
          <span className="text-[11px] text-slate-400">Ref: {transaction.transactionRef}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-extrabold text-sm text-rose-500">-₹{transaction.amount}</div>
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
          {transaction.status}
        </span>
      </div>
    </div>
  );
};
