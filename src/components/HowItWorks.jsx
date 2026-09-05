import React from 'react';
import {
  MapPin, Lightbulb, BarChart3, FileText, TrendingUp, HelpCircle,
  Target, Users2, FileSpreadsheet, IndianRupee, Compass, CheckCircle2,
  Sparkles, ArrowRight
} from 'lucide-react';
import ScrollReveal from './animations/ScrollReveal';
import Parallax from './animations/Parallax';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: MapPin,
      title: 'Choose Location',
      desc: 'Select your state, district, and village block. Our AI connects with census demographics and local transport networks.',
    },
    {
      num: '02',
      icon: Lightbulb,
      title: 'Enter Idea & Budget',
      desc: 'Pick your sector (retail, agritech, dairy, crafts, services) and set your investment capacity and space availability.',
    },
    {
      num: '03',
      icon: BarChart3,
      title: 'AI Synthesizes Market',
      desc: 'Our engine overlays government trade records, supplier distances, nearby competitors, and seasonal demand indices.',
    },
    {
      num: '04',
      icon: FileText,
      title: 'Instant Action Report',
      desc: 'Review your personalized Opportunity Score, full SWOT breakdown, licensing steps, and government subsidy matches.',
    },
    {
      num: '05',
      icon: TrendingUp,
      title: 'Launch & Flourish',
      desc: 'Download bank-ready PDF proposals for Mudra / PMEGP loan approval and follow step-by-step setup checklists.',
    },
  ];

  const deliverables = [
    {
      icon: Target,
      title: 'Market Potential Score',
      desc: 'A unified percentage feasibility score based on local demand volumes, purchasing power, and consumer proximity.',
      tag: '0–100% Viability Metric',
    },
    {
      icon: Users2,
      title: 'Competition Density Map',
      desc: 'Detailed mapping of existing businesses in a 10km radius to prevent over-saturation and pinpoint supply gaps.',
      tag: '10km Radius Intelligence',
    },
    {
      icon: FileSpreadsheet,
      title: 'SWOT Intelligence Matrix',
      desc: 'Detailed Strengths, Weaknesses, Opportunities, and Threats breakdown matched specifically to your product line.',
      tag: 'Strategic Risk Analysis',
    },
    {
      icon: IndianRupee,
      title: 'Subsidy & Capital Guide',
      desc: 'Recommended startup budget, working capital requirements, and direct eligibility matches for PMEGP and Mudra loans.',
      tag: 'Up to 35% Capital Aid',
    },
    {
      icon: Compass,
      title: 'Growth Action Roadmap',
      desc: 'Chronological timeline covering trade licensing, FSSAI / GST permits, machinery sourcing, and local sales channels.',
      tag: 'Step-by-Step Execution',
    },
  ];

  return (
    <div className="w-full bg-white text-gray-900 section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">

        {/* 1. Workflow Header & 5 Steps Grid */}
        <section className="space-y-12">
          <ScrollReveal animation="fade-up" className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2EA8A4]/20 text-[#2EA8A4] border border-[#2EA8A4]/30">Platform Workflow</span>
            <h1 className="text-gray-900 font-bold tracking-tight text-3xl md:text-5xl">
              How BIZRA Works
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Our AI pipeline transforms raw government census, transport, and mandi records into a clear 5-step roadmap for your enterprise.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="h-full flex flex-col justify-between p-5 rounded-2xl bg-gray-100 border border-gray-200 hover:border-[#2EA8A4]/60 transition-all shadow-lg group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#2EA8A4]/10 border border-[#2EA8A4]/30 flex items-center justify-center text-[#2EA8A4]">
                      <step.icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#2EA8A4] bg-[#2EA8A4]/10 px-2.5 py-0.5 rounded-full border border-[#2EA8A4]/20">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 group-hover:text-[#2EA8A4] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#2EA8A4]">
                  <CheckCircle2 size={13} />
                  <span>Verified Step</span>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </section>

        {/* 2. Deliverables Section */}
        <section className="space-y-12">
          <ScrollReveal animation="fade-up" className="text-center space-y-3 max-w-xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#4B6E77]/30 text-gray-500 border border-gray-200">Comprehensive Deliverables</span>
            <h2 className="text-gray-900 font-bold tracking-tight text-3xl md:text-5xl">What You Receive in Every Report</h2>
            <p className="text-gray-500 text-sm md:text-base">
              Institutional-grade intelligence modules designed for bank loan approvals and business setup.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-100 border border-gray-200 rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-[#2EA8A4]/60 transition-colors shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#2EA8A4]">
                      <item.icon size={20} />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#2EA8A4]/20 text-[#2EA8A4] border border-[#2EA8A4]/30">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 group-hover:text-[#2EA8A4] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-500">Government Backed</span>
                  <span className="flex items-center gap-1 text-[#2EA8A4]">
                    <Sparkles size={12} /> Active
                  </span>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </section>

        {/* 3. Advisor Strip */}
        <Parallax speed={0.1}>
          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2EA8A4]/10 border border-[#2EA8A4]/30 flex items-center justify-center shrink-0 text-[#2EA8A4]">
                <HelpCircle size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900">Need Assistance Interpreting Your Report?</h3>
                <p className="text-xs text-gray-500">
                  Our regional support coordinators assist with parameter evaluation, permits, and bank proposals.
                </p>
              </div>
            </div>

            <a
              href="mailto:support@data.gov.in"
              className="px-6 py-3 font-semibold rounded-xl text-xs shrink-0 flex items-center gap-2 bg-[#2EA8A4] text-white hover:bg-[#258B87] transition-all"
            >
              <span>Contact Regional Advisor</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </Parallax>

      </div>
    </div>
  );
}
