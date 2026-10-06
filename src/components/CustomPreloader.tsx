import React, { useEffect, useState } from 'react';
import { Stethoscope, Sparkles } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

interface CustomPreloaderProps {
  onLoaded?: () => void;
}

export const CustomPreloader: React.FC<CustomPreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Smooth progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              setIsHidden(true);
              if (onLoaded) onLoaded();
            }, 500);
          }, 300);
          return 100;
        }
        // Random progressive increment for realistic feeling
        const increment = Math.floor(Math.random() * 15) + 10;
        return Math.min(100, prev + increment);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040914] transition-opacity duration-500 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Ambient background glow */}
      <div className="absolute h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
      <div className="absolute h-64 w-64 rounded-full border border-cyan-500/20 pointer-events-none animate-ping opacity-25" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm">
        {/* Animated Medical Logo Emblem */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-sky-500/30" />
          
          {/* Center glowing badge with clinic logo */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#081325] shadow-xl shadow-cyan-500/20 border border-sky-500/30 p-1 animate-pulse overflow-hidden">
            <img
              src={clinicInfo.logoImage}
              alt={clinicInfo.brandName}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl font-black tracking-tight text-white">
          {clinicInfo.brandName}
        </h2>
        <p className="mt-1 text-xs font-semibold text-cyan-400 tracking-widest uppercase">
          Orthopaedic, Robotic &amp; Spine Care
        </p>

        {/* Doctor Credential */}
        <p className="mt-2 text-[11px] text-slate-400 font-medium">
          {clinicInfo.doctorName} &bull; {clinicInfo.degrees}
        </p>

        {/* Custom Progress Bar */}
        <div className="mt-8 w-64">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-900 border border-sky-500/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-150 ease-out shadow-sm shadow-cyan-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span className="flex items-center gap-1 text-cyan-400">
              <Sparkles size={12} /> Initializing Clinical Suite
            </span>
            <span className="font-mono text-cyan-300 font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
