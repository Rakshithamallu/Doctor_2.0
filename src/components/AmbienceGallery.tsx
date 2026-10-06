import React, { useState, useEffect } from 'react';
import { ambienceImages, surgicalWorkImages, clinicInfo } from '../data/clinicData';
import { X, ZoomIn, Building2, ArrowLeft } from 'lucide-react';

export const AmbienceGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ambience' | 'surgical'>('ambience');
  const [activeModalImage, setActiveModalImage] = useState<{ image: string; title: string } | null>(null);

  const displayList = activeTab === 'ambience' ? ambienceImages : surgicalWorkImages;

  // Handle ESC key to exit lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalImage(null);
      }
    };
    if (activeModalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalImage]);

  return (
    <div className="rounded-3xl border border-sky-500/25 bg-[#081224] p-6 md:p-10 text-white shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <Building2 size={14} />
            CLINICAL EXCELLENCE &amp; AMBIENCE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
            Inside {clinicInfo.brandName}
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Aseptic surgical environments, comfortable patient lounges, and advanced orthopaedic technology.
          </p>
        </div>

        {/* Gallery Tab Switcher */}
        <div className="flex rounded-xl bg-[#071226]/90 p-1 border border-sky-500/30 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('ambience')}
            className={`rounded-lg px-3.5 py-1.5 transition-all ${
              activeTab === 'ambience' ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Clinic Ambience ({ambienceImages.length})
          </button>
          <button
            onClick={() => setActiveTab('surgical')}
            className={`rounded-lg px-3.5 py-1.5 transition-all ${
              activeTab === 'surgical' ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Surgical Cases ({surgicalWorkImages.length})
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayList.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalImage(item)}
            className="group relative h-48 overflow-hidden rounded-2xl border border-sky-500/20 bg-slate-900/90 cursor-pointer shadow-sm transition-all duration-300 hover:scale-103 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate drop-shadow-md">
                {item.title}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow">
                <ZoomIn size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Dedicated Top Navigation Bar */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950/90 p-4 sm:p-6 backdrop-blur-md animate-fadeIn select-none"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalImage(null)}
        >
          {/* Top Control Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between gap-4 z-20 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back Button */}
            <button
              onClick={() => setActiveModalImage(null)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-sky-600 hover:border-sky-400 active:scale-95"
              aria-label="Back to gallery"
            >
              <ArrowLeft size={16} />
              <span>Back to Gallery</span>
            </button>

            {/* Photo Title in Top Bar */}
            <div className="hidden sm:block text-xs sm:text-sm font-bold text-slate-200 truncate max-w-md">
              {activeModalImage.title} &bull; {clinicInfo.brandName}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setActiveModalImage(null)}
              aria-label="Close image lightbox"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all hover:bg-red-500 hover:border-red-400 active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Centered Image Container */}
          <div 
            className="relative flex-1 flex items-center justify-center w-full max-w-5xl my-auto py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeModalImage.image}
              alt={activeModalImage.title}
              className="max-h-[72vh] sm:max-h-[76vh] w-auto max-w-full rounded-2xl border-2 border-sky-400/60 shadow-2xl object-contain bg-slate-900"
            />
          </div>

          {/* Bottom Title Bar */}
          <div 
            className="z-20 pt-2 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl bg-slate-900/90 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-300 backdrop-blur-md border border-slate-800 shadow-lg inline-block">
              {activeModalImage.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
