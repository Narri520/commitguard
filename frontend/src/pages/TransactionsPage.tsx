import React, { useEffect, useState } from 'react';
import { CreditCard, CheckCircle, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { Transaction } from '../types';

export const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        if (res.data.success) setTransactions(res.data.data);
      } catch (e) {}
    };
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-rose-500" /> Transaction & Penalty History
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Audited log of all penalty payouts triggered by missed deadlines.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span><strong>Sandbox Environment:</strong> All transactions operate in simulated demo mode. No real bank charges are executed.</span>
        </div>
        <span className="font-bold uppercase tracking-wider bg-cyan-500/20 px-2 py-0.5 rounded text-[10px]">
          Demo Mode
        </span>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Destination Type</th>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No transaction penalty records found. You have kept all your commitments! 🎉
                  </td>
                </tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-medium text-slate-500 dark:text-slate-400">
                      {new Date(txn.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{txn.recipient}</td>
                    <td className="p-4 text-slate-400">{txn.destinationType}</td>
                    <td className="p-4 font-mono text-[11px] text-slate-400">{txn.transactionRef}</td>
                    <td className="p-4 font-black text-rose-500">₹{txn.amount}</td>
                    <td className="p-4 text-right">
                      <span className="bg-emerald-500/10 text-emerald-500 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/20">
                        SUCCESSFUL (MOCK)
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
