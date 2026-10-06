import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { reviewsData } from '../data/clinicData';

export const ReviewCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<{ [key: string]: boolean }>({});

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const current = reviewsData[activeIndex];

  return (
    <div className="rounded-3xl border border-sky-500/20 bg-[#081325]/90 p-6 md:p-10 text-slate-200 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-sky-500/15 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <ShieldCheck size={14} className="text-cyan-400" />
            Verified Google Reviews (5.0 ★ Rating)
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
            Real Patient Recoveries &amp; Surgical Outcomes
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Read verified testimonials from patients who underwent keyhole arthroscopy, robotic joint replacement, and trauma surgery.
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevReview}
            aria-label="Previous review"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/20 bg-[#040914] text-slate-300 transition-all hover:bg-cyan-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-bold text-slate-400">
            {activeIndex + 1} / {reviewsData.length}
          </span>
          <button
            onClick={nextReview}
            aria-label="Next review"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/20 bg-[#040914] text-slate-300 transition-all hover:bg-cyan-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Featured Active Card */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-[#0a1830] to-[#061020] p-6 md:p-8 shadow-xl shadow-cyan-950/20">
        <Quote className="absolute right-6 top-6 h-24 w-24 text-cyan-500/10 pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-sky-400 font-bold text-slate-950 text-base shadow-md">
              {current.initials}
            </div>
            <div>
              <h4 className="font-bold text-base text-white">{current.author}</h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <CheckCircle2 size={13} className="text-cyan-400" />
                <span>{current.source}</span>
                <span>•</span>
                <span>{current.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Treatment Badge */}
        <div className="mb-4 inline-block rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/30">
          Procedure: {current.treatment}
        </div>

        {/* Snippet / Full Text */}
        <div className="text-sm md:text-base leading-relaxed text-slate-200 font-medium italic">
          "{expandedReviews[current.id] ? current.fullReview : current.snippet}"
        </div>

        {/* Toggle Read Full */}
        <div className="mt-4 pt-3 border-t border-sky-500/20 flex items-center justify-between">
          <button
            onClick={() => toggleExpand(current.id)}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            {expandedReviews[current.id] ? 'Show Less' : 'Read Full Patient Case Experience →'}
          </button>
          <span className="text-[11px] text-slate-400">Restored Pain-Free Mobility</span>
        </div>
      </div>

      {/* Mini Thumbnails Strip */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {reviewsData.map((rev, idx) => (
          <button
            key={rev.id}
            onClick={() => setActiveIndex(idx)}
            className={`rounded-xl border p-2.5 text-left transition-all ${
              activeIndex === idx
                ? 'border-cyan-400 bg-cyan-950/50 shadow-md ring-1 ring-cyan-400'
                : 'border-slate-800 bg-[#040914]/80 hover:bg-[#0c1830] text-slate-400'
            }`}
          >
            <div className={`text-xs font-bold truncate ${activeIndex === idx ? 'text-white' : 'text-slate-300'}`}>{rev.author}</div>
            <div className="text-[10px] text-cyan-400 font-semibold truncate">{rev.treatment.split(' ')[0]}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
