import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, RotateCcw, Send, Sparkles, MessageSquare,
  Bot, CheckCircle2, ChevronRight, ExternalLink, Globe,
  Shield, Zap, Layers, Compass, TrendingUp, IndianRupee,
  MapPin, Check, Menu, X, ArrowUpRight, TrendingDown,
  PieChart, Landmark, FileText, Coins, BarChart3
} from 'lucide-react';

export default function BizraChatbot({ setCurrentTab, fontSize }) {
  const [activeChannel, setActiveChannel] = useState('whatsapp'); // 'whatsapp' | 'telegram'
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Welcome to BIZRA AI! 🚀\n\nHow can I assist you with your rural business feasibility, local demand research, or government loan schemes today?",
      time: '05:39 PM',
      quickPills: [
        '🌾 Dairy business feasibility in Tamil Nadu',
        '💰 PMEGP 35% Subsidy calculation',
        '📍 Find competitors within 10km radius',
        '📋 FSSAI & GST licensing checklist'
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // AI Knowledge Base generator for realistic responses
  const generateAiResponse = (userText) => {
    const lower = userText.toLowerCase();
    
    if (lower.includes('dairy') || lower.includes('milk') || lower.includes('tamil nadu') || lower.includes('coimbatore')) {
      return {
        text: `📊 **Dairy Products Business Feasibility Scan (Tamil Nadu)**\n\n• **Opportunity Score:** 78% (High Potential)\n• **Local Demand Index:** High (Fresh pouch milk, curd, paneer, and ghee)\n• **Recommended Initial Capital:** ₹1.2 – 2.5 Lakhs\n• **Eligible Subsidy Scheme:** Dairy Entrepreneurship Development Scheme (DEDS) + PMEGP (up to 35% margin money)\n• **Estimated Break-Even:** 6 to 9 Months\n\n💡 *Recommendation:* Focus on direct-to-home morning deliveries within 5km of village cluster to capture 22% higher profit margins than bulk dairy cooperatives.`,
        pills: ['Calculate exact PMEGP subsidy', 'Download FSSAI license form', 'View cold storage equipment costs']
      };
    }
    
    if (lower.includes('subsidy') || lower.includes('pmegp') || lower.includes('mudra') || lower.includes('loan')) {
      return {
        text: `💰 **Government Loan & Subsidy Eligibility Guide**\n\n• **PMEGP Scheme:** Offers 25% (Urban) to 35% (Rural) subsidy on project capital up to ₹50 Lakhs for manufacturing / ₹20 Lakhs for services.\n• **Mudra Loan (Kishor/Tarun):** Collateral-free funding from ₹50,000 up to ₹10 Lakhs at concessional interest rates.\n• **CGTMSE Coverage:** 100% government guarantee backed for rural micro-enterprises.\n\nWould you like me to generate a bank-ready Project Report format for your business category?`,
        pills: ['Generate Bank Project Report', 'Check PMEGP eligibility criteria', 'Find nearest MSME facilitation centre']
      };
    }

    if (lower.includes('competitor') || lower.includes('competition') || lower.includes('radius')) {
      return {
        text: `📍 **Hyper-Local Competitor Radius Mapping**\n\nBased on government MSME Udyam registration records within your 10km perimeter:\n• **Direct Competitors:** 12 active registered units\n• **Underserved Segments:** Packaged sweets & organic farm produce (Supply Gap: 42%)\n• **Nearest Mandi:** 6.4 km distance with daily wholesale auctions\n\nYour selected area exhibits low market saturation for branded value-added goods.`,
        pills: ['View Mandi wholesale price index', 'Check transportation route efficiency', 'Explore raw material supplier contacts']
      };
    }

    if (lower.includes('license') || lower.includes('fssai') || lower.includes('gst') || lower.includes('permit') || lower.includes('checklist')) {
      return {
        text: `📋 **Step-by-Step Regulatory & Compliance Sequence**\n\n1. **Udyam Registration:** 100% free online MSME registration for scheme access\n2. **Local Panchayat / Municipal Trade License:** 3–5 working days\n3. **FSSAI Food Safety Registration:** Mandatory for food, dairy, and edible produce\n4. **GST Registration:** Mandatory only if annual turnover exceeds ₹40 Lakhs (Goods) / ₹20 Lakhs (Services)\n5. **Pollution Board Consent (NOC):** Required for small manufacturing & processing units`,
        pills: ['Step-by-step Udyam guide', 'Download FSSAI application draft', 'Check state-specific permit fees']
      };
    }

    return {
      text: `🤖 **BIZRA Intelligence Synthesis**\n\nI have analyzed your query: "${userText}" across national open data platforms.\n\n• **Market Viability:** Positive indicator for rural and semi-urban commercial expansion.\n• **Recommended Next Step:** Run a localized demand scan with pincode demographics to forecast 12-month cash flows.\n• **Subsidy Opportunity:** Multiple central schemes (Mudra, PMEGP, Stand-Up India) are open for application.`,
      pills: ['Explore business categories', 'Calculate project cost breakdown', 'Speak with regional coordinator']
    };
  };

  const handleSendMessage = (textToSend = inputQuery) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateAiResponse(textToSend);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseData.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPills: responseData.pills
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 900);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: "Welcome to BIZRA AI! 🚀\n\nHow can I assist you with your rural business feasibility, local demand research, or government loan schemes today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPills: [
          '🌾 Dairy business feasibility in Tamil Nadu',
          '💰 PMEGP 35% Subsidy calculation',
          '📍 Find competitors within 10km radius',
          '📋 FSSAI & GST licensing checklist'
        ]
      }
    ]);
  };

  const openWhatsApp = () => {
    const phone = "919999999999";
    const text = encodeURIComponent("Hi BIZRA AI! I would like to analyze my business idea and check government loan subsidies.");
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-[#fbf8f2] text-gray-900 overflow-hidden select-none" style={{ fontSize: `${fontSize}rem` }}>

      {/* ═══════════════════════════════════════
          TOP NAVIGATION BAR (64-68px Fixed Height, Robust Padding)
      ═══════════════════════════════════════ */}
      <header className="h-[64px] sm:h-[68px] w-full shrink-0 border-b border-[#e8dcd0] bg-[#fbf8f2] px-4 sm:px-8 flex items-center justify-between z-30 relative">
        
        {/* Left Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-[#efe6db]"
          >
            <ArrowLeft size={16} />
            <span>Home</span>
          </button>

          <span className="text-[#e2d5c7] hidden sm:block">|</span>

          {/* Logo Badge */}
          <div className="flex items-center gap-2 select-none">
            <span className="font-serif font-black text-sm sm:text-base tracking-tight text-gray-900">BIZRA AI</span>
            <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full font-mono bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/20 tracking-wider">
              OGD DYNAMIC
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-[#efe6db]"
            title="Reset Session"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset Session</span>
          </button>

          <button
            onClick={() => setCurrentTab('landing')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#e5dcd3] shadow-xs flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-transform hover:scale-105 cursor-pointer"
            title="Menu"
          >
            <Menu size={17} />
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          MAIN WORKSPACE (Grid 65% / 35%, Non-clipping min-w-0)
      ═══════════════════════════════════════ */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 min-h-0 w-full overflow-hidden">
        
        {/* ── LEFT COLUMN: AI CHAT (8 of 12 / ~66%) ── */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-w-0 h-full relative bg-[#fcfaf7] border-r border-[#e8dcd0] overflow-hidden">
          
          {/* Scattered Finance Icons Background (Contained & Muted) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-wrap justify-around items-center gap-10 sm:gap-14 p-6 opacity-[0.25]">
            {[...Array(3)].map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <div className="m-3"><TrendingUp size={24} className="text-[#b0a89d] stroke-[1.5]" /></div>
                <div className="m-3"><FileText size={24} className="text-[#b0a89d] stroke-[1.5]" /></div>
                <div className="m-3"><PieChart size={24} className="text-[#38bdf8] stroke-[1.5]" /></div>
                <div className="m-3"><Landmark size={26} className="text-[#b0a89d] stroke-[1.5]" /></div>
                <div className="m-3"><TrendingDown size={24} className="text-[#b0a89d] stroke-[1.5]" /></div>
                <div className="m-3"><Coins size={24} className="text-[#b0a89d] stroke-[1.5]" /></div>
                <div className="m-3"><BarChart3 size={24} className="text-[#38bdf8] stroke-[1.5]" /></div>
                <div className="m-3"><FileText size={24} className="text-[#38bdf8] stroke-[1.5]" /></div>
              </React.Fragment>
            ))}
          </div>

          {/* AGENT STATUS HEADER */}
          <div className="shrink-0 px-6 sm:px-8 py-3.5 border-b border-[#ebdccd]/80 flex items-center justify-between relative z-10 bg-[#fcfaf7]/95 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#3e1818] text-[#fabc09] shadow-sm shrink-0">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="font-serif font-black text-sm sm:text-base text-gray-900 leading-none tracking-tight">
                  BIZRA AI AGENT
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    ONLINE • READY
                  </span>
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-gray-600 bg-white border border-[#ded2c4] shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Government OGD Live Sync</span>
            </div>
          </div>

          {/* SCROLLABLE CHAT FEED */}
          <div className="flex-grow overflow-y-auto px-6 sm:px-8 py-6 space-y-6 relative z-10 scrollbar-thin min-w-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2 animate-fade-in`}
              >
                {/* Chat Bubble */}
                <div
                  className={`w-full max-w-[560px] rounded-3xl p-5 sm:p-6 shadow-sm leading-relaxed text-sm sm:text-[15px] relative ${
                    msg.sender === 'user'
                      ? 'bg-[#054d32] text-white rounded-br-sm shadow-md'
                      : 'bg-white text-gray-800 border border-[#ebdccd] rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium leading-[1.6]">
                    {msg.text}
                  </p>
                  
                  {/* Timestamp */}
                  <div className={`text-[10px] sm:text-[11px] font-bold mt-3 text-right ${msg.sender === 'user' ? 'text-emerald-200/80' : 'text-gray-400'}`}>
                    {msg.time}
                  </div>
                </div>

                {/* Suggested Prompts (Pills) */}
                {msg.quickPills && msg.quickPills.length > 0 && (
                  <div className="flex flex-wrap gap-2 max-w-[560px] pt-1">
                    {msg.quickPills.map((pill, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(pill)}
                        className="text-xs sm:text-[13px] font-semibold px-4 py-2.5 rounded-full bg-white text-gray-800 border border-[#ded2c4] hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-400 transition-all shadow-xs cursor-pointer text-left leading-snug"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-4 bg-white rounded-3xl rounded-bl-sm border border-[#ebdccd] w-fit shadow-xs animate-fade-in">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs font-semibold text-gray-500 ml-2">BIZRA AI is analyzing OGD databases...</span>
              </div>
            )}

            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* BOTTOM CHAT INPUT BAR */}
          <div className="shrink-0 px-6 sm:px-8 pb-6 pt-3 relative z-10 bg-[#fcfaf7]/90 backdrop-blur-xs">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="relative flex items-center bg-white rounded-full h-[56px] sm:h-[60px] border-2 border-[#d9cbbb] focus-within:border-[#054d32] focus-within:ring-4 focus-within:ring-[#054d32]/10 shadow-md transition-all px-2"
            >
              <input
                type="text"
                placeholder="Ask BIZRA AI anything..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="w-full h-full pl-4 pr-12 bg-transparent text-sm sm:text-[15px] text-gray-900 placeholder-gray-400 font-medium focus:outline-none rounded-full"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all absolute right-2.5 cursor-pointer shadow-sm ${
                  inputQuery.trim()
                    ? 'bg-[#054d32] text-white hover:scale-105 hover:bg-[#076644]'
                    : 'bg-[#eee4d8] text-gray-400 cursor-not-allowed'
                }`}
                title="Send Message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* ── RIGHT COLUMN: WHATSAPP CONCIERGE (4-5 of 12) ── */}
        <div className="lg:col-span-5 xl:col-span-4 bg-gradient-to-b from-[#e8f7ee] via-[#e2f5ea] to-[#d8f0e2] flex flex-col justify-between items-center p-6 sm:p-8 lg:p-10 text-center min-w-0 h-full overflow-y-auto scrollbar-thin relative">
          
          {/* Top Channel Toggle Capsule */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/80 border border-emerald-200/80 shadow-xs backdrop-blur-md gap-1 shrink-0 mb-4">
            <button
              onClick={() => setActiveChannel('whatsapp')}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeChannel === 'whatsapp'
                  ? 'bg-[#25D366] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveChannel('telegram')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeChannel === 'telegram'
                  ? 'bg-blue-500 text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Send size={13} />
              <span>Telegram</span>
            </button>
          </div>

          {/* Center Graphic & Pitch Area */}
          <div className="space-y-6 my-auto py-4 max-w-sm w-full">
            
            {/* WhatsApp App Card Icon */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl mx-auto flex items-center justify-center shadow-[0_12px_32px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 cursor-pointer bg-[#25D366]"
              onClick={openWhatsApp}
            >
              <svg className="w-14 h-14 sm:w-16 sm:h-16 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>

            {/* Typography */}
            <div className="space-y-1">
              <h3 className="font-serif font-black text-xl sm:text-2xl text-gray-900 tracking-tight leading-none uppercase">
                TAKE IT TO
              </h3>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#25D366] tracking-tight leading-none">
                WHATSAPP
              </h2>
            </div>

            <p className="text-xs sm:text-sm leading-[1.6] text-gray-600 font-medium max-w-[340px] mx-auto">
              Ready to chat? Connect with our BIZRA AI bot on WhatsApp for instant financial insights, mandi crop rates, and subsidy alerts on the go.
            </p>

            {/* Open WhatsApp CTA */}
            <div className="pt-2">
              <button
                onClick={openWhatsApp}
                className="w-full max-w-[320px] h-[50px] sm:h-[54px] rounded-full bg-black text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-900 hover:scale-102 transition-all shadow-lg cursor-pointer mx-auto"
              >
                <span>OPEN WHATSAPP BOT</span>
                <ArrowUpRight size={15} />
              </button>
            </div>

          </div>

          {/* Bottom Branding Tag */}
          <div className="w-full pt-4 mt-4 border-t border-emerald-800/10 shrink-0">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-800/60 block">
              BIZRA OFFICIAL MOBILE CONCIERGE
            </span>
          </div>

        </div>

      </main>

    </div>
  );
}
