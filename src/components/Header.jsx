import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronRight,
  Globe2,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const languages = ['English', 'हिन्दी', 'தமிழ்', 'मराठी', 'বাংলা', 'తెలుగు'];

const navItems = [
  { id: 'start-report', label: 'Start a report', tab: 'landing' },
  { id: 'how-it-works', label: 'How it works', tab: 'how-it-works' },
  { id: 'why-BIZRA', label: 'Why BIZRA', tab: 'about' },
];

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'English';
  return window.localStorage.getItem('BIZRA-language') || 'English';
}

export default function Header({
  currentTab,
  setCurrentTab,
  fontSize,
  setFontSize,
  theme,
  toggleTheme,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [authStatus, setAuthStatus] = useState('idle');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const headerRef = useRef(null);
  const settingsTriggerRef = useRef(null);
  const loginTriggerRef = useRef(null);
  const mobileMenuTriggerRef = useRef(null);
  const layerRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > 120 && currentScrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSettings = () => {
    setShowSettings(false);
    window.requestAnimationFrame(() => settingsTriggerRef.current?.focus());
  };

  const closeLogin = () => {
    setShowLogin(false);
    setLoginErrors({});
    setAuthStatus('idle');
    window.requestAnimationFrame(() => loginTriggerRef.current?.focus());
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    window.requestAnimationFrame(() => mobileMenuTriggerRef.current?.focus());
  };

  useEffect(() => {
    window.localStorage.setItem('BIZRA-language', language);
  }, [language]);

  useEffect(() => {
    const isLayerOpen = showSettings || showLogin || showMobileMenu;
    if (!isLayerOpen) return undefined;

    const firstFocusable = layerRef.current?.querySelector('button, input, select, a');
    firstFocusable?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showSettings) closeSettings();
        else if (showLogin) closeLogin();
        else closeMobileMenu();
      }

      if (event.key === 'Tab' && layerRef.current) {
        const focusable = [...layerRef.current.querySelectorAll('button, input, select, a')].filter(
          (element) => !element.hasAttribute('disabled')
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSettings, showLogin, showMobileMenu]);

  const openSettings = () => {
    setShowMobileMenu(false);
    setShowSettings(true);
  };

  const openLogin = () => {
    setShowMobileMenu(false);
    setShowLogin(true);
  };

  const scrollToSection = (id) => {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleNavigation = (event, item) => {
    event.preventDefault();
    setShowMobileMenu(false);

    if (currentTab === 'landing') {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setCurrentTab(item.tab);
    if (item.tab === 'landing') scrollToSection(item.id);
  };

  const handleMobileNavigation = (event, item) => {
    handleNavigation(event, item);
    if (currentTab !== 'landing') closeMobileMenu();
  };

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  const updateLoginField = (field, value) => {
    setLoginForm((current) => ({ ...current, [field]: value }));
    setAuthStatus('idle');
    if (loginErrors[field]) setLoginErrors((current) => ({ ...current, [field]: '' }));
  };

  const validateLogin = () => {
    const nextErrors = {};
    if (!loginForm.email.trim()) nextErrors.email = 'Enter your email address.';
    else if (!/^\S+@\S+\.\S+$/.test(loginForm.email)) nextErrors.email = 'Enter a valid email address.';
    if (!loginForm.password) nextErrors.password = 'Enter your password.';
    return nextErrors;
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateLogin();
    setLoginErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setAuthStatus('error');
      return;
    }

    setAuthStatus('submitting');
    window.setTimeout(() => setAuthStatus('success'), 550);
  };

  const toggleAuthMode = () => {
    setIsRegistering((current) => !current);
    setLoginErrors({});
    setAuthStatus('idle');
  };

  const isActive = (item) =>
    (item.tab === 'landing' && currentTab === 'landing' && item.id === 'start-report') ||
    (item.tab !== 'landing' && currentTab === item.tab);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 transform ${hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      {/* Top Banner */}
      <div className="w-full py-1.5 px-4 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2 border-b border-slate-800/80 bg-slate-950 text-slate-400">
        <span className="inline-block w-3 h-2 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-[1px]" />
        <span>A Government of India Initiative · Open Data &amp; AI Rural Intelligence Portal</span>
      </div>

      {/* Main Header Container */}
      <div
        className={`w-full transition-all duration-300 ${scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-2xl py-3'
          : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('landing')}
              className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500 text-white font-black text-xl shadow-md shadow-emerald-950/40 group-hover:bg-emerald-600 transition-colors">
                B
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    BIZRA
                  </span>
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    AI
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 hidden sm:block">
                  Rural Business Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavigation(e, item)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${isActive(item)
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-emerald-500" />}
            </button>

            {/* Language Switcher */}
            <button
              ref={settingsTriggerRef}
              onClick={openSettings}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Settings & Accessibility"
            >
              <Globe2 size={14} className="text-emerald-400" />
              <span>{language}</span>
            </button>

            {/* Login */}
            <button
              ref={loginTriggerRef}
              onClick={openLogin}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <UserRound size={14} />
              <span>Login</span>
            </button>

            {/* Primary Launch AI CTA */}
            <button
              onClick={() => setCurrentTab('chatbot')}
              className="btn btn-primary px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <Sparkles size={14} />
              <span>Launch AI</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuTriggerRef}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm h-full bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto" ref={layerRef}>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-xs">
                    B
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">BIZRA Menu</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Navigation &amp; Settings</span>
                  </div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-2 md:hidden">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Navigation</span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleMobileNavigation(e, item)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${isActive(item)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Language / भाषा</span>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left flex items-center justify-between ${language === lang
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                    >
                      <span>{lang}</span>
                      {language === lang && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility Settings */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Accessibility</span>



                <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Font Scale</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setFontSize((current) => Math.max(0.8, Number((current - 0.1).toFixed(1))))}
                      className="w-7 h-7 rounded-lg bg-slate-700 text-xs font-bold flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setFontSize(1)}
                      className="w-7 h-7 rounded-lg bg-slate-700 text-xs font-bold flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                    >
                      A
                    </button>
                    <button
                      onClick={() => setFontSize((current) => Math.min(1.2, Number((current + 0.1).toFixed(1))))}
                      className="w-7 h-7 rounded-lg bg-slate-700 text-xs font-bold flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                    >
                      A+
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={openLogin}
                  className="btn btn-secondary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserRound size={15} />
                  <span>Citizen Portal Login</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-center text-[10px] text-slate-500">
              Digital India Open Government Platform
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4" ref={layerRef}>
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={closeSettings}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <Globe2 size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">Language &amp; Display</h3>
              <p className="text-xs text-slate-400 mt-1">Customize language and visual preferences</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Select Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left flex items-center justify-between ${language === lang
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                    >
                      <span>{lang}</span>
                      {language === lang && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-emerald-400" />}
                    <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                  </button>
                </div>


              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4" ref={layerRef}>
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={closeLogin}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <UserRound size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">
                {isRegistering ? 'Create BIZRA Account' : 'Welcome to BIZRA'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isRegistering
                  ? 'Sign up to evaluate your rural business ideas'
                  : 'Access your business feasibility reports and loan proposals'}
              </p>
            </div>

            {authStatus === 'success' ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center font-bold text-sm mb-4 animate-pulse">
                {isRegistering ? 'Account created successfully!' : 'Signed in successfully!'}
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="entrepreneur@domain.in"
                    value={loginForm.email}
                    onChange={(e) => updateLoginField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {loginErrors.email && <span className="text-rose-400 text-xs mt-1 block">{loginErrors.email}</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => updateLoginField('password', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {loginErrors.password && <span className="text-rose-400 text-xs mt-1 block">{loginErrors.password}</span>}
                </div>
                <button type="submit" className="btn btn-primary w-full py-3 rounded-xl text-sm font-bold mt-2 cursor-pointer">
                  {isRegistering ? 'Create Account' : 'Sign In'}
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
              {isRegistering ? (
                <span>
                  Already registered?{' '}
                  <button onClick={toggleAuthMode} className="font-bold text-emerald-400 hover:underline cursor-pointer">
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  First time user?{' '}
                  <button onClick={toggleAuthMode} className="font-bold text-emerald-400 hover:underline cursor-pointer">
                    Create Account
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
