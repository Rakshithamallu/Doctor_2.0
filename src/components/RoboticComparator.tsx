import React, { useState } from 'react';
import { Cpu, CheckCircle2, XCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { roboticComparisonData } from '../data/clinicData';

interface RoboticComparatorProps {
  onOpenBooking: (subject: string) => void;
}

export const RoboticComparator: React.FC<RoboticComparatorProps> = ({ onOpenBooking }) => {
  const [activeView, setActiveView] = useState<'both' | 'robotic' | 'conventional'>('both');

  return (
    <div className="rounded-3xl border border-sky-500/20 bg-[#081325]/90 p-6 md:p-10 text-slate-200 shadow-2xl backdrop-blur-xl">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-sky-500/15 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <Cpu size={14} className="text-cyan-400" />
            MAKO 2.0 &amp; CUVIS Robotic Surgical Suite
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
            Robotic vs. Conventional Joint Replacement
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Compare sub-millimeter robotic accuracy versus traditional manual instrumentation for knee &amp; hip replacement.
          </p>
        </div>

        {/* View Filter */}
        <div className="flex rounded-xl bg-[#040914] p-1 border border-sky-500/20 text-xs font-semibold">
          <button
            onClick={() => setActiveView('both')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeView === 'both' ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setActiveView('robotic')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeView === 'robotic' ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Robotic Only
          </button>
          <button
            onClick={() => setActiveView('conventional')}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeView === 'conventional' ? 'bg-slate-700 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Conventional
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Robotic Column */}
        {(activeView === 'both' || activeView === 'robotic') && (
          <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 via-[#0a1830] to-[#061020] p-6 shadow-xl shadow-cyan-950/30">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-3 py-1 text-xs font-bold text-slate-950 shadow-md">
                <Sparkles size={13} /> RECOMMENDED
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Robotic-Assisted Surgery
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-4">
              Sub-Millimeter Robotic Precision
            </h4>

            <div className="space-y-3.5">
              {roboticComparisonData.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-cyan-500/20 bg-[#040914]/80 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    {item.feature}
                  </div>
                  <div className="mt-1 flex items-start gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item.robotic}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-sky-500/20">
              <button
                onClick={() => onOpenBooking('Robotic Knee Replacement Candidacy Consultation')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3 text-xs md:text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 hover:scale-[1.02]"
              >
                Check My Robotic Surgery Candidacy <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Conventional Column */}
        {(activeView === 'both' || activeView === 'conventional') && (
          <div className="rounded-2xl border border-slate-800 bg-[#060c18]/90 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                Traditional Method
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Conventional Manual
              </span>
            </div>

            <h4 className="text-xl font-bold text-slate-200 mb-4">
              Manual Instrumentation
            </h4>

            <div className="space-y-3.5">
              {roboticComparisonData.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800/80 bg-[#040914]/60 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {item.feature}
                  </div>
                  <div className="mt-1 flex items-start gap-2 text-xs text-slate-400">
                    <XCircle size={16} className="text-slate-500 shrink-0 mt-0.5" />
                    <span>{item.conventional}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <ShieldCheck size={16} className="text-slate-500 shrink-0" />
                <span>Conventional techniques are still utilized for specific emergency trauma and simple reconstructions.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
