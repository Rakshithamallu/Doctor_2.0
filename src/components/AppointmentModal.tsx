import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, MessageSquare, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, initialSubject = '' }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialty, setSpecialty] = useState(initialSubject || 'Knee Arthroscopy & Sports Medicine');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Evening (5:30 PM - 8:30 PM)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setSpecialty(initialSubject);
    }
  }, [initialSubject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const message = `Hello Dr. Shashi's Ortho Clinic / Jisha Prime Orthocare,
Appointment Request:
• Patient Name: ${name || 'Prospective Patient'}
• Contact: ${phoneNumber}
• Specialty / Concern: ${specialty}
• Preferred Date: ${preferredDate || 'Earliest Available'}
• Preferred Time: ${timeSlot}
• Notes: ${notes || 'Standard clinical consultation'}`;

    window.open(`${clinicInfo.whatsappUrl}&text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-appointment-title"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-sky-500/25 bg-[#081325] p-4 sm:p-6 md:p-8 text-slate-200 shadow-2xl shadow-cyan-950/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3.5 sm:right-5 top-3.5 sm:top-5 rounded-full border border-sky-500/20 bg-[#040914] p-2 text-slate-400 transition-colors hover:bg-sky-500/20 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400 z-10"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Direct Clinical Consultation
            </div>
            <h3 id="modal-appointment-title" className="text-xl md:text-2xl font-bold text-white mt-1">
              Book Appointment with Dr. Shashikumar
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Senior Consultant Orthopaedic, Spine &amp; Robotic Surgeon • JP Nagar, Mysuru
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              {/* Name */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5" htmlFor="apt-name">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    id="apt-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter patient name"
                    className="w-full rounded-xl border border-sky-500/20 bg-[#040914] py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5" htmlFor="apt-phone">
                  Phone Number (WhatsApp Preferred) *
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    id="apt-phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-sky-500/20 bg-[#040914] py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Specialty */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5" htmlFor="apt-specialty">
                  Condition / Specialty Area
                </label>
                <select
                  id="apt-specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full rounded-xl border border-sky-500/20 bg-[#040914] py-2.5 px-3.5 text-xs text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <option value="Knee Arthroscopy & Sports Medicine" className="bg-[#081325]">Knee Arthroscopy (ACL / Meniscus Tear)</option>
                  <option value="Robotic Knee Replacement (MAKO/CUVIS)" className="bg-[#081325]">Robotic Joint Replacement (Knee / Hip)</option>
                  <option value="Shoulder Arthroscopy & Rotator Cuff" className="bg-[#081325]">Shoulder Arthroscopy (Cuff / Dislocation)</option>
                  <option value="Conservative Spine & Sciatica Care" className="bg-[#081325]">Spine Care (Disc Prolapse / Sciatica)</option>
                  <option value="Fracture & Trauma Fixation" className="bg-[#081325]">Fracture &amp; Bone Trauma</option>
                  <option value="Regenerative PRP & Joint Injections" className="bg-[#081325]">Regenerative PRP Therapy &amp; Arthritis</option>
                  <option value="Second Opinion / General Orthopaedic Consultation" className="bg-[#081325]">Second Surgical Opinion</option>
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5" htmlFor="apt-date">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      id="apt-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-xl border border-sky-500/20 bg-[#040914] py-2.5 pl-10 pr-3 text-xs text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5" htmlFor="apt-time">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock size={15} className="absolute left-3.5 top-3 text-slate-400" />
                    <select
                      id="apt-time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full rounded-xl border border-sky-500/20 bg-[#040914] py-2.5 pl-10 pr-3 text-xs text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="Evening (5:30 PM - 7:00 PM)" className="bg-[#081325]">5:30 PM - 7:00 PM (Evening)</option>
                      <option value="Evening (7:00 PM - 8:30 PM)" className="bg-[#081325]">7:00 PM - 8:30 PM (Evening)</option>
                      <option value="Special Case / Emergency Slot" className="bg-[#081325]">Emergency / Priority Slot</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5" htmlFor="apt-notes">
                  Additional Symptoms / MRI Details (Optional)
                </label>
                <textarea
                  id="apt-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe joint pain, duration, or if you already have X-rays..."
                  className="w-full rounded-xl border border-sky-500/20 bg-[#040914] py-2 px-3.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3.5 text-xs md:text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 active:scale-98"
                >
                  <MessageSquare size={16} /> Confirm &amp; Send to WhatsApp Desk <ArrowRight size={15} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck size={14} className="text-cyan-400" />
                <span>Zero spam • Instant confirmation via Clinic WhatsApp Desk</span>
              </div>
            </form>
          </div>
        ) : (
          /* Submitted Confirmation Card */
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">
              Appointment Request Transferred!
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your details have been forwarded to Dr. Shashikumar's clinical reception via WhatsApp. Our clinic coordinator will confirm your exact consultation queue number shortly.
            </p>
            <div className="pt-4 border-t border-sky-500/15">
              <button
                onClick={onClose}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:brightness-110"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
