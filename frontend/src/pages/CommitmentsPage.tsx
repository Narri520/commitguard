import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Plus, Filter, Search } from 'lucide-react';
import { api } from '../services/api';
import { Commitment } from '../types';
import { TaskCard } from '../components/Cards';

export const CommitmentsPage: React.FC = () => {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const fetchCommitments = async () => {
    try {
      const res = await api.get('/commitments');
      if (res.data.success) setCommitments(res.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchCommitments();
  }, []);

  const filtered = commitments.filter((c) => {
    const matchesFilter =
      filter === 'ALL'
        ? true
        : filter === 'PENDING'
        ? c.status === 'ACTIVE' || c.status === 'SCHEDULED'
        : c.status === filter;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-500" /> My Commitments
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your scheduled tasks, proof requirements, and status lifecycle.
          </p>
        </div>

        <Link
          to="/commitments/create"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Create Commitment
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'PENDING', 'COMPLETED', 'MISSED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search commitments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center text-slate-400 text-xs">
          No commitments found matching your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <TaskCard key={c._id} commitment={c} />
          ))}
        </div>
      )}

    </div>
  );
};
