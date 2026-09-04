import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AboutBIZRA from './components/AboutBizra';
import HowItWorks from './components/HowItWorks';
import BIZRAChatbot from './components/BizraChatbot';
import BizraManual from './components/BizraManual';
import SmoothScroll from './components/animations/SmoothScroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

function readStoredNumber(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  const stored = Number(window.localStorage.getItem(key));
  return Number.isFinite(stored) && stored >= 0.8 && stored <= 1.2 ? stored : fallback;
}

function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [fontSize, setFontSize] = useState(() => readStoredNumber('BIZRA-font-size', 1));

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 100}%`;
    window.localStorage.setItem('BIZRA-font-size', String(fontSize));
  }, [fontSize]);

  const isFullPageApp = currentTab === 'chatbot' || currentTab === 'manual';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      if (isFullPageApp) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
        window.__lenis.resize();
      }
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(timer);
  }, [currentTab, isFullPageApp]);

  return (
    <>
      {/* Chatbot View (Persistently mounted so active chat/location state is never unmounted) */}
      <div className={`min-h-screen flex flex-col ${currentTab === 'chatbot' ? 'block' : 'hidden'}`}>
        <BIZRAChatbot setCurrentTab={setCurrentTab} />
      </div>

      {/* Manual Wizard View (Persistently mounted so n8n report generation process & output are never reset) */}
      <div className={`min-h-screen flex flex-col ${currentTab === 'manual' ? 'block' : 'hidden'}`}>
        <BizraManual setCurrentTab={setCurrentTab} />
      </div>

      {/* Main Landing & Static Pages View */}
      <div className={isFullPageApp ? 'hidden' : 'block'}>
        <SmoothScroll>
          <div className="min-h-screen flex flex-col" style={{ background: 'var(--BIZRA-bg)', color: 'var(--BIZRA-ink)' }}>
            <Header
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
            <main className="flex-grow">
              {currentTab === 'about' && <AboutBIZRA />}
              {currentTab === 'how-it-works' && <HowItWorks />}
              {(currentTab === 'landing' || (!isFullPageApp && currentTab !== 'about' && currentTab !== 'how-it-works')) && (
                <LandingPage setCurrentTab={setCurrentTab} />
              )}
            </main>
            <Footer setCurrentTab={setCurrentTab} currentTab={currentTab} />
          </div>
        </SmoothScroll>
      </div>
    </>
  );
}

export default App;
