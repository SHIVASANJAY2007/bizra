import React from 'react';
import {
  Target, Eye, ShieldCheck, Heart, Award, Cpu, BookOpen, Star,
  CheckCircle2, Sparkles
} from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import Parallax from './animations/Parallax';

export default function AboutBIZRA() {
  return (
    <div className="w-full bg-[#0b0f19] text-slate-100 section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">

        {/* 1. Intro Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <ScrollReveal animation="slide-right" className="lg:col-span-7 space-y-6">
            <span className="badge-emerald">
              <Sparkles size={12} />
              <span>National Open Data Initiative</span>
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Empowering Rural Communities Through{' '}
              <span className="text-gradient-emerald">Open Intelligence.</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal">
              BIZRA is a Government of India initiative designed specifically to empower rural entrepreneurs, local traders, farmers, and young innovators with data-driven insights, localized market dynamics, and structured expert assistance.
            </p>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal">
              Our principal mission is to accelerate the creation of a self-reliant rural economy by making complex governmental databases and market structures understandable, accessible, and highly actionable for every citizen.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Verified OGD Datasets</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>100% Free Public Utility</span>
              </div>
            </div>
          </ScrollReveal>

          <Parallax speed={0.1} className="lg:col-span-5">
            <div className="BIZRA-card p-8 text-center space-y-6 border-emerald-500/30">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto">
                🌾
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-white">100% Reliable Information</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  Directly connected to verified state and central databases to eliminate misinformation.
                </p>
              </div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                Government Verified Platform
              </span>
            </div>
          </Parallax>
        </section>

        {/* 2. Core Principles */}
        <section className="space-y-12">
          <ScrollReveal animation="fade-up" className="text-center max-w-xl mx-auto space-y-3">
            <span className="badge-gold">Foundation &amp; Ethos</span>
            <h2 className="text-white font-bold tracking-tight text-3xl md:text-5xl">Our Core Principles</h2>
            <p className="text-slate-300 text-sm md:text-base">
              The foundation of everything we build for rural business development and economic decentralization.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'A prosperous, self-reliant rural India where every local entrepreneur thrives and achieves sustainable economic independence.',
                tag: 'Prosperity'
              },
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To unlock public databases and enable open, structured, and highly accessible business feasibility decisions.',
                tag: 'Democratization'
              },
              {
                icon: Cpu,
                title: 'What We Do',
                desc: 'Provide AI-driven market analysis, regional competition metrics, risk profiling, and local supply opportunity maps.',
                tag: 'Intelligence'
              },
              {
                icon: Heart,
                title: 'Our Promise',
                desc: 'To offer completely transparent reports, accessible guides, and continuous assistance throughout your startup journey.',
                tag: 'Commitment'
              },
            ].map((card, i) => (
              <div key={i} className="BIZRA-card p-6 h-full flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <card.icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {card.tag}
                  </span>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 size={13} />
                  <span>Core Pillar</span>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </section>

        {/* 3. Pillars Band */}
        <section className="BIZRA-card p-8 md:p-10 border-emerald-500/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, label: 'Government Initiative', sub: 'Official Digital India backing' },
              { icon: BookOpen, label: 'Open Data Platform', sub: 'Fully transparent public stats' },
              { icon: Cpu, label: 'AI-Powered Insights', sub: 'Algorithmic feasibility models' },
              { icon: ShieldCheck, label: 'Rural Empowerment', sub: 'Accelerating regional growth' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-amber-400">
                  <item.icon size={20} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">{item.label}</span>
                  <span className="block text-[10px] text-slate-400 font-medium">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
