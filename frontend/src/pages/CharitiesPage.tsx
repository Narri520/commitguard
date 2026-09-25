import React, { useEffect, useState } from 'react';
import { Heart, BookOpen, Utensils, HeartHandshake, PawPrint, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Charity } from '../types';

export const CharitiesPage: React.FC = () => {
  const [charities, setCharities] = useState<Charity[]>([]);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await api.get('/charities');
        if (res.data.success) setCharities(res.data.data);
      } catch (e) {}
    };
    fetchCharities();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-indigo-400" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-amber-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-400" />;
      case 'PawPrint': return <PawPrint className="w-6 h-6 text-emerald-400" />;
      default: return <Heart className="w-6 h-6 text-rose-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Verified Charity Destinations
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Select impact initiatives to receive your commitment penalty stakes when missed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charities.map((charity) => (
          <div key={charity._id} className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  {getIcon(charity.icon)}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{charity.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {charity.category}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {charity.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Total Payouts Raised</span>
              <span className="font-extrabold text-emerald-500 text-sm">₹{charity.totalDonations}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
