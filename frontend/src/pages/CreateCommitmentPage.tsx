import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Target, Calendar, Clock, DollarSign, Users, Heart, Shield, Check, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { AccountabilityPartner, Charity } from '../types';

const commitmentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  category: z.enum(['Health', 'Study', 'Fitness', 'Work', 'Personal', 'Habits', 'Other']),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  repeatSchedule: z.enum(['None', 'Daily', 'Weekly', 'Weekdays']),
  proofRequired: z.boolean(),
  proofType: z.enum(['image', 'text', 'location', 'qr', 'manual']),
  penaltyAmount: z.coerce.number().min(10, 'Minimum penalty stake is ₹10').max(10000, 'Max stake is ₹10,000'),
  penaltyDestination: z.enum(['Accountability Partner', 'Charity']),
  partnerId: z.string().optional(),
  charityId: z.string().optional()
});

type CommitmentFormData = z.infer<typeof commitmentSchema>;

export const CreateCommitmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<AccountabilityPartner[]>([]);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CommitmentFormData>({
    resolver: zodResolver(commitmentSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Health',
      date: todayStr,
      time: '20:00',
      repeatSchedule: 'Daily',
      proofRequired: true,
      proofType: 'image',
      penaltyAmount: 50,
      penaltyDestination: 'Accountability Partner'
    }
  });

  const selectedDestination = watch('penaltyDestination');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [partnerRes, charityRes] = await Promise.all([
          api.get('/accountability'),
          api.get('/charities')
        ]);
        if (partnerRes.data.success) setPartners(partnerRes.data.data);
        if (charityRes.data.success) setCharities(charityRes.data.data);
      } catch (e) {}
    };
    fetchOptions();
  }, []);

  const onSubmit = async (data: CommitmentFormData) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/commitments', data);
      if (res.data.success) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create commitment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
          New Commitment Setup
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 gradient-border">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold border border-emerald-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Create a Commitment
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set your target, deadline, proof method, and penalty consequences.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Task Title *
              </label>
              <input
                type="text"
                {...register('title')}
                placeholder="e.g., Take Evening Medicine / Solve Python DSA"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Category *
              </label>
              <select
                {...register('category')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Health">💊 Health & Medicine</option>
                <option value="Study">📚 Study & Academics</option>
                <option value="Fitness">🏋️ Fitness & Gym</option>
                <option value="Work">💼 Work & Coding</option>
                <option value="Personal">🎯 Personal Habit</option>
                <option value="Habits">🔄 Daily Routine</option>
                <option value="Other">📌 Other</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Description / Specific Criteria
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Detail what constitutes valid proof (e.g., photo of pill bottle/workout timer or summary notes)."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Date, Time & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Target Date *
              </label>
              <input
                type="date"
                {...register('date')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Deadline Time *
              </label>
              <input
                type="time"
                {...register('time')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Repeat Schedule
              </label>
              <select
                {...register('repeatSchedule')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="None">One-Time Only</option>
                <option value="Daily">Every Day</option>
                <option value="Weekly">Weekly</option>
                <option value="Weekdays">Mon - Fri</option>
              </select>
            </div>
          </div>

          {/* Proof Type & Requirement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Proof Verification Type *
              </label>
              <select
                {...register('proofType')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="image">📷 Image Photo Upload (Python Vision AI)</option>
                <option value="text">📝 Text Summary / Log (Python NLP AI)</option>
                <option value="manual">✋ Manual Partner Confirmation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Penalty Amount (₹ INR) *
              </label>
              <input
                type="number"
                {...register('penaltyAmount')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              {errors.penaltyAmount && <p className="text-xs text-rose-500 mt-1">{errors.penaltyAmount.message}</p>}
            </div>
          </div>

          {/* Penalty Destination */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
              Penalty Recipient Destination *
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedDestination === 'Accountability Partner'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
              }`}>
                <input
                  type="radio"
                  value="Accountability Partner"
                  {...register('penaltyDestination')}
                  className="hidden"
                />
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                  <Users className="w-4 h-4 text-emerald-500" />
                  Accountability Partner
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Funds transferred to trusted buddy UPI.</p>
              </label>

              <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedDestination === 'Charity'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
              }`}>
                <input
                  type="radio"
                  value="Charity"
                  {...register('penaltyDestination')}
                  className="hidden"
                />
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Verified Charity
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Funds donated to education/hunger support.</p>
              </label>
            </div>

            {selectedDestination === 'Accountability Partner' && partners.length > 0 && (
              <select
                {...register('partnerId')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white"
              >
                {partners.map(p => (
                  <option key={p._id} value={p._id}>{p.name} ({p.relationship}) - {p.upiId}</option>
                ))}
              </select>
            )}

            {selectedDestination === 'Charity' && charities.length > 0 && (
              <select
                {...register('charityId')}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white"
              >
                {charities.map(c => (
                  <option key={c._id} value={c._id}>{c.name} - {c.category}</option>
                ))}
              </select>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Locking Commitment...' : '🔒 Lock In Commitment & Activate Guard'}
          </button>
        </form>
      </div>

    </div>
  );
};
