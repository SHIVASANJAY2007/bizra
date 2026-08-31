import React, { useState, useEffect } from 'react';
import { Shield, Eye, Settings, User, LogIn, X, Globe, Sparkles, Menu, ArrowRight } from 'lucide-react';

export default function Header({ currentTab, setCurrentTab, highContrast, toggleHighContrast, fontSize, setFontSize }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [language, setLanguage] = useState('English');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [authSuccess, setAuthSuccess] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const languages = ['English', 'हिन्दी', 'தமிழ்', 'मराठी', 'বাংলা', 'తెలుగు'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setAuthSuccess(isRegistering ? 'Registration successful!' : 'Login successful!');
      setTimeout(() => {
        setShowLoginModal(false);
        setAuthSuccess('');
        setLoginForm({ email: '', password: '' });
      }, 1500);
    }
  };

  const increaseFont = () => { if (fontSize < 1.2) setFontSize(p => p + 0.1); };
  const decreaseFont = () => { if (fontSize > 0.8) setFontSize(p => p - 0.1); };
  const resetFont = () => { setFontSize(1.0); };

  const navItems = [
    { id: 'landing', label: 'FEATURES' },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'about', label: 'WHY BIZRA' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 pointer-events-none" style={{ fontSize: `${fontSize}rem` }}>
      
      {/* ── Top Micro-Banner (Gov India Badge) ── */}
      <div className="w-full pointer-events-auto py-1.5 px-4 text-center text-[10px] font-medium tracking-wide flex items-center justify-center gap-2"
        style={{ background: 'rgba(6,6,10,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
        <span className="inline-block w-3.5 h-2.5 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-[2px]" />
        <span>A Government of India Initiative for Rural Entrepreneurship & Open Intelligence</span>
      </div>

      {/* ── Main Floating Capsule Row (Finexa Style) ── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-3 pb-3 flex items-center justify-between pointer-events-auto">
        
        {/* Left Spacer on large screens to center the pill */}
        <div className="hidden lg:flex items-center gap-2 w-32">
          {/* Subtle live indicator chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--emerald-bright)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live 2.0</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            FINEXA-STYLE FLOATING CAPSULE NAVBAR
        ═══════════════════════════════════════════ */}
        <nav className="inline-flex items-center gap-1.5 sm:gap-6 p-1.5 sm:px-3 sm:py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.65)] transition-all duration-300"
          style={{
            background: 'rgba(18, 18, 26, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}>

          {/* Logo Badge inside Pill (like Finexa AI) */}
          <button
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-1 px-4 py-2 rounded-full font-black text-xs tracking-tight shadow-md transition-all transform hover:scale-105 cursor-pointer select-none"
            style={{
              background: '#f4ece1',
              color: '#1a1714',
            }}
          >
            <span className="font-extrabold text-[13px] tracking-tight">Bizra</span>
            <span className="text-[9px] font-black uppercase px-1 py-0.2 rounded font-mono ml-0.5 tracking-tighter"
              style={{ background: '#e2d3be', color: '#8c591a' }}>
              AI
            </span>
          </button>

          {/* Center Links (Uppercase, Wide Tracking) */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 px-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`text-[11px] font-extrabold tracking-[0.14em] uppercase transition-all cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-emerald-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  style={{
                    letterSpacing: '0.12em',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full"
                      style={{
                        background: 'var(--emerald)',
                        boxShadow: '0 0 8px var(--emerald-glow)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right CTA link inside pill (START FREE / CHATBOT) */}
          <button
            onClick={() => setCurrentTab('chatbot')}
            className="text-[11px] font-extrabold uppercase tracking-[0.14em] px-3.5 sm:px-4 py-2 rounded-full transition-all cursor-pointer"
            style={{
              background: currentTab === 'chatbot' ? 'rgba(16,185,129,0.15)' : 'transparent',
              color: currentTab === 'chatbot' ? 'var(--emerald-bright)' : 'var(--text-secondary)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.color = currentTab === 'chatbot' ? 'var(--emerald-bright)' : 'var(--text-secondary)'; }}
          >
            <span>START FREE</span>
          </button>
        </nav>

        {/* ═══════════════════════════════════════════
            RIGHT CIRCULAR MENU BUTTON (Finexa Style)
        ═══════════════════════════════════════════ */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            aria-label="Toggle Menu"
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-105 cursor-pointer"
            style={{
              background: 'rgba(22, 22, 32, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: showDrawer ? 'var(--emerald-bright)' : 'var(--text-primary)',
            }}
            title="Menu & Controls"
          >
            {showDrawer ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* ── SLIDE-OVER LUXURY CONTROL DRAWER ─────── */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 pointer-events-auto flex justify-end animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          
          <div className="w-full max-w-sm h-full shadow-2xl p-7 flex flex-col justify-between overflow-y-auto animate-fade-left"
            style={{ background: 'var(--bg-raised)', borderLeft: '1px solid var(--border-light)' }}>
            
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black text-xs" style={{ background: '#f4ece1' }}>
                    B
                  </div>
                  <div>
                    <span className="font-extrabold text-sm block leading-none" style={{ color: 'var(--text-white)' }}>BIZRA Portal</span>
                    <span className="text-[9px] uppercase tracking-wider block mt-0.5" style={{ color: 'var(--text-muted)' }}>Settings & Access</span>
                  </div>
                </div>
                <button onClick={() => setShowDrawer(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                  <X size={16} />
                </button>
              </div>

              {/* Mobile Navigation List (Visible on mobile screens) */}
              <div className="space-y-2 md:hidden">
                <span className="text-[10px] font-extrabold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Navigation</span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentTab(item.id); setShowDrawer(false); }}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-left transition-all cursor-pointer"
                    style={{
                      background: currentTab === item.id ? 'rgba(16,185,129,0.1)' : 'var(--bg-surface)',
                      color: currentTab === item.id ? 'var(--emerald-bright)' : 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={13} />
                  </button>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Language / भाषा</span>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                        language === lang
                          ? 'border-emerald-500 text-emerald-400'
                          : 'border-white/10 text-gray-400 hover:text-white'
                      }`}
                      style={{
                        background: language === lang ? 'rgba(16,185,129,0.1)' : 'var(--bg-surface)',
                        border: `1px solid ${language === lang ? 'var(--emerald)' : 'var(--border-subtle)'}`,
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility Controls */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Accessibility</span>
                
                <div className="p-3 rounded-xl flex items-center justify-between"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>High Contrast</span>
                  <button
                    onClick={toggleHighContrast}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    style={{
                      background: highContrast ? 'var(--emerald)' : 'rgba(255,255,255,0.08)',
                      color: highContrast ? '#fff' : 'var(--text-muted)',
                    }}
                  >
                    {highContrast ? 'Active' : 'Off'}
                  </button>
                </div>

                <div className="p-3 rounded-xl flex items-center justify-between"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Font Scale</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={decreaseFont} className="w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>A-</button>
                    <button onClick={resetFont} className="w-7 h-7 rounded-lg text-xs flex items-center justify-center cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>A</button>
                    <button onClick={increaseFont} className="w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>A+</button>
                  </div>
                </div>
              </div>

              {/* Login / Profile CTA */}
              <div className="pt-2">
                <button
                  onClick={() => { setShowDrawer(false); setShowLoginModal(true); }}
                  className="btn btn-primary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User size={14} />
                  <span>Citizen Login / Register</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer info */}
            <div className="pt-6 text-center text-[10px]" style={{ color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)' }}>
              <span>Digital India · Open Government Data</span>
            </div>

          </div>
        </div>
      )}

      {/* ── LOGIN MODAL ────────────────────────── */}
      {showLoginModal && (
        <div className="fixed inset-0 pointer-events-auto flex items-center justify-center z-50 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md rounded-2xl p-8 shadow-2xl relative"
            style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-light)' }}>
            <button onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 transition-colors cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--border-emerald)' }}>
                <LogIn size={22} style={{ color: 'var(--emerald-bright)' }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-white)' }}>
                {isRegistering ? 'Create Account' : 'Welcome to BIZRA'}
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                {isRegistering ? 'Sign up to analyze your business ideas' : 'Access your business dashboard'}
              </p>
            </div>

            {authSuccess ? (
              <div className="p-4 rounded-xl text-center font-medium animate-pulse text-sm mb-4"
                style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--emerald-bright)', border: '1px solid var(--border-emerald)' }}>
                {authSuccess}
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {[
                  { label: 'Email Address', type: 'email', key: 'email', placeholder: 'you@example.com' },
                  { label: 'Password', type: 'password', key: 'password', placeholder: '••••••••' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold uppercase mb-1.5" style={{ color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.placeholder}
                      value={loginForm[f.key]}
                      onChange={e => setLoginForm({ ...loginForm, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none text-sm"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--emerald)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'var(--border-light)'} />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary w-full py-3 rounded-xl text-sm mt-2 cursor-pointer">
                  {isRegistering ? 'Create Account' : 'Sign In'}
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-sm pt-4" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)' }}>
              {isRegistering ? (
                <span>Already have an account?{' '}
                  <button onClick={() => setIsRegistering(false)} className="font-bold cursor-pointer" style={{ color: 'var(--emerald-bright)' }}>Sign In</button>
                </span>
              ) : (
                <span>New to BIZRA?{' '}
                  <button onClick={() => setIsRegistering(true)} className="font-bold cursor-pointer" style={{ color: 'var(--emerald-bright)' }}>Create Account</button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
