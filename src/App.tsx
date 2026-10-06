import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  MapPin,
  Clock3,
  Award,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Activity,
  Cpu,
  Sparkles,
  Compass,
  MessageSquare,
  Star
} from 'lucide-react';

import {
  clinicInfo,
  specialtiesData,
  fellowshipsData,
  facilitiesData,
  SpecialtyCategory,
  TreatmentItem
} from './data/clinicData';

import { RotatingShowcase } from './components/RotatingShowcase';
import { AnatomyExplorer } from './components/AnatomyExplorer';
import { RoboticComparator } from './components/RoboticComparator';
import { SymptomChecker } from './components/SymptomChecker';
import { AmbienceGallery } from './components/AmbienceGallery';
import { AppointmentModal } from './components/AppointmentModal';
import { ReviewCarousel } from './components/ReviewCarousel';
import { FaqAccordion } from './components/FaqAccordion';
import { TreatmentDetailModal } from './components/TreatmentDetailModal';
import { CustomPreloader } from './components/CustomPreloader';
import { ShoulderArthroscopyVisual } from './components/ShoulderArthroscopyVisual';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeToolTab, setActiveToolTab] = useState<'orbit' | 'anatomy' | 'robotic' | 'triage'>('orbit');
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState<string>('all');
  
  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPreselectedSubject, setBookingPreselectedSubject] = useState<string>('Orthopaedic Consultation');

  // Treatment Detail Modal State
  const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentItem | null>(null);
  const [selectedTreatmentSpecialty, setSelectedTreatmentSpecialty] = useState<SpecialtyCategory | null>(null);

  const openBooking = (subject?: string) => {
    setBookingPreselectedSubject(subject || 'Orthopaedic Consultation');
    setBookingModalOpen(true);
  };

  const openTreatmentDetail = (treatment: TreatmentItem, specialty: SpecialtyCategory) => {
    setSelectedTreatment(treatment);
    setSelectedTreatmentSpecialty(specialty);
    setTreatmentModalOpen(true);
  };

  // Scroll Reveal Observer
  useEffect(() => {
    const handleScrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      const windowHeight = window.innerHeight;

      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScrollReveal, { passive: true });
    // Initial trigger
    handleScrollReveal();

    return () => window.removeEventListener('scroll', handleScrollReveal);
  }, []);

  const filteredSpecialties = activeSpecialtyFilter === 'all'
    ? specialtiesData
    : specialtiesData.filter((s) => s.id === activeSpecialtyFilter);

  const heroConditionTags = [
    'Robotic Knee Replacement',
    'ACL / PCL Ligament',
    'Rotator Cuff Repair',
    'Slipped Disc',
    'Sciatica & Spine',
    'Knee Arthritis',
    'Shoulder Dislocation',
    'Fracture Trauma',
    'PRP Biologics'
  ];

  return (
    <div className="min-h-screen bg-[#040914] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Custom Clinical Initial Preloader */}
      <CustomPreloader />

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-sky-500/20 bg-[#040914]/90 backdrop-blur-md shadow-lg shadow-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-2.5 xs:px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          {/* Brand Logo & Doctor Title */}
          <a
            href="#top"
            className="flex items-center gap-2 sm:gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-xl transition-transform hover:opacity-95"
            data-testid="link-brand-home"
          >
            <div className="relative flex h-9 w-9 xs:h-10 xs:w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900/90 shadow-md shadow-cyan-500/20 border border-sky-500/30 p-0.5 overflow-hidden">
              <img
                src={clinicInfo.logoImage}
                alt={clinicInfo.brandName}
                className="h-full w-full object-contain"
              />
              <div className="absolute -inset-0.5 rounded-2xl bg-cyan-400/20 blur-sm -z-10 animate-pulse-ring" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm md:text-base font-black tracking-tight text-white leading-tight whitespace-nowrap">
                {clinicInfo.brandName}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-400 whitespace-nowrap">
                <span className="hidden xs:inline">{clinicInfo.doctorName} • {clinicInfo.degrees}</span>
                <span className="xs:hidden">{clinicInfo.doctorName}</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 xl:gap-1.5 text-xs xl:text-[13px] font-semibold text-slate-300 xl:flex" aria-label="Primary Navigation">
            <a href="#specialties" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">Specialties</a>
            <a href="#interactive-suite" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">3D Anatomy</a>
            <a href="#doctor-profile" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">About Doctor</a>
            <a href="#facilities" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">Facilities</a>
            <a href="#gallery" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">Ambience</a>
            <a href="#reviews" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">Reviews</a>
            <a href="#faqs" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">FAQs</a>
            <a href="#contact" className="whitespace-nowrap rounded-lg px-2 py-1.5 transition-colors hover:bg-sky-950/70 hover:text-cyan-300">Contact</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Phone Button */}
            <a
              href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-sky-500/30 bg-sky-950/70 p-2 sm:px-3 sm:py-2 text-xs font-semibold text-cyan-300 transition-colors hover:bg-sky-900/80 shadow-2xs"
              data-testid="link-header-phone"
              aria-label={`Call ${clinicInfo.displayPhone}`}
            >
              <Phone size={14} className="text-cyan-400 shrink-0" />
              <span className="hidden md:inline">{clinicInfo.displayPhone}</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={() => openBooking('Header Priority Consultation')}
              className="button-lift inline-flex items-center gap-1 sm:gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-sky-400 active:scale-95"
              data-testid="button-header-book"
            >
              <span className="hidden xs:inline">Book Appointment</span>
              <span className="xs:hidden">Book Visit</span>
              <ArrowRight size={14} className="shrink-0 hidden sm:inline" />
            </button>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              className="rounded-xl border border-slate-700 bg-slate-800/90 p-2 text-slate-200 xl:hidden focus-visible:outline-2 focus-visible:outline-cyan-400"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-sky-500/20 bg-[#060e20] px-4 sm:px-6 py-5 shadow-2xl xl:hidden animate-fadeIn">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
              <a href="#specialties" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Specialties &amp; Procedures</a>
              <a href="#interactive-suite" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">3D Anatomy &amp; Diagnostic Tools</a>
              <a href="#doctor-profile" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">About Dr. Shashikumar</a>
              <a href="#facilities" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Diagnostic Facilities</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Clinic Ambience &amp; Cases</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Patient Reviews (5.0 ★)</a>
              <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Frequently Asked Questions</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-300">Location &amp; Timings</a>

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
                <button
                  onClick={() => { setMobileMenuOpen(false); openBooking('Mobile Navigation Booking'); }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3 text-sm font-bold text-slate-950 shadow-md shadow-cyan-500/20"
                >
                  Book Appointment <ArrowRight size={16} />
                </button>
                <a
                  href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-sky-500/30 bg-sky-950/70 py-2.5 text-sm font-semibold text-cyan-300"
                >
                  <Phone size={15} className="text-cyan-400" /> Call {clinicInfo.displayPhone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO SECTION WITH 3D VISUAL & DARK PALETTE */}
        <section className="relative overflow-hidden clinical-mesh-bg subtle-mesh-pattern pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-28 border-b border-sky-500/20">
          {/* Animated Background Glows */}
          <div className="hero-bg-glow" />
          <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              {/* Hero Left Column with Cascading Animations */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
                {/* Hero Badge */}
                <div className="animate-fadeInUp">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3.5 py-1 text-[11px] sm:text-xs font-bold text-cyan-300 shadow-sm shadow-cyan-500/20">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Advanced Orthopaedic &amp; Spine Excellence</span>
                  </div>
                </div>

                {/* Main Hero Title */}
                <h1 className="animate-fadeInUp delay-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.16]">
                  Precision Orthopaedic &amp;<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-500">
                    Spine Care
                  </span> for a Pain-Free Life
                </h1>

                {/* Subtitle */}
                <p className="animate-fadeInUp delay-200 text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Advanced treatment, keyhole arthroscopy, robotic joint replacement, and modern spine rehabilitation tailored for every patient. Led by <strong className="text-white">{clinicInfo.doctorName}</strong> in Mysuru.
                </p>

                {/* Animated Condition Tags Strip */}
                <div className="animate-fadeInUp delay-300 flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {heroConditionTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-sky-500/30 bg-slate-900/80 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-slate-200 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:bg-sky-950 hover:text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Action Buttons */}
                <div className="animate-fadeInUp delay-400 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-2 w-full sm:w-auto">
                  <button
                    onClick={() => openBooking('Hero Priority Consultation')}
                    className="button-lift inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3 sm:py-3.5 text-sm md:text-base font-extrabold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-sky-400 active:scale-95"
                  >
                    <Calendar size={18} />
                    <span>Book Appointment</span>
                  </button>

                  <a
                    href="#interactive-suite"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 sm:py-3.5 text-sm md:text-base font-semibold text-slate-200 shadow-xs transition-colors hover:bg-slate-800 hover:text-cyan-300"
                  >
                    <span>Explore Treatments</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

                {/* Animated Hero Stats Row */}
                <div className="animate-fadeInUp delay-500 pt-4 border-t border-sky-500/20 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
                      9+
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
                      1,000+
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Surgeries Done</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300 flex items-center gap-1">
                      5.0 <Star size={15} className="fill-amber-400 text-amber-400 inline" />
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Star Rating</div>
                  </div>
                </div>
              </div>

              {/* Hero Right Column: Shoulder Arthroscopy Visual & Surgeon Badge */}
              <div className="lg:col-span-5 relative flex items-center justify-center animate-fadeInUp delay-300">
                <ShoulderArthroscopyVisual />
              </div>
            </div>
          </div>

          {/* Hero Info Ribbon Strip */}
          <div className="mt-12 sm:mt-16 border-t border-b border-sky-500/20 bg-[#060e20]/90 py-3.5 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <MapPin size={16} className="text-cyan-400 shrink-0" />
                  <span>
                    <strong className="text-white">19, 10th Cross, Opp. MORE Supermarket</strong>, JP Nagar, Mysuru
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Phone size={16} className="text-cyan-400 shrink-0" />
                  <span>
                    <a href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-cyan-300 hover:underline">
                      {clinicInfo.displayPhone}
                    </a> &bull; <a href={`tel:${clinicInfo.secondaryPhone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                      {clinicInfo.secondaryPhone}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Clock3 size={16} className="text-cyan-400 shrink-0" />
                  <span>
                    Mon - Sat: <strong className="text-white">5:30 PM - 8:30 PM</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP SECTION */}
        <section className="border-b border-sky-500/20 bg-[#050c1a] py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              {clinicInfo.stats.map((stat, idx) => (
                <div key={idx} className="relative flex flex-col items-center justify-center p-2 sm:p-4 reveal">
                  <div className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-500">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-bold text-white">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] text-slate-400 leading-snug max-w-[200px]">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE CLINICAL INNOVATION SUITE (DARK THEME) */}
        <section id="interactive-suite" className="py-14 sm:py-20 bg-gradient-to-b from-[#040914] via-[#071329] to-[#040914] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 reveal">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3.5 py-1 text-xs font-bold text-cyan-300">
                <Activity size={14} />
                INTERACTIVE PATIENT SUITE
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mt-3">
                Clockwise 3D Anatomy Orbit &amp; Diagnostic Tools
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2">
                Explore rotating joint structures, compare robotic precision, or triage your joint symptoms.
              </p>

              {/* Tool Switcher Tabs */}
              <div className="mt-6 sm:mt-8 w-full overflow-x-auto no-scrollbar flex sm:inline-flex sm:flex-wrap justify-start sm:justify-center rounded-2xl bg-[#071226]/90 p-1.5 border border-sky-500/30 gap-1" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeToolTab === 'orbit'}
                  onClick={() => setActiveToolTab('orbit')}
                  className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs md:text-sm font-bold transition-all ${
                    activeToolTab === 'orbit'
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles size={15} /> 3D Rotating Orbit
                </button>
                <button
                  role="tab"
                  aria-selected={activeToolTab === 'anatomy'}
                  onClick={() => setActiveToolTab('anatomy')}
                  className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs md:text-sm font-bold transition-all ${
                    activeToolTab === 'anatomy'
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity size={15} /> Joint Anatomy Explorer
                </button>
                <button
                  role="tab"
                  aria-selected={activeToolTab === 'robotic'}
                  onClick={() => setActiveToolTab('robotic')}
                  className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs md:text-sm font-bold transition-all ${
                    activeToolTab === 'robotic'
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu size={15} /> Robotic Comparator
                </button>
                <button
                  role="tab"
                  aria-selected={activeToolTab === 'triage'}
                  onClick={() => setActiveToolTab('triage')}
                  className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs md:text-sm font-bold transition-all ${
                    activeToolTab === 'triage'
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass size={15} /> Symptom Triage
                </button>
              </div>
            </div>

            {/* Interactive Tool Output Container */}
            <div className="reveal">
              {activeToolTab === 'orbit' && (
                <div className="rounded-3xl border border-sky-500/25 bg-[#071022]/90 p-3.5 xs:p-4 sm:p-6 md:p-10 shadow-2xl backdrop-blur-xl">
                  <RotatingShowcase onOpenBooking={(subject) => openBooking(subject)} />
                </div>
              )}

              {activeToolTab === 'anatomy' && (
                <AnatomyExplorer
                  onSelectTreatment={(jointId) => {
                    const el = document.getElementById('specialties');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    setActiveSpecialtyFilter(jointId);
                  }}
                  onOpenBooking={(subject) => openBooking(subject)}
                />
              )}

              {activeToolTab === 'robotic' && (
                <RoboticComparator
                  onOpenBooking={(subject) => openBooking(subject)}
                />
              )}

              {activeToolTab === 'triage' && (
                <SymptomChecker
                  onOpenBooking={(subject) => openBooking(subject)}
                />
              )}
            </div>
          </div>
        </section>

        {/* SPECIALTIES & PROCEDURES SECTION */}
        <section id="specialties" className="py-14 sm:py-20 bg-[#040914] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3.5 py-1 text-xs font-bold text-cyan-300">
                  <Activity size={14} />
                  COMPREHENSIVE CLINICAL DIVISIONS
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mt-3">
                  Specialized Orthopaedic Care &amp; Procedures
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2 max-w-2xl">
                  From keyhole arthroscopic ligament restoration to precision robotic joint replacements and non-surgical spine therapies.
                </p>
              </div>

              {/* Specialty Filter Pills */}
              <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 sm:gap-2 w-full md:w-auto pb-1.5 sm:pb-0">
                <button
                  onClick={() => setActiveSpecialtyFilter('all')}
                  className={`whitespace-nowrap shrink-0 rounded-xl px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeSpecialtyFilter === 'all'
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40'
                  }`}
                >
                  All Specialties
                </button>
                {specialtiesData.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setActiveSpecialtyFilter(spec.id)}
                    className={`whitespace-nowrap shrink-0 rounded-xl px-3 sm:px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      activeSpecialtyFilter === spec.id
                        ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40'
                    }`}
                  >
                    {spec.shortTitle}
                  </button>
                ))}
              </div>
            </div>

            {/* Specialties Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredSpecialties.map((specialty) => (
                <div
                  key={specialty.id}
                  className="group flex flex-col justify-between rounded-3xl border border-sky-500/20 bg-[#081224] p-4 sm:p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 reveal"
                >
                  <div>
                    {/* Card Top Image & Badge */}
                    <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 mb-4 group-hover:border-cyan-400/40 transition-colors">
                      <img
                        src={specialty.image}
                        alt={specialty.name}
                        className="h-40 sm:h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="rounded-lg bg-cyan-500 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-slate-950 shadow">
                          {specialty.badge}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {specialty.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {specialty.summary}
                    </p>

                    {/* Key Highlights List */}
                    <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                      {specialty.keyHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Procedures Strip */}
                    <div className="mt-5 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Procedures &amp; Treatments:
                      </div>
                      {specialty.treatments.slice(0, 3).map((tr, idx) => (
                        <button
                          key={idx}
                          onClick={() => openTreatmentDetail(tr, specialty)}
                          className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-left text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/40 hover:bg-sky-950/50 hover:text-cyan-300"
                        >
                          <span className="truncate">{tr.title}</span>
                          <ChevronRight size={14} className="text-cyan-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => openBooking(`Consultation: ${specialty.name}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
                    >
                      Book Specialist Visit →
                    </button>
                    <button
                      onClick={() => openTreatmentDetail(specialty.treatments[0], specialty)}
                      className="rounded-lg bg-sky-950/80 border border-sky-500/30 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 hover:bg-sky-900/80"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCTOR BIO & SURGICAL FELLOWSHIPS */}
        <section id="doctor-profile" className="py-14 sm:py-20 bg-gradient-to-b from-[#040914] via-[#071329] to-[#040914] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              {/* Left Column: Doctor Profile & Credentials */}
              <div className="lg:col-span-5 space-y-6 reveal-left">
                <div className="relative overflow-hidden rounded-3xl border border-sky-500/25 bg-[#081224] p-4 sm:p-6 md:p-8 shadow-xl">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <img
                      src={clinicInfo.portraitImage}
                      alt={clinicInfo.doctorName}
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-md shrink-0"
                    />
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">
                        Lead Surgeon &amp; Founder
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {clinicInfo.doctorName}
                      </h3>
                      <p className="text-xs font-semibold text-slate-300">
                        {clinicInfo.degrees}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs md:text-sm leading-relaxed text-slate-300">
                    Dr. Shashikumar M S is a high-volume, fellowship-trained Orthopaedic &amp; Robotic Surgeon with over 9+ years of clinical and surgical expertise. Having trained at prestigious medical institutions (JSS Medical College, Mysore and AJIMS, Mangalore), he completed specialized super-fellowships in Arthroscopy, Robotic Arthroplasty, and Reconstructive Hand Trauma.
                  </p>

                  <div className="mt-5 rounded-2xl border border-sky-500/20 bg-sky-950/40 p-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Award size={15} className="text-amber-400" /> Academic &amp; Clinical Affiliations
                    </div>
                    <ul className="space-y-1.5 text-slate-300 pl-4 list-disc">
                      <li>Chief Consultant, Dr. Shashikumar's Ortho Clinic, JP Nagar</li>
                      <li>Consultant Orthopaedic Surgeon, JSS Hospital, Mysore</li>
                      <li>Life Member: Indian Orthopaedic Association (IOA)</li>
                      <li>Life Member: Karnataka Orthopaedic Association (KOA)</li>
                      <li>Member: Indian Arthroscopy Society (IAS)</li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => openBooking('Consultation with Dr. Shashikumar')}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3 text-xs md:text-sm font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-sky-400"
                    >
                      Book 1-on-1 Consultation with Dr. Shashi <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Super-Specialized Fellowships */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 reveal-right">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3.5 py-1 text-xs font-bold text-cyan-300">
                    <Award size={14} />
                    ADVANCED SURGICAL FELLOWSHIPS
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-2">
                    Super-Specialized International &amp; National Training
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Dr. Shashi has completed dedicated post-doctoral surgical fellowships ensuring modern micro-invasive and robotic techniques.
                  </p>
                </div>

                <div className="space-y-3.5 sm:space-y-4">
                  {fellowshipsData.map((f, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-sky-500/20 bg-[#081224] p-4 sm:p-5 shadow-sm transition-all hover:border-cyan-400/40 hover:bg-[#0a162c]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="rounded-md bg-cyan-500 px-2.5 py-1 text-xs font-black text-slate-950">
                          {f.code}
                        </span>
                        <span className="rounded-full bg-sky-950 px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-[11px] font-bold text-cyan-300 border border-sky-500/30">
                          {f.badge}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {f.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-400 mb-1.5 sm:mb-2">
                        {f.institution}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {f.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-slate-800">
                        {f.highlights.map((hl, i) => (
                          <span key={i} className="inline-flex items-center gap-1 rounded-lg bg-sky-950/60 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] text-cyan-300 border border-sky-500/20">
                            <CheckCircle2 size={12} className="text-cyan-400 shrink-0" /> {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FACILITIES & TECHNOLOGY */}
        <section id="facilities" className="py-14 sm:py-20 bg-[#050c1a] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 reveal">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3.5 py-1 text-xs font-bold text-cyan-300">
                <Activity size={14} />
                CLINICAL INFRASTRUCTURE
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mt-3">
                Cutting-Edge Diagnostic &amp; Clinical Facilities
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2">
                Equipped with hospital-grade digital diagnostics and modern procedural suites.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {facilitiesData.map((fac) => (
                <div
                  key={fac.id}
                  className="group rounded-3xl border border-sky-500/20 bg-[#081224] p-4 sm:p-5 shadow-md transition-all hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-xl reveal flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 mb-4">
                      <img
                        src={fac.image}
                        alt={fac.title}
                        className="h-40 sm:h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <span className="rounded-full bg-cyan-500 px-2.5 sm:px-3 py-1 text-[10px] font-bold text-slate-950 shadow">
                          {fac.badge}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] sm:text-[11px] text-cyan-400 uppercase tracking-wider font-semibold">
                      {fac.category}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {fac.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLINIC AMBIENCE & SURGICAL GALLERY */}
        <section id="gallery" className="py-14 sm:py-20 bg-[#040914] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8 reveal">
            <AmbienceGallery />
          </div>
        </section>

        {/* PATIENT REVIEWS & STORIES */}
        <section id="reviews" className="py-14 sm:py-20 bg-[#050c1a] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8 reveal">
            <ReviewCarousel />
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section id="faqs" className="py-14 sm:py-20 bg-[#040914] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8 reveal">
            <FaqAccordion />
          </div>
        </section>

        {/* CLINIC LOCATION, HOURS & EMERGENCY CONTACT */}
        <section id="contact" className="py-14 sm:py-20 bg-gradient-to-b from-[#050c1a] via-[#071329] to-[#040914] border-b border-sky-500/20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Contact Information Card */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-sky-500/25 bg-[#081224] p-4 sm:p-6 md:p-8 shadow-xl reveal">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3.5 py-1 text-xs font-bold text-cyan-300">
                    <MapPin size={14} />
                    VISIT OUR CLINIC
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-3">
                    Clinic Location &amp; Timings
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Centrally located in JP Nagar, Mysuru, with dedicated parking and rapid wheelchair access.
                  </p>

                  <div className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
                    {/* Address */}
                    <div className="flex items-start gap-3 rounded-2xl border border-sky-500/20 bg-sky-950/40 p-3.5 sm:p-4">
                      <MapPin size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Clinic Address</div>
                        <div className="text-slate-300 mt-0.5 leading-relaxed">
                          {clinicInfo.address.full}
                        </div>
                        <a
                          href={clinicInfo.address.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
                        >
                          Get Google Maps Driving Directions <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>

                    {/* Timings */}
                    <div className="flex items-start gap-3 rounded-2xl border border-sky-500/20 bg-sky-950/40 p-3.5 sm:p-4">
                      <Clock3 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Consultation Hours</div>
                        <div className="text-slate-300 mt-0.5">
                          <strong>Evening Clinic:</strong> {clinicInfo.timings.weekdays}
                        </div>
                        <div className="text-slate-400 text-xs mt-1">
                          {clinicInfo.timings.morningNote}
                        </div>
                      </div>
                    </div>

                    {/* Phone & WhatsApp */}
                    <div className="flex items-start gap-3 rounded-2xl border border-sky-500/20 bg-sky-950/40 p-3.5 sm:p-4">
                      <Phone size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Direct Clinical Desk</div>
                        <div className="text-slate-300 mt-0.5 flex flex-wrap gap-2.5 sm:gap-3">
                          <a href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-cyan-400 hover:underline">
                            {clinicInfo.displayPhone}
                          </a>
                          <span>•</span>
                          <a href={`tel:${clinicInfo.secondaryPhone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                            {clinicInfo.secondaryPhone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <button
                    onClick={() => openBooking('Clinic Visit Booking')}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3 text-xs md:text-sm font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-sky-400 active:scale-95"
                  >
                    <Calendar size={15} /> Book Appointment
                  </button>
                  <a
                    href={clinicInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/30 bg-sky-950/80 px-4 sm:px-5 py-3 text-xs md:text-sm font-bold text-cyan-300 hover:bg-sky-900/80"
                  >
                    <MessageSquare size={15} /> WhatsApp Desk
                  </a>
                </div>
              </div>

              {/* Fast Consultation Triage Card */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-sky-500/25 bg-[#081224] p-4 sm:p-6 md:p-8 shadow-xl reveal">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/70 px-3.5 py-1 text-xs font-bold text-amber-300">
                    <Sparkles size={14} />
                    FAST CLINICAL INQUIRY
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-3">
                    Need Immediate Advice or Second Opinion?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Upload MRI/X-Ray scans or describe your joint pain for a direct expert assessment from Dr. Shashikumar.
                  </p>

                  <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-3.5">
                    <div className="rounded-2xl border border-sky-500/20 bg-sky-950/40 p-3.5 sm:p-4">
                      <div className="font-bold text-xs md:text-sm text-white flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-cyan-400" /> Free WhatsApp Pre-Triage
                      </div>
                      <p className="mt-1 text-xs text-slate-300">
                        Share prior MRI reports, digital X-rays, or surgery recommendations to get an unbiased surgical vs conservative opinion.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-sky-500/20 bg-sky-950/40 p-3.5 sm:p-4">
                      <div className="font-bold text-xs md:text-sm text-white flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-cyan-400" /> 24/7 Fracture Emergency Triage
                      </div>
                      <p className="mt-1 text-xs text-slate-300">
                        In case of sudden falls, vehicular injuries, or acute joint dislocations, contact our emergency desk immediately.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-800">
                  <a
                    href={`${clinicInfo.whatsappUrl}&text=Hello%20Dr.%20Shashikumar%27s%20Clinic,%20I%20would%20like%20to%20send%20my%20MRI/X-Ray%20reports%20for%20a%20second%20opinion.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3.5 text-xs md:text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-sky-400 active:scale-95"
                  >
                    <MessageSquare size={16} /> Send Reports via WhatsApp Desk <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-sky-500/20 bg-[#020610] py-10 sm:py-14 text-slate-400 text-xs">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Brand Col */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-0.5 border border-slate-700 shadow-md overflow-hidden">
                  <img
                    src={clinicInfo.logoImage}
                    alt={clinicInfo.brandName}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="font-black text-sm text-white">
                  {clinicInfo.brandName}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Super-specialized robotic joint replacement, keyhole arthroscopic ligament reconstruction, sports medicine, trauma, and non-surgical spine care in Mysuru.
              </p>
              <div className="text-[11px] text-cyan-400 font-semibold">
                {clinicInfo.doctorName} ({clinicInfo.degrees})
              </div>
            </div>

            {/* Specialties Links */}
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-white mb-3">
                Clinical Specialties
              </div>
              <ul className="space-y-2">
                <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Knee Arthroscopy (ACL/Meniscus)</a></li>
                <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Robotic Knee Replacement (MAKO/CUVIS)</a></li>
                <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Shoulder Arthroscopy &amp; Rotator Cuff</a></li>
                <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Conservative Spine &amp; Sciatica Care</a></li>
                <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Fracture &amp; Complex Trauma Fixation</a></li>
                <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Regenerative PRP Therapy</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-white mb-3">
                Patient Resources
              </div>
              <ul className="space-y-2">
                <li><a href="#interactive-suite" className="hover:text-cyan-300 transition-colors">3D Clockwise Rotating Orbit</a></li>
                <li><a href="#interactive-suite" className="hover:text-cyan-300 transition-colors">Robotic vs Conventional Surgery</a></li>
                <li><a href="#interactive-suite" className="hover:text-cyan-300 transition-colors">Symptom Self-Assessment Triage</a></li>
                <li><a href="#gallery" className="hover:text-cyan-300 transition-colors">Clinic Ambience &amp; Facilities</a></li>
                <li><a href="#reviews" className="hover:text-cyan-300 transition-colors">Verified Patient Recoveries (5.0 ★)</a></li>
                <li><a href="#faqs" className="hover:text-cyan-300 transition-colors">Clinical FAQs &amp; Insurance</a></li>
              </ul>
            </div>

            {/* Contact & Hours */}
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-white mb-3">
                Clinic Coordinates
              </div>
              <div className="space-y-2 text-xs">
                <div>{clinicInfo.address.full}</div>
                <div className="text-white font-semibold">
                  Phone: <a href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-cyan-400 hover:underline">{clinicInfo.displayPhone}</a>
                </div>
                <div>Email: {clinicInfo.email}</div>
                <div className="text-emerald-400 font-medium">
                  {clinicInfo.timings.weekdays}
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Disclaimer & Copyright */}
          <div className="pt-8 border-t border-slate-800 text-[11px] leading-relaxed text-slate-500 space-y-2">
            <p>
              <strong className="text-slate-400">Medical Disclaimer:</strong> The information on this website is for educational and guidance purposes only and does not substitute professional in-person medical diagnosis, physical examination, or treatment. Consult Dr. Shashikumar M S or a qualified healthcare specialist for any medical condition.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div>
                © {new Date().getFullYear()} {clinicInfo.brandName}. All rights reserved.
              </div>
              <div className="flex gap-4">
                <span>WCAG 2.2 AA Compliant</span>
                <span>•</span>
                <span>Dr. Shashikumar M S Orthopaedic Practice</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialSubject={bookingPreselectedSubject}
      />

      <TreatmentDetailModal
        isOpen={treatmentModalOpen}
        onClose={() => setTreatmentModalOpen(false)}
        treatment={selectedTreatment}
        specialty={selectedTreatmentSpecialty}
        onOpenBooking={(subj) => openBooking(subj)}
      />
    </div>
  );
}

export default App;
