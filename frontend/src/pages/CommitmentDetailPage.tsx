import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Target, ArrowLeft, Clock, ShieldCheck, Upload, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { Commitment } from '../types';

export const CommitmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commitment, setCommitment] = useState<Commitment | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/commitments/${id}`);
        if (res.data.success) setCommitment(res.data.data);
      } catch (e) {}
    };
    if (id) fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this commitment?')) {
      try {
        await api.delete(`/commitments/${id}`);
        navigate('/commitments');
      } catch (e) {}
    }
  };

  if (!commitment) return <div className="p-8 text-center text-slate-400">Loading commitment...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      <button
        onClick={() => navigate('/commitments')}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Commitments
      </button>

      <div className="glass-card rounded-3xl p-8 space-y-6 gradient-border">
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">
              {commitment.category}
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
              {commitment.title}
            </h1>
          </div>
          <button onClick={handleDelete} className="text-slate-400 hover:text-rose-500 p-2">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {commitment.description || 'No detailed instructions provided.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Date</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{commitment.date}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Time</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{commitment.time}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Penalty Stake</span>
            <span className="font-black text-rose-500">₹{commitment.penaltyAmount}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
            <span className="font-extrabold text-emerald-500">{commitment.status}</span>
          </div>
        </div>

        {commitment.status !== 'COMPLETED' && (
          <Link
            to={`/commitments/${commitment._id}/proof`}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Upload className="w-4 h-4" /> Submit Proof Now
          </Link>
        )}
      </div>
    </div>
  );
};
