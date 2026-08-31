import React from 'react';
import {
  Target, Eye, ShieldCheck, Heart, Award, Cpu, BookOpen, Star,
  CheckCircle2, Sparkles, ArrowRight, Lightbulb, Compass, Globe
} from 'lucide-react';

export default function AboutBizra({ fontSize }) {
  return (
    <div className="w-full overflow-hidden" style={{ fontSize: `${fontSize}rem`, background: 'var(--bg-dark)' }}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 space-y-28">

        {/* ═══════════════════════════════════════
            SECTION 1: INTRODUCTION HERO
        ═══════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7 space-y-7 animate-fade-in">
            <span className="badge-emerald inline-flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>About the National Initiative</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
              Empowering Rural Communities<br />
              <span className="text-gradient-emerald">Through Open Intelligence.</span>
            </h1>

            <p className="text-base leading-relaxed text-gray-300">
              BIZRA is a Government of India initiative designed specifically to empower rural entrepreneurs, local traders, farmers, and young innovators with data-driven insights, localized market dynamics, and structured expert assistance.
            </p>

            <p className="text-base leading-relaxed text-gray-300">
              Our principal mission is to accelerate the creation of a self-reliant rural economy by making complex governmental databases and market structures understandable, accessible, and highly actionable for every citizen.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Verified OGD Datasets</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>100% Free Public Utility</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-right delay-200">
            <div
              className="rounded-3xl p-10 flex flex-col justify-center min-h-[360px] relative overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(28,28,40,0.9) 0%, rgba(16,16,24,0.95) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-emerald-500/10 blur-xl" />
              <div className="space-y-6 relative z-10 text-center">
                <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-xl"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  🌾
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-xl text-white">100% Reliable Information</h3>
                  <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                    Directly connected to verified state and central databases to prevent misinformation and error.
                  </p>
                </div>

                <div className="flex justify-center gap-1.5 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <span className="inline-block text-[11px] uppercase font-bold tracking-widest text-emerald-400">
                  Government Verified Platform
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════
            SECTION 2: CORE PRINCIPLES (CREATIVE BOXES)
        ═══════════════════════════════════════ */}
        <section className="space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <p className="section-label justify-center">Foundation & Ethos</p>
            <h2 className="section-heading">Our Core Principles</h2>
            <p className="section-sub mx-auto text-center mt-2">
              The foundation of everything we build for rural business development and economic decentralization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'A prosperous, self-reliant rural India where every local entrepreneur thrives and achieves sustainable economic independence.',
                accent: 'text-emerald-400',
                glow: 'rgba(16,185,129,0.15)',
                tag: 'Prosperity'
              },
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To unlock public databases and enable open, structured, and highly accessible business feasibility decisions.',
                accent: 'text-blue-400',
                glow: 'rgba(59,130,246,0.15)',
                tag: 'Democratization'
              },
              {
                icon: Cpu,
                title: 'What We Do',
                desc: 'Provide AI-driven market analysis, regional competition metrics, risk profiling, and local supply opportunity maps.',
                accent: 'text-amber-400',
                glow: 'rgba(250,188,9,0.15)',
                tag: 'Intelligence'
              },
              {
                icon: Heart,
                title: 'Our Promise',
                desc: 'To offer completely transparent reports, accessible guides, and continuous assistance throughout your startup journey.',
                accent: 'text-rose-400',
                glow: 'rgba(244,63,94,0.15)',
                tag: 'Commitment'
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all hover-lift group cursor-default"
                style={{
                  background: 'linear-gradient(150deg, rgba(28,28,40,0.85) 0%, rgba(18,18,26,0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.35)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(16,185,129,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
                }}
              >
                <div className="space-y-4">
                  {/* Creative Icon Box */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: `0 0 20px ${card.glow}`,
                    }}
                  >
                    <card.icon size={26} className={card.accent} />
                  </div>

                  <span className="inline-block text-[10px] font-black uppercase tracking-wider text-gray-400">
                    {card.tag}
                  </span>

                  <h3 className="font-extrabold text-lg text-white group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-gray-300">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <CheckCircle2 size={13} />
                  <span>Core Pillar</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════════════════════════════════
            SECTION 3: INSTITUTIONAL PILLARS BAND
        ═══════════════════════════════════════ */}
        <section
          className="rounded-3xl p-8 sm:p-10 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(28,28,40,0.9) 0%, rgba(18,18,26,0.95) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, label: 'Government Initiative', sub: 'Official Digital India backing' },
              { icon: BookOpen, label: 'Open Data Platform', sub: 'Fully transparent public stats' },
              { icon: Cpu, label: 'AI-Powered Insights', sub: 'Algorithmic feasibility models' },
              { icon: ShieldCheck, label: 'Rural Empowerment', sub: 'Accelerating regional growth' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.25)',
                  }}
                >
                  <item.icon size={24} style={{ color: 'var(--gold)' }} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-sm font-bold text-white">{item.label}</span>
                  <span className="block text-xs text-gray-400">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
