import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';
import { Sparkles, Activity } from 'lucide-react';

interface Landmark {
  id: string;
  name: string;
  desc: string;
  x: string; // percentage
  y: string; // percentage
}

const anatomicalLandmarks: Landmark[] = [
  {
    id: 'scope',
    name: '4.0mm Arthroscopic Scope',
    desc: '30° wide-angle HD optical scope for keyhole joint navigation',
    x: '64%',
    y: '62%',
  },
  {
    id: 'joint',
    name: 'Glenohumeral Articular Space',
    desc: 'Articular cartilage & labral repair zone illuminated with fiber-optic LED',
    x: '51%',
    y: '48%',
  },
  {
    id: 'acromion',
    name: 'Acromioclavicular Arch',
    desc: 'Subacromial space decompression pathway',
    x: '46%',
    y: '22%',
  },
  {
    id: 'humerus',
    name: 'Humeral Head & Cuff',
    desc: 'Supraspinatus & rotator cuff tendon attachment',
    x: '34%',
    y: '42%',
  },
];

export const ShoulderArthroscopyVisual: React.FC = () => {
  const [activePin, setActivePin] = useState<Landmark | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Soft Ambient Clinical Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-transparent blur-2xl -z-10 pointer-events-none" />

      {/* Main Visual Frame */}
      <div 
        className="relative overflow-hidden rounded-3xl border border-sky-500/25 bg-[#081325]/90 p-2.5 sm:p-3.5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActivePin(null);
        }}
      >
        {/* Top Floating Badge: Surgical Live Status */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#040914]/90 px-3 py-1 text-[11px] font-bold text-cyan-300 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span>Keyhole Shoulder Arthroscopy</span>
        </div>

        {/* Optical Scope Spec Tag */}
        <div className="hidden sm:flex absolute top-4 right-4 z-20 items-center gap-1.5 rounded-full border border-sky-500/30 bg-[#040914]/90 px-2.5 py-1 text-[10px] font-semibold text-cyan-300 backdrop-blur-md">
          <Activity size={12} className="text-cyan-400 animate-pulse" />
          <span>4K HD Endoscopic View</span>
        </div>

        {/* Central Anatomy Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#040914]">
          <img
            src="/assets/images/shoulder-arthroscopy-hero.jpg"
            alt="Anatomical Shoulder Joint Arthroscopy Keyhole Visualization"
            className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-104' : 'scale-100'
            }`}
            loading="eager"
          />

          {/* Realistic Fiber-Optic Intra-articular Glow Effect */}
          <div 
            className="absolute pointer-events-none rounded-full bg-cyan-400/40 blur-md animate-pulse"
            style={{
              top: '47%',
              left: '49%',
              width: '18%',
              height: '18%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Micro Laser / Scope Reticle Guide */}
          <div 
            className="absolute pointer-events-none border border-cyan-400/60 rounded-full animate-ping opacity-60"
            style={{
              top: '49%',
              left: '52%',
              width: '24px',
              height: '24px',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Interactive Anatomical Pin Markers */}
          {anatomicalLandmarks.map((landmark) => {
            const isActive = activePin?.id === landmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => setActivePin(isActive ? null : landmark)}
                onMouseEnter={() => setActivePin(landmark)}
                style={{ top: landmark.y, left: landmark.x }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center p-1 rounded-full transition-all duration-300 focus:outline-none ${
                  isActive ? 'scale-125' : 'hover:scale-115'
                }`}
                aria-label={`Inspect ${landmark.name}`}
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${
                    isActive ? 'bg-cyan-400' : 'bg-sky-400'
                  }`} />
                  <span className={`relative inline-flex rounded-full border-2 border-[#040914] shadow-md ${
                    isActive ? 'h-3.5 w-3.5 bg-cyan-400' : 'h-3 w-3 bg-sky-400 group-hover:bg-cyan-400'
                  }`} />
                </span>
              </button>
            );
          })}

          {/* Active Landmark Info Tooltip Card */}
          {activePin && (
            <div 
              className="absolute bottom-3 left-3 right-3 z-30 animate-fadeIn rounded-xl border border-cyan-400/40 bg-[#040914]/95 p-2.5 text-white shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-cyan-400" />
                  {activePin.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Arthroscopy Guide</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-300 leading-snug">
                {activePin.desc}
              </p>
            </div>
          )}
        </div>

        {/* Integrated Doctor Snapshot Badge */}
        <div className="mt-2.5 rounded-2xl border border-sky-500/20 bg-[#040914]/90 p-3 shadow-md backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={clinicInfo.portraitImage}
              alt={clinicInfo.doctorName}
              className="h-11 w-11 shrink-0 rounded-xl object-cover border-2 border-cyan-500 shadow-sm"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {clinicInfo.doctorName}
              </div>
              <div className="text-[11px] text-cyan-400 font-semibold truncate">
                {clinicInfo.degrees}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Specialist in Keyhole Shoulder &amp; Knee Arthroscopy
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0 text-right pr-1">
            <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Available Today
            </div>
            <span className="text-[10px] text-slate-400">JP Nagar Clinic</span>
          </div>
        </div>
      </div>
    </div>
  );
};
