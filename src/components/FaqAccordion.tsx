import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { faqsData, clinicInfo } from '../data/clinicData';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Robotic Surgery', 'Arthroscopy', 'Conservative Spine', 'Insurance & Payment', 'Regenerative PRP'];

  const filteredFaqs = selectedCategory === 'All'
    ? faqsData
    : faqsData.filter((f) => f.category.toLowerCase() === selectedCategory.toLowerCase());

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-3xl border border-sky-500/20 bg-[#081325]/90 p-6 md:p-10 text-slate-200 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-sky-500/15 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <HelpCircle size={14} className="text-cyan-400" />
            Patient Information &amp; Guidance
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">
            Frequently Asked Clinical Questions
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Transparent answers regarding robotic knee replacement, keyhole arthroscopy, recovery times, and cashless insurance.
          </p>
        </div>

        {/* Ask Question Direct Button */}
        <a
          href={`${clinicInfo.whatsappUrl}&text=Hello%20Dr.%20Shashi%27s%20Clinic,%20I%20have%20a%20question%20regarding%20orthopedic%20treatment.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20"
        >
          <MessageCircle size={15} /> Ask a Question on WhatsApp
        </a>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="FAQ Categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'bg-[#040914] text-slate-400 hover:text-white border border-sky-500/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3" role="region" aria-label="FAQ List">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? 'border-cyan-400/50 bg-cyan-950/20 shadow-md ring-1 ring-cyan-500/30'
                  : 'border-slate-800 bg-[#040914]/80 hover:border-cyan-500/30 hover:bg-[#081224]'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                id={`faq-header-${faq.id}`}
                className="flex w-full items-center justify-between gap-4 p-4 md:p-5 text-left text-sm md:text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300 border border-cyan-400/30">
                    ?
                  </span>
                  {faq.question}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                  {isOpen ? <Minus size={16} className="text-cyan-400" /> : <Plus size={16} />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-header-${faq.id}`}
                  className="px-4 pb-5 pt-1 text-xs md:text-sm leading-relaxed text-slate-300 border-t border-sky-500/15 pl-13 animate-fadeIn"
                >
                  <p>{faq.answer}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 border border-cyan-400/30">
                    Category: {faq.category}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
