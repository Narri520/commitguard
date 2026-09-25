import React, { useEffect, useState } from 'react';
import { Bell, CheckCheck, Trash2, Filter } from 'lucide-react';
import { api } from '../services/api';
import { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data.success) setNotifications(res.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAll = async () => {
    try {
      await api.put('/notifications/read-all');
      fetchNotifications();
    } catch (e) {}
  };

  const filtered = notifications.filter(n => (filter === 'UNREAD' ? !n.read : true));

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-500" /> Notification Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time deadline reminders, verification results, and penalty updates.
          </p>
        </div>

        <button
          onClick={handleMarkAll}
          className="flex items-center gap-2 text-xs font-bold text-emerald-500 hover:underline"
        >
          <CheckCheck className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            filter === 'ALL'
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('UNREAD')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            filter === 'UNREAD'
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
          }`}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-slate-400 text-xs">
            No notifications match your current filter.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n._id}
              className={`glass-card rounded-2xl p-4 transition-all border ${
                n.read
                  ? 'border-slate-200 dark:border-slate-800/60 opacity-80'
                  : 'border-emerald-500/30 bg-emerald-500/5'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{n.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(n.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
