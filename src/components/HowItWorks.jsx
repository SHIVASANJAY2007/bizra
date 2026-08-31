import React from 'react';
import {
  MapPin, Lightbulb, BarChart3, FileText, TrendingUp, HelpCircle,
  Target, Users2, FileSpreadsheet, IndianRupee, Compass, CheckCircle2,
  Sparkles, ArrowRight, ShieldCheck, Layers, Cpu
} from 'lucide-react';

export default function HowItWorks({ fontSize }) {
  const steps = [
    {
      num: '01',
      icon: MapPin,
      title: 'Choose Location',
      desc: 'Select your state, district, and village block. Our AI immediately connects with census demographics and local road networks.',
      accent: 'text-emerald-400',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'border-emerald-500/30',
      badge: 'Step 1'
    },
    {
      num: '02',
      icon: Lightbulb,
      title: 'Enter Idea & Budget',
      desc: 'Pick your sector (retail, agritech, dairy, crafts, services) and set your investment capacity and space availability.',
      accent: 'text-amber-400',
      bgGlow: 'rgba(250, 188, 9, 0.15)',
      borderColor: 'border-amber-500/30',
      badge: 'Step 2'
    },
    {
      num: '03',
      icon: BarChart3,
      title: 'AI Synthesizes Market',
      desc: 'Our engine overlays government trade records, supplier distances, nearby competitors, and seasonal demand indices.',
      accent: 'text-blue-400',
      bgGlow: 'rgba(59, 130, 246, 0.15)',
      borderColor: 'border-blue-500/30',
      badge: 'Step 3'
    },
    {
      num: '04',
      icon: FileText,
      title: 'Instant Action Report',
      desc: 'Review your personalized Opportunity Score, full SWOT breakdown, licensing steps, and government subsidy matches.',
      accent: 'text-purple-400',
      bgGlow: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'border-purple-500/30',
      badge: 'Step 4'
    },
    {
      num: '05',
      icon: TrendingUp,
      title: 'Launch & Flourish',
      desc: 'Download bank-ready PDF proposals for Mudra / PMEGP loan approval and follow step-by-step setup checklists.',
      accent: 'text-rose-400',
      bgGlow: 'rgba(244, 63, 94, 0.15)',
      borderColor: 'border-rose-500/30',
      badge: 'Step 5'
    },
  ];

  const deliverables = [
    {
      icon: Target,
      title: 'Market Potential Score',
      desc: 'A unified percentage feasibility score based on local demand volumes, purchasing power, and consumer proximity.',
      tag: '0–100% Viability Metric',
      accent: 'text-emerald-400',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    },
    {
      icon: Users2,
      title: 'Competition Density Map',
      desc: 'Detailed mapping of existing businesses in a 10km radius to prevent over-saturation and pinpoint supply gaps.',
      tag: 'Radius Radius Intelligence',
      accent: 'text-blue-400',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
    },
    {
      icon: FileSpreadsheet,
      title: 'SWOT Intelligence Matrix',
      desc: 'Detailed Strengths, Weaknesses, Opportunities, and Threats breakdown matched specifically to your product line.',
      tag: 'Strategic Risk Analysis',
      accent: 'text-purple-400',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
    },
    {
      icon: IndianRupee,
      title: 'Subsidy & Capital Guide',
      desc: 'Recommended startup budget, working capital requirements, and direct eligibility matches for PMEGP and Mudra loans.',
      tag: 'Up to 35% Capital Aid',
      accent: 'text-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    {
      icon: Compass,
      title: 'Growth Action Roadmap',
      desc: 'Chronological timeline covering trade licensing, FSSAI / GST permits, machinery sourcing, and local sales channels.',
      tag: 'Step-by-Step Execution',
      accent: 'text-rose-400',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
    },
  ];

  return (
    <div className="w-full overflow-hidden" style={{ fontSize: `${fontSize}rem`, background: 'var(--bg-dark)' }}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 space-y-28">

        {/* ═══════════════════════════════════════
            SECTION 1: WORKFLOW HEADER & 5 STEPS
        ═══════════════════════════════════════ */}
        <section className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto animate-fade-in">
            <span className="badge-emerald">Platform Workflow</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: 'var(--text-white)' }}>
              How BIZRA Works
            </h1>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, var(--emerald), var(--gold))' }} />
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#cbd5e1' }}>
              Our AI pipeline transforms raw government census, transport, and mandi records into a clear 5-step roadmap for your enterprise.
            </p>
          </div>

          {/* 5 Step Creative Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all hover-lift group cursor-default"
                style={{
                  background: 'linear-gradient(160deg, rgba(26,26,38,0.9) 0%, rgba(16,16,24,0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(16,185,129,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
                }}
              >
                {/* Card Top: Icon Box + Step Number */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                    style={{
                      width: '52px',
                      height: '52px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: `0 0 20px ${step.bgGlow}`,
                    }}
                  >
                    <step.icon size={24} className={step.accent} />
                  </div>
                  
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Card Body: Title + Description */}
                <div className="space-y-2 flex-grow">
                  <h3 className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>
                    {step.desc}
                  </p>
                </div>

                {/* Card Bottom Indicator */}
                <div className="pt-3 flex items-center gap-1 text-[11px] font-bold" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'var(--emerald-bright)' }}>
                  <CheckCircle2 size={13} />
                  <span>Verified Step</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════════════════════════════════
            SECTION 2: "WHAT YOU RECEIVE" LUXURY BENTO
        ═══════════════════════════════════════ */}
        <section className="space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <p className="section-label justify-center">Comprehensive Deliverables</p>
            <h2 className="section-heading">What You Receive in Every Report</h2>
            <p className="section-sub mx-auto text-center mt-2">
              Each generated report contains institutional-grade intelligence modules designed for bank loans and business setup.
            </p>
          </div>

          {/* 5 Creative Deliverable Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all hover-lift group cursor-default"
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
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    <item.icon size={26} className={item.accent} />
                  </div>

                  {/* Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${item.badgeColor}`}>
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 flex items-center justify-between text-xs font-bold" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'var(--gold)' }}>Govt. Backed</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Sparkles size={12} />
                    <span>Active</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════════════════════════════════
            SECTION 3: ADVISOR HELP & FAQ STRIP
        ═══════════════════════════════════════ */}
        <section
          className="rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(20,20,30,0.9) 60%, rgba(10,10,15,0.95) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-xl animate-pulse-glow"
              style={{
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.3)',
              }}
            >
              <HelpCircle size={30} style={{ color: 'var(--gold)' }} />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">
                Need Help Interpreting Your Feasibility Report?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
                Our regional support coordinators can assist you with parameter evaluations, license documentation, and bank applications.
              </p>
            </div>
          </div>

          <a
            href="mailto:support@data.gov.in"
            className="btn btn-accent text-sm font-extrabold px-8 py-4 rounded-2xl shrink-0 flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
          >
            <span>Contact Advisor</span>
            <ArrowRight size={16} />
          </a>
        </section>

      </div>
    </div>
  );
}
