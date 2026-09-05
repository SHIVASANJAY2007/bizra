import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronRight,
  Globe2,
  Menu,
  UserRound,
  X,
  Sparkles,
  Home,
  Lightbulb,
  Landmark,
  BookOpen,
  Users,
  MapPin,
  Navigation,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bizraLogo from '../assets/BIZRA logo.jpeg';

gsap.registerPlugin(ScrollTrigger);

const languages = ['English', 'हिन्दी', 'தமிழ்', 'मराठी', 'বাংলা', 'తెలుగు'];

const navItems = [
  { id: 'start-report', label: 'Start a report', tab: 'landing' },
  { id: 'why-BIZRA', label: 'Why BIZRA', tab: 'landing' },
  { id: 'how-it-works', label: 'How it works', tab: 'landing' },
  { id: 'who-its-for', label: 'Who it\'s for', tab: 'landing' },
  { id: 'public-record', label: 'Public record', tab: 'landing' },
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
  const [activeSection, setActiveSection] = useState('start-report');
  const [isHoverRevealed, setIsHoverRevealed] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  const headerRef = useRef(null);
  const navContainerRef = useRef(null);
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
        // Don't hide if mouse is at the top of the screen
        if (mousePos.current.y > 80) {
          setHidden(true);
          setIsHoverRevealed(false);
        }
      } else {
        setHidden(false);
        setIsHoverRevealed(false);
      }
      lastScrollY.current = currentScrollY;

      // Scrollspy logic for landing page sections
      if (currentTab === 'landing') {
        const pageSections = ['start-report', 'why-BIZRA', 'how-it-works', 'who-its-for', 'public-record'];
        let current = 'start-report';
        for (let i = pageSections.length - 1; i >= 0; i--) {
          const id = pageSections[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the top of the section is above middle of the screen
            if (rect.top <= window.innerHeight / 2) {
              current = id;
              break;
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  // Reveal navbar when mouse approaches the top of the screen
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (hidden && e.clientY < 80) {
        setHidden(false);
        setIsHoverRevealed(true);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [hidden]);

  // Update sliding pill position when active section changes
  useEffect(() => {
    if (navContainerRef.current) {
      const activeElement = navContainerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        setPillStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        });
      } else {
        setPillStyle(prev => ({ ...prev, opacity: 0 }));
      }
    }
  }, [activeSection, currentTab]);

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
      if (id === 'start-report') {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.0 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNavigation = (event, item) => {
    event.preventDefault();
    setShowMobileMenu(false);

    if (currentTab === 'landing' && item.id) {
      if (item.id === 'start-report') {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.0 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      
      const el = document.getElementById(item.id);
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -80, duration: 1.0 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    setCurrentTab(item.tab);
    if (item.tab === 'landing' && item.id) {
      scrollToSection(item.id);
      setActiveSection(item.id);
    }
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

  const isActive = (item) => {
    if (currentTab === 'landing') {
      return activeSection === item.id;
    }
    return currentTab === item.tab;
  };

  return (
    <>
      <header
        ref={headerRef}
        onMouseEnter={() => {
          if (hidden) {
            setHidden(false);
            setIsHoverRevealed(true);
          }
        }}
        onMouseLeave={() => {
          // Hide if it was revealed by hover, user is scrolled down, and no modals are open
          if (isHoverRevealed && window.scrollY > 120 && !showSettings && !showLogin && !showMobileMenu) {
            setHidden(true);
            setIsHoverRevealed(false);
          }
        }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 transform ${hidden ? '-translate-y-full' : 'translate-y-0'} bg-[#F2F4F3]`}
      >
        {/* Main Navbar */}
        <div className="w-full h-[60px] md:h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-10 relative shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          {/* Logo Area */}
          <div className="flex items-center shrink-0">
            <button onClick={() => setCurrentTab('landing')} className="flex items-center gap-2 group cursor-pointer focus:outline-none transition-transform active:scale-95">
              <img src={bizraLogo} alt="BIZRA Logo" className="h-[30px] md:h-[35px] w-auto object-contain mix-blend-multiply" />
            </button>
          </div>

          {/* Navigation Links */}
          <div ref={navContainerRef} className="hidden xl:flex items-center gap-2 font-bold text-[13px] text-gray-900 absolute left-1/2 -translate-x-1/2 p-1 rounded-full bg-transparent">
            {/* Sliding Pill */}
            <div 
              className="absolute inset-y-1 bg-black rounded-full transition-all duration-300 ease-out z-0 shadow-md"
              style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
            />
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <button 
                  key={item.id}
                  data-active={active}
                  onClick={(e) => handleNavigation(e, item)} 
                  className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 ${active ? 'text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-6 font-bold text-[13px] shrink-0 text-gray-900">
             <button onClick={openSettings} className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer">
                <Globe2 size={16} />
                <span>{language}</span>
             </button>
             <button onClick={openLogin} className="hover:text-black transition-colors cursor-pointer">
                Log in
             </button>
             <button onClick={() => setCurrentTab('manual')} className="bg-black text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer shadow-sm">
                <span>Launch BIZRA</span>
                <ChevronRight size={14} />
             </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuTriggerRef}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 border border-gray-200 text-[#0B3060] transition-transform active:scale-95 focus:outline-none cursor-pointer relative z-10"
            aria-label="Toggle Menu"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      {/* Mobile Menu Drawer */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto" ref={layerRef}>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img src={bizraLogo} alt="BIZRA Logo" className="h-8 w-auto object-contain mix-blend-multiply" />
                  <div>
                    <span className="font-bold text-sm text-[#0B3060] block">BIZRA Menu</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Navigation &amp; Settings</span>
                  </div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:text-black transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-2 lg:hidden">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Navigation</span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => handleMobileNavigation(e, item)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${isActive(item)
                      ? 'bg-green-50 text-[#1A7B44]'
                      : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                      }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Language / भाषा</span>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left flex items-center justify-between ${language === lang
                        ? 'bg-green-50 text-[#1A7B44]'
                        : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                        }`}
                    >
                      <span>{lang}</span>
                      {language === lang && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={openLogin}
                  className="w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer bg-[#0B3060] text-white shadow-md hover:bg-[#072044]"
                >
                  <UserRound size={15} />
                  <span>Citizen Portal Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </header>

      {/* Settings Modal (Language Selection) */}
      {showSettings && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-50/90 backdrop-blur-md overflow-y-auto"
          onClick={closeSettings}
        >
          <div
            className="w-full max-w-md bg-white border-2 border-[#2EA8A4]/50 rounded-2xl p-6 md:p-8 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
            ref={layerRef}
          >
            {/* Close Button */}
            <button
              onClick={closeSettings}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-white hover:bg-[#2EA8A4] hover:border-[#2EA8A4] flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Close modal"
              title="Close"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#2EA8A4]/15 border border-[#2EA8A4]/40 flex items-center justify-center mx-auto mb-3 text-[#2EA8A4] shadow-md">
                <Globe2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Language &amp; Display</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">Customize language and visual preferences</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-3">Select Language / भाषा</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-left flex items-center justify-between shadow-sm ${language === lang
                        ? 'bg-[#2EA8A4]/25 text-[#2EA8A4] border-2 border-[#2EA8A4] shadow-md'
                        : 'bg-gray-100 text-gray-500 border border-gray-200 hover:text-gray-900 hover:bg-gray-200 hover:border-[#2EA8A4]/50'
                        }`}
                    >
                      <span className="text-sm">{lang}</span>
                      {language === lang && <Check size={16} className="text-[#2EA8A4]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 mt-6">
                <button
                  onClick={closeSettings}
                  className="w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-[#2EA8A4] text-white hover:bg-[#258B87] transition-all cursor-pointer shadow-md"
                >
                  Done / Save Language
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-50/90 backdrop-blur-md overflow-y-auto"
          onClick={closeLogin}
        >
          <div
            className="w-full max-w-md bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
            ref={layerRef}
          >
            {/* Close Button */}
            <button
              onClick={closeLogin}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-white hover:bg-[#2EA8A4] hover:border-[#2EA8A4] flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Close modal"
              title="Close"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#2EA8A4]/15 border border-[#2EA8A4]/30 flex items-center justify-center mx-auto mb-3 text-[#2EA8A4]">
                <UserRound size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {isRegistering ? 'Create BIZRA Account' : 'Welcome to BIZRA'}
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {isRegistering
                  ? 'Sign up to evaluate your rural business ideas'
                  : 'Access your business feasibility reports and loan proposals'}
              </p>
            </div>

            {authStatus === 'success' ? (
              <div className="p-4 rounded-xl bg-[#2EA8A4]/20 border border-[#2EA8A4]/40 text-[#2EA8A4] text-center font-bold text-sm mb-4 animate-pulse">
                {isRegistering ? 'Account created successfully!' : 'Signed in successfully!'}
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="entrepreneur@domain.in"
                    value={loginForm.email}
                    onChange={(e) => updateLoginField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-[#9ED4AC]/50 text-sm focus:outline-none focus:border-[#2EA8A4] transition-colors"
                  />
                  {loginErrors.email && <span className="text-rose-400 text-xs mt-1 block">{loginErrors.email}</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => updateLoginField('password', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-[#9ED4AC]/50 text-sm focus:outline-none focus:border-[#2EA8A4] transition-colors"
                  />
                  {loginErrors.password && <span className="text-rose-400 text-xs mt-1 block">{loginErrors.password}</span>}
                </div>
                <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold mt-2 cursor-pointer bg-[#2EA8A4] text-white hover:bg-[#258B87] transition-all shadow-md">
                  {isRegistering ? 'Create Account' : 'Sign In'}
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
              {isRegistering ? (
                <span>
                  Already registered?{' '}
                  <button onClick={toggleAuthMode} className="font-bold text-[#2EA8A4] hover:underline cursor-pointer">
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  First time user?{' '}
                  <button onClick={toggleAuthMode} className="font-bold text-[#2EA8A4] hover:underline cursor-pointer">
                    Create Account
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
