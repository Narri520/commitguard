import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Flame, Cpu, Users, Bell, Heart, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user, loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoClick = async () => {
    await loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Bar Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                COMMITGUARD
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                AI Accountability Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <button
                  onClick={handleDemoClick}
                  className="hidden sm:inline-flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-all"
                >
                  <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  Try Demo
                </button>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-semibold text-sm px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8">
            <Flame className="w-4 h-4 fill-emerald-400" />
            <span>Complete your commitment. Or pay the consequence.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            Your commitments deserve <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">real consequences.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Build unshakeable consistency with automated reminders, Python AI-powered visual proof verification, and accountability stake payouts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start Your First Commitment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={handleDemoClick}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-base px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              Explore Sandbox Demo
            </button>
          </div>

          {/* Product UI Preview Mockup */}
          <div className="mt-16 relative max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-slate-800/80 to-slate-900/40 border border-slate-800 shadow-2xl">
            <div className="rounded-2xl bg-slate-950 p-6 text-left border border-slate-800/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 font-mono ml-2">CommitGuard AI Dashboard v1.0</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  🔥 23 Day Active Streak
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Today's Progress</div>
                  <div className="text-2xl font-black text-emerald-400">4 / 5 Tasks</div>
                  <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[80%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">AI Verified Proof</div>
                  <div className="text-sm font-bold text-slate-200">Python DSA Practice</div>
                  <span className="text-[11px] text-emerald-400 font-mono mt-1 inline-block">✓ Verified 94% Confidence</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Penalty Stake Safe</div>
                  <div className="text-2xl font-black text-slate-100">₹0 Forfeited</div>
                  <div className="text-[11px] text-slate-500 mt-1">Recipient: Accountability Partner</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-b border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">How CommitGuard Works</h2>
            <p className="text-slate-400 text-base">Six automated steps to ensure you stick to your habits and goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Commitment', desc: 'Define your task, deadline, proof requirement, and penalty amount (₹10 - ₹1000).' },
              { step: '02', title: 'Smart Reminder', desc: 'Receive automated notifications before your task deadline passes.' },
              { step: '03', title: 'Submit Evidence', desc: 'Upload a photo, screenshot, or text summary as proof of task completion.' },
              { step: '04', title: 'Python AI Verification', desc: 'Our microservice analyzes evidence consistency and confidence score.' },
              { step: '05', title: 'Build Your Streak', desc: 'Pass verification to extend your streak and track analytics progress.' },
              { step: '06', title: 'Miss It → Penalty', desc: 'Fail or miss deadline to trigger automated penalty payout to buddy or charity.' }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative">
                <div className="text-3xl font-black text-emerald-500/40 mb-3">{item.step}</div>
                <h3 className="font-extrabold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                Engineered for serious habit builders.
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Cpu, title: 'Python AI Microservice', desc: 'Decoupled FastAPI service evaluates proof images and summaries with confidence thresholds.' },
                  { icon: Users, title: 'Accountability Partners', desc: 'Assign trusted friends to receive penalty funds if you miss your commitments.' },
                  { icon: Heart, title: 'Charity Payouts', desc: 'Optionally direct penalties to verified education, food, or animal welfare charities.' },
                  { icon: Bell, title: 'BullMQ & Redis Reminders', desc: 'Background queue worker engine ensures you never miss a deadline warning.' }
                ].map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base mb-1">{feat.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 text-center">
              <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-white mb-3">Ready to lock in your goals?</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                Join thousands of consistent achievers powered by CommitGuard AI.
              </p>
              <button
                onClick={handleDemoClick}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
              >
                Launch Instant Demo Dashboard →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 CommitGuard Inc. Full-stack MERN + Python Architecture Platform.</p>
      </footer>
    </div>
  );
};
