import React, { useEffect, useState } from 'react';
import { Users, Plus, Mail, Phone, CreditCard, HeartHandshake, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { AccountabilityPartner } from '../types';

export const AccountabilityPage: React.FC = () => {
  const [partners, setPartners] = useState<AccountabilityPartner[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [upiId, setUpiId] = useState('');
  const [relationship, setRelationship] = useState('Best Friend');

  const fetchPartners = async () => {
    try {
      const res = await api.get('/accountability');
      if (res.data.success) setPartners(res.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/accountability', { name, email, phone, upiId, relationship });
      if (res.data.success) {
        setShowAddModal(false);
        setName('');
        setEmail('');
        setPhone('');
        setUpiId('');
        fetchPartners();
      }
    } catch (e) {}
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/accountability/${id}`);
      fetchPartners();
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-500" /> Accountability Partners
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Designate trusted friends or mentors to hold you accountable and receive penalty funds.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      {showAddModal && (
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/40 bg-slate-900/95 space-y-4">
          <h3 className="font-extrabold text-base text-white">Add New Accountability Buddy</h3>
          <form onSubmit={handleCreatePartner} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Partner Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="UPI ID for Payouts (e.g. rahul@upi)"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
            <div className="sm:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs text-slate-400 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500 text-slate-950 font-black text-xs px-5 py-2 rounded-xl"
              >
                Save Partner
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map(p => (
          <div key={p._id} className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{p.name}</h3>
                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {p.relationship}
                </span>
              </div>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="Remove partner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{p.email}</span>
              </div>
              {p.upiId && (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono text-slate-900 dark:text-slate-200">UPI: {p.upiId}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Penalties Received</span>
                <span className="font-black text-rose-500 text-sm">₹{p.totalPenaltiesReceived || 0}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Tasks Missed</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{p.missedCount || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
