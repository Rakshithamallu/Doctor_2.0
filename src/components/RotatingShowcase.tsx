import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Stethoscope } from 'lucide-react';
import { getAssetUrl } from '../data/clinicData';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  x: string;
  y: string;
  color: string;
}

interface OrbitPod {
  id: string;
  name: string;
  badge: string;
  categoryBadge: string;
  image: string;
  caption: string;
  description: string;
  procedures: string[];
  angleDeg: number;
  hotspots: Hotspot[];
}

const pods: OrbitPod[] = [
  {
    id: 'trauma',
    name: '3D Fracture & Bone Alignment',
    badge: '24/7 Trauma Care',
    categoryBadge: 'TRAUMA & FRACTURE CARE',
    image: getAssetUrl('assets/images/trauma-fracture-clean.jpg'),
    caption: 'Rigid anatomical fixation, tendon repair & early kinetic sports rehabilitation',
    description: 'Emergency and elective biological fracture fixation with low-contact titanium locking compression plates (MIPO).',
    procedures: ['Minimally Invasive Plating (MIPO)', 'Geriatric Hip PFN-A Nailing', 'Complex Intra-Articular Repair', 'Non-Union Bone Grafting'],
    angleDeg: 270,
    hotspots: [
      {
        id: 't-1',
        title: 'Femoral Head Articulation',
        subtitle: 'Proximal Bone Joint',
        x: '24%',
        y: '43%',
        color: '#38bdf8' // Blue
      },
      {
        id: 't-2',
        title: 'Anatomical Shaft Alignment',
        subtitle: 'Midshaft Femoral Cortex Stability',
        x: '32%',
        y: '55%',
        color: '#22d3ee' // Cyan
      },
      {
        id: 't-3',
        title: 'Locking Compression Plate (LCP)',
        subtitle: 'Titanium Low-Contact Osteosynthesis',
        x: '47%',
        y: '51%',
        color: '#34d399' // Green
      },
      {
        id: 't-4',
        title: 'Fracture Line Reduction',
        subtitle: 'Interfragmentary Micro-compression Zone',
        x: '46%',
        y: '57%',
        color: '#f87171' // Red
      },
      {
        id: 't-5',
        title: 'Bicortical Locking Screws',
        subtitle: 'Rigid Multi-axial Angular Stability',
        x: '55%',
        y: '55%',
        color: '#a855f7' // Purple
      },
      {
        id: 't-6',
        title: 'Distal Metaphyseal Transition',
        subtitle: 'Condylar Articular Load Base',
        x: '70%',
        y: '53%',
        color: '#fbbf24' // Orange
      }
    ]
  },
  {
    id: 'knee',
    name: 'Knee Arthroscopy & ACL',
    badge: 'Keyhole Sports Care',
    categoryBadge: 'KNEE ARTHROSCOPY & SPORTS',
    image: getAssetUrl('assets/images/knee-anatomy-clean.jpg'),
    caption: 'ACL/PCL keyhole repair, Meniscal preservation & Cartilage restoration',
    description: 'Minimally invasive 4mm keyhole procedures for ligament tears, meniscal damage, and cartilage preservation.',
    procedures: ['All-Inside ACL/PCL Reconstruction', 'Meniscal Repair & Preservation', 'MPFL Patellar Stabilization', 'OATS Cartilage Restoration'],
    angleDeg: 0,
    hotspots: [
      {
        id: 'k-1',
        title: 'Femoral Condyle Cartilage',
        subtitle: 'Smooth Weight-Bearing Articular Zone',
        x: '38%',
        y: '32%',
        color: '#38bdf8'
      },
      {
        id: 'k-2',
        title: 'Anterior Cruciate Ligament (ACL)',
        subtitle: 'Keyhole All-Inside Graft Reconstruction',
        x: '52%',
        y: '48%',
        color: '#34d399'
      },
      {
        id: 'k-3',
        title: 'Medial Meniscus Cushion',
        subtitle: 'Shock-Absorbing Fibrocartilage Preserved with Sutures',
        x: '36%',
        y: '56%',
        color: '#f87171'
      },
      {
        id: 'k-4',
        title: 'Lateral Meniscus Horn',
        subtitle: 'Radial & Complex Tear Micro-Repair Zone',
        x: '63%',
        y: '55%',
        color: '#a855f7'
      },
      {
        id: 'k-5',
        title: 'Tibial Plateau Base',
        subtitle: 'Subchondral Kinetic Load Distribution',
        x: '50%',
        y: '68%',
        color: '#fbbf24'
      }
    ]
  },
  {
    id: 'joint-replacement',
    name: 'Robotic Joint Replacement',
    badge: 'Sub-Millimeter CUVIS / MAKO',
    categoryBadge: 'ROBOTIC JOINT REPLACEMENT',
    image: getAssetUrl('assets/images/joint-replacement-clean.jpg'),
    caption: 'Kinematic alignment, walk in 4 hours & 25-30 year implant longevity',
    description: 'Robotic-assisted joint replacement for knee and hip ensuring personalized kinematic alignment and zero muscle cutting.',
    procedures: ['Robotic Total Knee Replacement', 'Robotic Partial Knee Replacement', 'Ceramic Total Hip Arthroplasty', 'Reverse Shoulder Replacement'],
    angleDeg: 90,
    hotspots: [
      {
        id: 'j-1',
        title: 'Femoral Titanium-Cobalt Component',
        subtitle: 'Sub-millimeter Robotically Milled Contour',
        x: '35%',
        y: '30%',
        color: '#38bdf8'
      },
      {
        id: 'j-2',
        title: 'Ultra-High Molecular Polyethylene Insert',
        subtitle: 'Ultra-low Friction Articular Bearing',
        x: '35%',
        y: '52%',
        color: '#22d3ee'
      },
      {
        id: 'j-3',
        title: 'Tibial Baseplate Component',
        subtitle: 'Kinematic Alignment & Bone Preservation',
        x: '35%',
        y: '72%',
        color: '#34d399'
      },
      {
        id: 'j-4',
        title: 'Acetabular Hip Shell & Ceramic Head',
        subtitle: 'Anatomical Dual-mobility Hip Arthroplasty',
        x: '68%',
        y: '32%',
        color: '#f87171'
      },
      {
        id: 'j-5',
        title: 'Femoral Hip Stem Fixation',
        subtitle: 'Biological Hydroxyapatite Osseointegration',
        x: '72%',
        y: '65%',
        color: '#a855f7'
      }
    ]
  },
  {
    id: 'shoulder',
    name: 'Shoulder Arthroscopy',
    badge: 'Rotational Freedom',
    categoryBadge: 'SHOULDER ARTHROSCOPY',
    image: getAssetUrl('assets/images/shoulder-anatomy-clean.jpg'),
    caption: 'Rotator cuff repair, Bankart labrum stabilization & frozen shoulder release',
    description: 'Keyhole restoration of shoulder stability, overhead mobility, and pain-free sleep using double-row suture bridge technology.',
    procedures: ['Rotator Cuff Double-Row Repair', 'Bankart Labral Stabilization', 'Latarjet Bone Block Transfer', '360° Capsular Release'],
    angleDeg: 180,
    hotspots: [
      {
        id: 's-1',
        title: 'Acromion & Clavicle Arch',
        subtitle: 'Subacromial Decompression & Spur Resection',
        x: '45%',
        y: '22%',
        color: '#38bdf8'
      },
      {
        id: 's-2',
        title: 'Supraspinatus Rotator Cuff Tendon',
        subtitle: 'Double-Row SutureBridge Bio-Fixation',
        x: '32%',
        y: '38%',
        color: '#34d399'
      },
      {
        id: 's-3',
        title: 'Humeral Head Cartilage',
        subtitle: 'Ball-and-Socket Articular Surface',
        x: '38%',
        y: '52%',
        color: '#22d3ee'
      },
      {
        id: 's-4',
        title: 'Glenoid Labrum & Biceps Anchor',
        subtitle: 'Bankart / SLAP Repair Stabilization',
        x: '54%',
        y: '46%',
        color: '#f87171'
      },
      {
        id: 's-5',
        title: '4.0mm Keyhole Portal Access',
        subtitle: 'Minimally Invasive Arthroscopic Optical Pathway',
        x: '64%',
        y: '62%',
        color: '#a855f7'
      }
    ]
  }
];

interface RotatingShowcaseProps {
  onOpenBooking: (subject: string) => void;
}

export const RotatingShowcase: React.FC<RotatingShowcaseProps> = ({ onOpenBooking }) => {
  const [selectedPod, setSelectedPod] = useState<OrbitPod | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // When a pod opens, set default active hotspot or reset
  useEffect(() => {
    if (selectedPod && selectedPod.hotspots.length > 0) {
      setActiveHotspot(selectedPod.hotspots[0]);
    } else {
      setActiveHotspot(null);
    }
  }, [selectedPod]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPod(null);
      }
    };
    if (selectedPod) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPod]);
    return (
    <div className="relative flex flex-col items-center justify-center py-2 sm:py-6 select-none overflow-hidden max-w-full">
      {/* Caption Beacon */}
      <div className="mb-4 sm:mb-6 inline-flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3 sm:px-5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-cyan-300 shadow-sm shadow-cyan-500/20 backdrop-blur-md text-center">
        <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
        <span>Clockwise 3D Orbit • Tap Any Joint</span>
      </div>

      {/* Orbit Arena Stage */}
      <div className="relative flex h-[270px] w-[270px] xs:h-[310px] xs:w-[310px] sm:h-[400px] sm:w-[400px] items-center justify-center group my-1 sm:my-2">
        {/* Halo Background Glows */}
        <div className="absolute h-[250px] w-[250px] xs:h-[290px] xs:w-[290px] sm:h-[360px] sm:w-[360px] rounded-full bg-radial from-cyan-500/20 via-sky-500/10 to-transparent pointer-events-none blur-2xl" />
        
        {/* Dashed Orbital Rings */}
        <div className="absolute h-[200px] w-[200px] xs:h-[240px] xs:w-[240px] sm:h-[330px] sm:w-[330px] rounded-full border-2 border-dashed border-cyan-500/40 pointer-events-none animate-spin-slow" />
        <div className="absolute h-[150px] w-[150px] xs:h-[180px] xs:w-[180px] sm:h-[230px] sm:w-[230px] rounded-full border border-sky-500/30 pointer-events-none" />

        {/* Central Hub Emblem */}
        <div className="relative z-10 flex h-16 w-16 xs:h-18 xs:w-18 sm:h-26 sm:w-26 flex-col items-center justify-center rounded-full border-2 border-cyan-400 bg-gradient-to-tr from-cyan-600 via-sky-600 to-sky-500 shadow-2xl shadow-cyan-500/40">
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse pointer-events-none" />
          <Stethoscope size={18} className="text-white drop-shadow-md sm:hidden" />
          <Stethoscope size={26} className="text-white drop-shadow-md hidden sm:block" />
          <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider text-white mt-0.5 text-center px-0.5 leading-none">
            DR. SHASHI
          </span>
          <span className="text-[6px] sm:text-[8px] font-bold text-cyan-100">ORTHOCARE</span>
        </div>

        {/* Orbit Rotating Track */}
        <div className="absolute h-[200px] w-[200px] xs:h-[240px] xs:w-[240px] sm:h-[330px] sm:w-[330px] rounded-full animate-rotateClockwise group-hover:[animation-play-state:paused]">
          {pods.map((pod, idx) => {
            let posClass = '';
            if (idx === 0) posClass = 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2'; // Left (Trauma 3D)
            if (idx === 1) posClass = 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'; // Top (Knee)
            if (idx === 2) posClass = 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2'; // Right (Robotic)
            if (idx === 3) posClass = 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'; // Bottom (Shoulder)

            return (
              <div key={pod.id} className={`absolute ${posClass}`}>
                {/* Counter-rotating container keeps content upright */}
                <div className="animate-counterRotate group-hover:[animation-play-state:paused]">
                  <button
                    onClick={() => setSelectedPod(pod)}
                    className="relative flex h-16 w-16 xs:h-18 xs:w-18 sm:h-26 sm:w-26 flex-col items-center justify-center rounded-2xl border-2 border-sky-500/40 bg-[#071226]/95 p-1 sm:p-1.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/40 focus-visible:outline-2 focus-visible:outline-cyan-400"
                  >
                    <img
                      src={pod.image}
                      alt={pod.name}
                      className="h-8 w-8 xs:h-10 xs:w-10 sm:h-14 sm:w-14 rounded-xl object-cover border border-sky-500/30"
                    />
                    <div className="mt-0.5 max-w-[55px] xs:max-w-[65px] sm:max-w-[80px] truncate text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-white">
                      {pod.name.split(' ')[0]}
                    </div>
                    <div className="text-[6px] xs:text-[7px] sm:text-[8px] font-semibold text-cyan-400">
                      Tap View
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Helper text below orbit */}
      <div className="mt-3 text-center text-[11px] sm:text-xs text-slate-400 px-2">
        Tap any rotating joint orb to view 3D interactive details
      </div>

      {/* Interactive 3D Anatomy Lightbox Dialog with Interactive Hotspots */}
      {selectedPod && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 sm:p-6 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[92vh] overflow-y-auto w-full max-w-4xl rounded-2xl md:rounded-3xl border border-slate-800/90 bg-[#0a1120] p-4 sm:p-6 text-white shadow-2xl">
            {/* Top Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="rounded-full border border-sky-500/40 bg-sky-950/60 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-400 shadow-sm shrink-0">
                  {selectedPod.categoryBadge}
                </span>
                <h3 className="text-sm sm:text-base md:text-xl font-bold text-white truncate max-w-[180px] xs:max-w-xs sm:max-w-md">
                  {selectedPod.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Click dot to view part name</span>
                </div>
                <button
                  onClick={() => setSelectedPod(null)}
                  aria-label="Close dialog"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Medical Viewfinder Image Area with Corner Brackets & Hotspots */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-800 bg-[#050b14] select-none">
              {/* Corner Viewfinder Reticles */}
              <div className="absolute top-2.5 left-2.5 h-4 w-4 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none z-10" />
              <div className="absolute top-2.5 right-2.5 h-4 w-4 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none z-10" />
              <div className="absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none z-10" />
              <div className="absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none z-10" />

              {/* Anatomy Image */}
              <img
                src={selectedPod.image}
                alt={selectedPod.name}
                className="h-full w-full object-contain md:object-cover bg-[#050b14]"
              />

              {/* Interactive Hotspot Dots */}
              {selectedPod.hotspots.map((dot) => {
                const isActive = activeHotspot?.id === dot.id;
                return (
                  <div
                    key={dot.id}
                    style={{ top: dot.y, left: dot.x }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    {/* Active Tooltip Popover attached to Dot */}
                    {isActive && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-30 pointer-events-none animate-fadeIn">
                        <div className="rounded-lg border border-sky-400/50 bg-[#0c182d]/95 px-3 py-1.5 shadow-2xl backdrop-blur-md text-left min-w-[120px] whitespace-nowrap">
                          <div className="text-xs font-bold text-white">{dot.title}</div>
                          <div className="text-[10px] text-sky-300 font-medium">{dot.subtitle}</div>
                        </div>
                        <div className="w-2 h-2 bg-[#0c182d] border-r border-b border-sky-400/50 transform rotate-45 mx-auto -mt-1" />
                      </div>
                    )}

                    {/* Dot Trigger Button */}
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : dot)}
                      onMouseEnter={() => setActiveHotspot(dot)}
                      className="group relative flex h-7 w-7 items-center justify-center focus:outline-none"
                      aria-label={dot.title}
                    >
                      <span
                        className="absolute h-full w-full rounded-full opacity-75 animate-ping"
                        style={{ backgroundColor: dot.color }}
                      />
                      <span
                        className={`relative rounded-full border-2 border-white shadow-lg transition-transform duration-200 ${
                          isActive ? 'h-4 w-4 scale-125' : 'h-3.5 w-3.5 group-hover:scale-115'
                        }`}
                        style={{ backgroundColor: dot.color }}
                      />
                    </button>
                  </div>
                );
              })}

              {/* Bottom Active Information Overlay inside Image Container */}
              {activeHotspot && (
                <div className="absolute bottom-3 left-3 right-3 z-30 animate-fadeIn rounded-xl border border-sky-500/40 bg-[#0c182d]/90 p-2.5 sm:p-3 text-white shadow-2xl backdrop-blur-md flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug truncate">
                      {activeHotspot.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-sky-300 font-medium truncate">
                      {activeHotspot.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="rounded-full p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                    aria-label="Dismiss detail"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Footer Row */}
            <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="text-slate-300 text-[11px] sm:text-xs leading-tight">{selectedPod.caption}</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-[11px] text-slate-400 hidden md:inline">Click any dot for details • Esc to exit</span>
                <button
                  onClick={() => {
                    const podName = selectedPod.name;
                    setSelectedPod(null);
                    onOpenBooking(`Consultation for ${podName}`);
                  }}
                  className="w-full sm:w-auto rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-500 transition-colors shadow-md shadow-sky-600/20 flex items-center justify-center gap-1.5"
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
