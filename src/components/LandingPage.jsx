import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, TrendingUp, ShieldCheck, Database,
  Award, ArrowRight, ArrowLeft, Star, Users, CheckCircle,
  Lightbulb, MapPin, BarChart3, Zap, Sparkles,
  Globe, Leaf, Activity, Clock, ChevronDown, Calendar,
  Layers, ArrowUpRight, Compass, CheckCircle2
} from 'lucide-react';

/* ── Animated Counter Component ───────────────────────────────────── */
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState('0');
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const isDecimal = target.includes('.');
        const num = parseFloat(target.replace(/[^0-9.]/g, ''));
        const steps = 60;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / steps, 3);
          setCount(isDecimal ? (eased * num).toFixed(2) : Math.round(eased * num).toLocaleString());
          if (step >= steps) clearInterval(timer);
        }, 1800 / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Scroll Reveal Hook ───────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Main Landing Page Component ─────────────────────────────────── */
export default function LandingPage({ setCurrentTab, fontSize }) {
  useScrollReveal();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeAudience, setActiveAudience] = useState('aspiring');

  const testimonials = [
    { name: 'Rameshwar Singh', role: 'Dairy Farmer, Uttar Pradesh', text: 'BIZRA helped me understand market opportunities for my dairy business. The insights were easy to understand and incredibly actionable!', stars: 5, avatar: '👨🏽‍🌾' },
    { name: 'Kavitha Devi', role: 'Agri-Entrepreneur, Tamil Nadu', text: 'I found the right guidance for my agri-product startup. Simple, reliable, and made a real difference in my business planning.', stars: 5, avatar: '👩🏽‍🌾' },
    { name: 'Arjun Patil', role: 'Young Entrepreneur, Maharashtra', text: 'As a first-time entrepreneur, BIZRA gave me the confidence I needed with data-backed guidance. Highly recommended!', stars: 5, avatar: '👨🏽' },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [testimonials.length]);

  const audiences = {
    aspiring: {
      badge: '🚀 PRE-LAUNCH BLUEPRINT',
      title: 'Aspiring Entrepreneurs',
      desc: 'Formulate and validate your business plan with hyper-local census demographics, demand indices, and subsidized capital roadmaps.',
      icon: '🚀',
      pillColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      features: [
        { title: 'Pincode Market Reports', desc: 'Predictive local consumer demand & demographic volume index' },
        { title: 'PMEGP Subsidy Guidance', desc: 'Up to 35% government capital subsidy assistance matches' },
        { title: 'Regulatory Checklist', desc: 'Complete licensing, NOCs, GST, and trade permit sequence' },
        { title: 'Supplier Proximity Map', desc: 'Sourcing distances to wholesale mandis and machinery blocks' },
      ],
      stats: [
        { label: 'Recommended Capital', value: '₹50,000 – ₹3 Lakhs', sub: 'Low entry barrier' },
        { label: 'Break-Even Horizon', value: '6 – 9 Months', sub: 'High liquidity model' },
        { label: 'Viability Index', value: '88% High', sub: 'Verified across 12 sectors' }
      ]
    },
    existing: {
      badge: '📈 SCALE & EXPANSION',
      title: 'Existing Business Owners',
      desc: 'Unlock growth opportunities with deep regional pricing benchmarks, consumer preference shifts, and multi-district supply chain networks.',
      icon: '📈',
      pillColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      features: [
        { title: 'Seasonal Demand Forecasting', desc: 'Quarterly sales volume fluctuations and crop cycles' },
        { title: 'Competitor Density Alerts', desc: 'Real-time monitoring of nearby new venture registrations' },
        { title: 'Cold-Chain & Freight Linkage', desc: 'Transportation route efficiency & freight cost optimization' },
        { title: 'Bulk Machinery Grants', desc: 'Technology upgradation subsidy schemes (CLCSS) guidance' },
      ],
      stats: [
        { label: 'Margin Improvement', value: '+18% – 25%', sub: 'With direct sourcing' },
        { label: 'Customer Reach', value: '3.2× Expansion', sub: 'Across adjoining blocks' },
        { label: 'Efficiency Gain', value: '34% Lower Waste', sub: 'With seasonal planning' }
      ]
    },
    youth: {
      badge: '🎒 DIGITAL VENTURES',
      title: 'Rural Youth & Innovators',
      desc: 'Launch modern, tech-enabled rural startups spanning agritech, logistics, common service centers (CSCs), and local e-commerce.',
      icon: '🎒',
      pillColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      features: [
        { title: 'Drone & Agritech Blueprints', desc: 'Custom farm-tech service models with low initial outlay' },
        { title: 'Incubation Hub Access', desc: 'Direct links to state rural innovation centers and mentors' },
        { title: 'Digital Service Franchises', desc: 'Setup CSC, banking correspondent, and fintech portals' },
        { title: 'Micro-Venture Grants', desc: 'Startup India Seed Fund and state youth startup aid' },
      ],
      stats: [
        { label: 'Top Growth Domain', value: 'Agri-Logistics', sub: '42% YoY sector growth' },
        { label: 'Max Grant Aid', value: 'Up to ₹5 Lakhs', sub: 'Seed stage assistance' },
        { label: 'Skill Match Ratio', value: '94% Aligned', sub: 'Vocational compatibility' }
      ]
    },
    women: {
      badge: '👩🏽‍💼 WOMEN-LED ENTERPRISE',
      title: 'Women Entrepreneurs',
      desc: 'Dedicated support frameworks featuring concessional interest rates, SHG cluster linkages, and women-exclusive government grants.',
      icon: '👩🏽‍💼',
      pillColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      features: [
        { title: 'Mudra Scheme Special Quotas', desc: 'Tarun and Kishor loans with relaxed collateral terms' },
        { title: 'SHG Cluster Integration', desc: 'Shared packaging facilities and collective bargaining power' },
        { title: 'Direct Market Exhibitions', desc: 'Government SARAS melas and national export expos' },
        { title: 'Dedicated Mentorship', desc: 'Peer advisory forums and certified financial guidance' },
      ],
      stats: [
        { label: 'Interest Subvention', value: 'Up to 5% Off', sub: 'Concessional credit rates' },
        { label: 'Government Backing', value: '100% Guaranteed', sub: 'Under CGTMSE coverage' },
        { label: 'Cluster Access', value: '450+ SHGs', sub: 'Active partner networks' }
      ]
    },
  };

  const stats = [
    { num: '354773', suf: '+', label: 'Verified Resources', sub: 'Live public records', Icon: Database, color: 'text-emerald-400' },
    { num: '12518', suf: '+', label: 'Market Models', sub: 'Algorithmic benchmarks', Icon: Globe, color: 'text-blue-400' },
    { num: '12.60', suf: ' M+', label: 'Generated Reports', sub: 'Downloaded feasibility sheets', Icon: Activity, color: 'text-amber-400' },
    { num: '840', suf: '+', label: 'Chief Data Officers', sub: 'Govt. department leads', Icon: Users, color: 'text-purple-400' },
    { num: '500', suf: '+', label: 'Districts Covered', sub: 'Pan-India rural presence', Icon: MapPin, color: 'text-rose-400' },
  ];

  const challenges = [
    { icon: '📦', title: 'Siloed Government Data', desc: 'Critical agricultural, population, and mandi data are scattered across disconnected portals, making discovery difficult.', glow: 'var(--rose-glow)' },
    { icon: '🔍', title: 'Lack of Local Visibility', desc: 'Rural entrepreneurs struggle to assess local competitor density, demand volumes, and pricing patterns before investing.', glow: 'var(--blue-glow)' },
    { icon: '📊', title: 'Unprocessed Complex Data', desc: 'Raw governmental spreadsheets sit idle without intuitive AI synthesis to translate numbers into clear business action.', glow: 'var(--violet-glow)' },
    { icon: '⏳', title: 'Delayed Business Launch', desc: 'Navigating licensing, bank loan schemes, and subsidy documentation without guidance costs months of time and capital.', glow: 'var(--gold-glow)' },
  ];

  const steps = [
    { n: '01', t: 'Choose Location', d: 'Select state, district, or village block to load hyper-local census and transit data.', Icon: MapPin, c: 'from-emerald-400 to-green-600' },
    { n: '02', t: 'Select Category', d: 'Choose from retail, agriculture, processing, livestock, or modern services.', Icon: Lightbulb, c: 'from-amber-400 to-yellow-600' },
    { n: '03', t: 'AI Synthesizes', d: 'Engine runs demand projection, competitor radius maps, and risk indexing.', Icon: BarChart3, c: 'from-blue-400 to-blue-600' },
    { n: '04', t: 'Actionable Report', d: 'Receive your Opportunity Score, SWOT analysis, and matching subsidies.', Icon: CheckCircle, c: 'from-violet-400 to-purple-600' },
    { n: '05', t: 'Start & Flourish', d: 'Submit bank-ready PDFs, apply for subsidies, and track operational metrics.', Icon: TrendingUp, c: 'from-rose-400 to-red-600' },
  ];

  const updates = [
    {
      category: 'ANALYTICS RELEASE',
      tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      title: 'District Agriculture & Mandi Yield Metrics 2024–25',
      date: '11 May 2024',
      author: 'Ministry of Agriculture',
      desc: 'Comprehensive seasonal yield trends, fertilizer price indices, and procurement metrics updated across 400 rural districts.',
      stat: '400+ Districts',
      icon: Layers
    },
    {
      category: 'PLATFORM MILESTONE',
      tagColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      title: 'BIZRA Crosses 1 Million Registered Rural Founders',
      date: '03 May 2024',
      author: 'Digital India OGD Team',
      desc: 'Over one million rural citizens have now generated customized business feasibility sheets and bank loan proposals.',
      stat: '1,000,000+ Users',
      icon: Users
    },
    {
      category: 'CAPACITY BUILDING',
      tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      title: 'Live Workshop: Utilizing Open Data for Mudra Loans',
      date: '25 April 2024',
      author: 'MSME Development Institute',
      desc: 'Interactive training sessions with bank managers on how to present BIZRA opportunity reports for rapid credit approval.',
      stat: '8,500 Attendees',
      icon: Calendar
    },
  ];

  return (
    <div className="w-full overflow-hidden" style={{ fontSize: `${fontSize}rem`, background: 'var(--bg-dark)' }}>

      {/* ═══════════════════════════════════════
          SECTION 1: HERO (SPACIOUS 50/50 LAYOUT)
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col justify-center py-20 lg:py-28 overflow-hidden">
        <div className="mesh-gradient" style={{ top: '-180px', right: '-180px' }} />
        <div className="orb orb-emerald" style={{ top: '-100px', left: '-100px', opacity: 0.45 }} />
        <div className="orb orb-blue" style={{ bottom: '-60px', right: '-40px', opacity: 0.3 }} />

        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(var(--emerald) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: 50% Copy & CTAs */}
            <div className="lg:col-span-6 space-y-8">
              <div className="animate-fade-in">
                <span className="badge-emerald mb-6 inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--emerald)' }} />
                  AI-Powered Rural Business Intelligence
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.08] tracking-tight text-white">
                  Smart Insights.<br />
                  <span className="text-gradient-emerald">Stronger Rural</span><br />
                  Enterprises.
                </h1>
                <p className="text-base sm:text-lg leading-[1.6] max-w-lg mt-6 text-gray-300">
                  BIZRA synthesizes verified government databases into clear, actionable business viability reports — helping rural founders start, finance, and scale with conviction.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-fade-in delay-200">
                <button onClick={() => setCurrentTab('chatbot')}
                  className="btn btn-primary text-base px-8 py-4 rounded-2xl cursor-pointer">
                  Launch BIZRA AI Agent <ChevronRight size={18} />
                </button>
                <button onClick={() => setCurrentTab('how-it-works')}
                  className="btn btn-secondary text-base px-8 py-4 rounded-2xl cursor-pointer">
                  Explore Workflow <ArrowRight size={18} />
                </button>
              </div>

              {/* Trust Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 animate-fade-in delay-400">
                {[
                  { Icon: ShieldCheck, t: '100% Free', d: 'For All Citizens' },
                  { Icon: Lightbulb, t: 'AI-Powered', d: 'Smart Analysis' },
                  { Icon: Database, t: 'Gov. Verified', d: 'Official OGD Data' },
                  { Icon: MapPin, t: 'Hyper-Local', d: 'Pincode Level' },
                ].map((x, i) => (
                  <div key={i} className="glass-card p-4 rounded-2xl flex items-center gap-3 hover-lift cursor-default">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--border-emerald)' }}>
                      <x.Icon size={18} style={{ color: 'var(--emerald-bright)' }} />
                    </div>
                    <div>
                      <span className="font-bold text-xs block leading-tight text-white">{x.t}</span>
                      <span className="text-[10px] text-gray-400">{x.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 50% Visual Preview & Live Score */}
            <div className="lg:col-span-6 relative animate-fade-right delay-300">
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl animate-pulse-glow"
                style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg,#1a3a2a,#0d2818)', border: '1px solid var(--border-emerald)' }}>
                <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700 opacity-60"
                  style={{ backgroundImage: 'url("/hero_tractor.png")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-7">
                  <span className="glass-dark text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-2 w-fit text-emerald-300">
                    <span className="w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
                    🌾 Real-Time Local Intelligence
                  </span>
                  <div className="glass-dark rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full animate-ping bg-emerald-400" />
                      <span className="font-bold text-sm sm:text-base text-white">Coimbatore, TN</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-300">Dairy Products</span>
                    </div>
                    <span className="font-bold px-3.5 py-1.5 rounded-xl text-xs sm:text-sm shrink-0"
                      style={{ background: 'rgba(250,188,9,0.15)', color: 'var(--gold)', border: '1px solid rgba(250,188,9,0.3)' }}>
                      ₹ 1.2–2.5 L
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Score Dial */}
              <div className="absolute -top-6 -right-2 sm:-right-4 w-72 glass-dark rounded-[24px] shadow-2xl p-5 sm:p-6 animate-float z-20"
                style={{ border: '1px solid var(--border-light)' }}>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">Opportunity Score</span>
                  <span className="badge-gold text-[10px] py-0.5 px-2"><Sparkles size={9} /> Live</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle green" strokeDasharray="78, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-black leading-none text-white">78%</span>
                      <span className="text-[8px] font-bold uppercase text-emerald-400">HIGH</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs flex-1">
                    {[['Demand','High','text-emerald-400'],['Competition','Moderate','text-amber-400'],['Profit','High','text-emerald-400']].map(([k,v,c]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-gray-400">{k}</span>
                        <span className={`font-bold ${c}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 rounded-xl px-3 py-2 text-[11px] font-semibold text-center flex items-center justify-center gap-1.5"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid var(--border-emerald)', color: 'var(--emerald-bright)' }}>
                  <CheckCircle size={12} /> Govt. Verified Data
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30 animate-float">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Scroll</span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE TICKER
      ═══════════════════════════════════════ */}
      <div style={{ background: 'var(--bg-darkest)', borderTop: '1px solid var(--border-emerald)', borderBottom: '1px solid var(--border-emerald)' }}
        className="py-4 overflow-hidden">
        <div className="marquee-wrapper">
          <div className="marquee-track gap-12 items-center">
            {[...Array(4)].map((_, r) =>
              ['354,773+ Datasets Analyzed','Pan-India Pincode Coverage','12.6M+ Verified Downloads','840+ Data Officers','100% Free Public Service','AI Opportunity Scoring','Official Government Portal'].map((item, i) => (
                <span key={`${r}-${i}`} className="inline-flex items-center gap-3 font-semibold text-sm whitespace-nowrap shrink-0 mr-12 text-gray-300">
                  <Leaf size={13} style={{ color: 'var(--emerald)' }} />{item}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SECTION 2: CHALLENGES (2 × 2 CLEAN GRID)
      ═══════════════════════════════════════ */}
      <section className="py-24 lg:py-28 px-6 sm:px-10 lg:px-12 xl:px-16 relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-[1440px] w-full mx-auto">
          <div className="max-w-2xl mx-auto text-center reveal mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#fabc09] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#fabc09]">PROBLEM SPACE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
              The Challenges Rural Entrepreneurs Face
            </h2>
            <p className="text-base sm:text-lg leading-[1.5] text-gray-300 mt-4">
              BIZRA resolves the key informational barriers that stall rural startup growth before capital is committed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-children max-w-5xl mx-auto">
            {challenges.map((c, i) => (
              <div key={i} className="reveal p-7 sm:p-8 min-h-[180px] rounded-[24px] transition-all hover-lift group cursor-default"
                style={{
                  background: 'rgba(22, 22, 32, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
                  e.currentTarget.style.background = 'rgba(26, 26, 38, 0.85)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(22, 22, 32, 0.7)';
                }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {c.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white leading-snug">{c.title}</h3>
                </div>
                <p className="text-[15px] leading-[1.6] text-gray-300">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: HOW BIZRA WORKS (5 EQUAL COLUMNS)
      ═══════════════════════════════════════ */}
      <section className="py-24 lg:py-28 px-6 sm:px-10 lg:px-12 xl:px-16 relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(var(--emerald) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="mesh-gradient" style={{ bottom: '-300px', left: '-200px', opacity: 0.08 }} />

        <div className="max-w-[1440px] w-full mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto reveal mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#fabc09] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#fabc09]">PLATFORM WORKFLOW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
              How BIZRA Works
            </h2>
            <p className="text-base sm:text-lg leading-[1.5] text-gray-300 mt-4">
              From selecting your location to launching your business — our AI engine handles the complex synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 stagger-children">
            {steps.map(s => (
              <div key={s.n} className="reveal rounded-[24px] p-6 sm:p-7 min-h-[220px] flex flex-col justify-between space-y-4 transition-all hover-lift group cursor-default"
                style={{
                  background: 'linear-gradient(160deg, rgba(26,26,38,0.85) 0%, rgba(16,16,24,0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.c} shadow-lg flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110`}>
                    <s.Icon size={22} />
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400">
                    {s.n}
                  </span>
                </div>
                <div className="space-y-1.5 flex-grow pt-2">
                  <h3 className="font-extrabold text-base text-white group-hover:text-emerald-300 transition-colors">{s.t}</h3>
                  <p className="text-xs sm:text-[13px] leading-[1.55] text-gray-300">{s.d}</p>
                </div>
                <div className="pt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 border-t border-white/5">
                  <CheckCircle2 size={13} />
                  <span>Verified Step</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <button onClick={() => setCurrentTab('how-it-works')}
              className="btn btn-secondary px-8 py-3.5 rounded-2xl text-sm inline-flex items-center gap-2 cursor-pointer">
              View Full Methodology & Guide <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4: BIZRA BY THE NUMBERS (5 STATS)
      ═══════════════════════════════════════ */}
      <section className="py-20 lg:py-24 px-6 sm:px-10 lg:px-12 xl:px-16 relative overflow-hidden"
        style={{ background: 'var(--bg-darkest)' }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="orb orb-emerald" style={{ right: '-100px', top: '-100px', opacity: 0.2 }} />

        <div className="max-w-[1440px] w-full mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#fabc09] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#fabc09]">INSTITUTIONAL SCALE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
              BIZRA by the Numbers
            </h2>
            <p className="text-base sm:text-lg leading-[1.5] text-gray-300 mt-3">
              Empowering rural founders with national scale open government infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 stagger-children">
            {stats.map((s, i) => (
              <div key={i} className="reveal text-center glass-card p-6 sm:p-7 rounded-[24px] hover-lift group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)' }}>
                  <s.Icon size={22} className={s.color} />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1.5 text-white">
                  <AnimatedCounter target={s.num} suffix={s.suf} />
                </div>
                <div className="text-xs sm:text-sm font-bold mb-0.5 text-white">{s.label}</div>
                <div className="text-[11px] text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5: BUILT FOR EVERY RURAL FOUNDER (TAILORED PORTALS)
      ═══════════════════════════════════════ */}
      <section className="py-24 lg:py-28 px-5 sm:px-8 lg:px-12 xl:px-16 relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
        <div className="orb orb-blue" style={{ left: '-120px', top: '15%', opacity: 0.15 }} />
        
        <div className="max-w-[1440px] w-full mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-[1000px] mx-auto reveal mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-[#fabc09] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#fabc09]">TAILORED PORTALS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.08]">
              Built for Every Rural Founder
            </h2>
            <p className="max-w-[900px] mx-auto text-base sm:text-lg lg:text-[19px] leading-[1.5] text-gray-300 mt-4">
              Whether launching a first shop, modernizing a farm, or establishing a women-led cluster, BIZRA customizes its intelligence for you.
            </p>
          </div>

          {/* Interactive Audience Navigation Tabs */}
          <div className="flex justify-center reveal mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {[
                { id: 'aspiring', label: 'Aspiring Founders', emoji: '🚀' },
                { id: 'existing', label: 'Existing Businesses', emoji: '📈' },
                { id: 'youth', label: 'Rural Youth', emoji: '🎒' },
                { id: 'women', label: 'Women Entrepreneurs', emoji: '👩🏽‍💼' },
              ].map(a => {
                const isSelected = activeAudience === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setActiveAudience(a.id)}
                    className={`h-[46px] flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold shadow-[0_4px_16px_rgba(16,185,129,0.35)]'
                        : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 font-medium'
                    }`}
                  >
                    <span className="text-sm sm:text-base">{a.emoji}</span>
                    <span>{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════
              BALANCED 2-COLUMN BLUEPRINT CARD
          ══════════════════════════════════════ */}
          <div className="reveal rounded-[24px] p-8 sm:p-10 lg:p-11 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all w-full"
            style={{
              background: 'linear-gradient(150deg, rgba(26,26,38,0.85) 0%, rgba(14,14,20,0.95) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
              
              {/* Left Column (5 of 12 cols / ~42%): Badge, Heading, Description, 3 Metrics & CTA */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                <div className="mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-sm ${audiences[activeAudience].pillColor}`}>
                    {audiences[activeAudience].badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-white leading-tight">
                  {audiences[activeAudience].title}
                </h3>

                <p className="text-sm sm:text-[15px] leading-[1.6] mt-3 text-gray-300">
                  {audiences[activeAudience].desc}
                </p>

                {/* 3 Equal Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 lg:gap-4 mt-6">
                  {audiences[activeAudience].stats.map((s, idx) => (
                    <div key={idx} className="p-4 sm:p-5 rounded-[20px] min-h-[120px] transition-all hover-lift flex flex-col justify-between"
                      style={{
                        background: 'rgba(10, 10, 16, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                      }}>
                      <span className="text-[11px] sm:text-[12px] font-bold block uppercase tracking-wider text-gray-400 leading-tight">
                        {s.label}
                      </span>
                      <span className="text-base sm:text-lg lg:text-[19px] xl:text-[20px] font-black text-emerald-400 block mt-2 mb-1 leading-snug whitespace-nowrap">
                        {s.value}
                      </span>
                      <span className="text-[11px] sm:text-[12px] font-medium block text-gray-400 leading-snug">
                        {s.sub}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <button onClick={() => setCurrentTab('chatbot')}
                    className="w-full sm:w-[290px] h-[56px] btn btn-primary text-sm font-extrabold rounded-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-102 transition-transform">
                    <span>Launch BIZRA AI Agent</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right Column (7 of 12 cols / ~58%): 4 Recommendation Cards in Clean 2 × 2 Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {audiences[activeAudience].features.map((feat, idx) => (
                  <div key={idx} className="p-6 sm:p-7 rounded-[24px] min-h-[160px] flex flex-col justify-start space-y-0 transition-all hover-lift group cursor-default"
                    style={{
                      background: 'rgba(14, 14, 22, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(16,185,129,0.35)';
                      e.currentTarget.style.background = 'rgba(18, 24, 26, 0.85)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.background = 'rgba(14, 14, 22, 0.75)';
                    }}>
                    
                    {/* Glowing Emerald Icon Box */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-3.5 transition-transform group-hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: 'var(--emerald-bright)'
                      }}>
                      <CheckCircle2 size={22} />
                    </div>
                    
                    <h4 className="font-bold text-[15px] sm:text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors leading-snug mb-2">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] leading-[1.55] text-gray-300 max-w-[480px]">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ══════════════════════════════════════
              SPACER: 64px Vertical Gap to Official Bulletins
          ══════════════════════════════════════ */}
          <div className="mt-16 lg:mt-20" />

          {/* ══════════════════════════════════════
              SECTION 6: LATEST PLATFORM UPDATES (3 EQUAL TALL CARDS)
          ══════════════════════════════════════ */}
          <div className="space-y-10">
            
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-[2px] bg-[#fabc09] rounded-full" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#fabc09]">OFFICIAL BULLETINS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">Latest Platform Updates</h2>
                <p className="text-base sm:text-lg leading-[1.5] text-gray-300 mt-2">Verified notices, dataset additions, and national capacity-building events.</p>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-md self-start md:self-auto"
                style={{ background: 'var(--bg-surface)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--emerald-bright)' }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Real-Time OGD Sync</span>
              </div>
            </div>

            {/* 3 Equal-Width Bulletin Cards with 24px Gap */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
              {updates.map((u, i) => (
                <div key={i} className="reveal rounded-[24px] p-7 sm:p-8 flex flex-col justify-between space-y-6 transition-all hover-lift group cursor-pointer min-h-[260px]"
                  style={{
                    background: 'linear-gradient(160deg, rgba(24,24,34,0.85) 0%, rgba(14,14,20,0.95) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(16,185,129,0.35)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(16,185,129,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
                  }}>
                  
                  <div className="space-y-3.5">
                    {/* Date at Top + Category Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${u.tagColor}`}>
                        {u.category}
                      </span>
                      <span className="text-[11px] font-semibold flex items-center gap-1.5 text-gray-400">
                        <Clock size={12} className="text-gray-400" />
                        <span>{u.date}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-extrabold text-base lg:text-lg leading-snug text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                        {u.title}
                      </h3>
                      <p className="text-xs font-medium mt-1.5 text-gray-400">
                        Source: <span className="text-gray-300 font-semibold">{u.author}</span>
                      </p>
                    </div>

                    {/* 2–3 Line Description */}
                    <p className="text-xs sm:text-sm leading-[1.6] text-gray-300">
                      {u.desc}
                    </p>
                  </div>

                  {/* Bottom Strip Aligned Horizontally Across Cards */}
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <span className="text-xs sm:text-sm font-bold text-amber-400">
                      {u.stat}
                    </span>
                    <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-emerald-400 group-hover:text-emerald-300 transition-transform group-hover:translate-x-1">
                      <span>Read Briefing</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7: TESTIMONIALS (VOICES FROM RURAL INDIA)
      ═══════════════════════════════════════ */}
      <section className="py-24 lg:py-28 px-6 sm:px-10 lg:px-12 xl:px-16 relative overflow-hidden" style={{ background: 'var(--bg-darkest)' }}>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 0)', backgroundSize: '44px 44px' }} />
        <div className="orb orb-gold" style={{ right: '-80px', top: 0, opacity: 0.2 }} />
        <div className="orb orb-emerald" style={{ left: '-160px', bottom: '-80px', opacity: 0.12 }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="reveal mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#fabc09] rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest text-[#fabc09]">VOICES FROM RURAL INDIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.12]">
              Voices from Rural India
            </h2>
            <div className="w-14 h-1 mx-auto rounded-full mt-4"
              style={{ background: 'linear-gradient(90deg, var(--gold), var(--emerald))' }} />
          </div>

          <div className="reveal flex flex-col items-center justify-center px-4 sm:px-12 mb-10" style={{ minHeight: '180px' }}>
            <div className="text-6xl font-serif leading-none select-none mb-3 -mt-2" style={{ color: 'rgba(250,188,9,0.15)' }}>"</div>
            <p className="text-lg sm:text-xl italic font-medium leading-[1.65] max-w-2xl text-gray-200">
              {testimonials[activeTestimonial].text}
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-inner"
                style={{ background: 'var(--bg-surface)', border: '2px solid var(--border-light)' }}>
                {testimonials[activeTestimonial].avatar}
              </div>
              <span className="font-black text-base pt-1" style={{ color: 'var(--gold)' }}>{testimonials[activeTestimonial].name}</span>
              <span className="text-xs text-gray-400">{testimonials[activeTestimonial].role}</span>
              <div className="flex gap-1 pt-1">
                {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#fabc09] stroke-[#fabc09]" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 reveal">
            <button onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
              <ArrowLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className="h-2 rounded-full transition-all cursor-pointer"
                  style={{ width: i === activeTestimonial ? '28px' : '8px', background: i === activeTestimonial ? 'var(--gold)' : 'var(--bg-elevated)' }} />
              ))}
            </div>
            <button onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
