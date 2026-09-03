import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AboutBIZRA from './components/AboutBIZRA';
import HowItWorks from './components/HowItWorks';
import BIZRAChatbot from './components/BIZRAChatbot';
import SmoothScroll from './components/animations/SmoothScroll';
import './App.css';

function readStoredNumber(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  const stored = Number(window.localStorage.getItem(key));
  return Number.isFinite(stored) && stored >= 0.8 && stored <= 1.2 ? stored : fallback;
}

function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [fontSize, setFontSize] = useState(() => readStoredNumber('BIZRA-font-size', 1));
  const [theme, setTheme] = useState(() => window.localStorage.getItem('BIZRA-theme') || 'dark');

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 100}%`;
    window.localStorage.setItem('BIZRA-font-size', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('BIZRA-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  };

  const renderActivePage = () => {
    switch (currentTab) {
      case 'about':
        return <AboutBIZRA />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'chatbot':
        return <BIZRAChatbot setCurrentTab={setCurrentTab} theme={theme} toggleTheme={toggleTheme} />;
      case 'landing':
      default:
        return <LandingPage setCurrentTab={setCurrentTab} />;
    }
  };

  if (currentTab === 'chatbot') {
    return (
      <div className="min-h-screen flex flex-col">
        <BIZRAChatbot setCurrentTab={setCurrentTab} theme={theme} toggleTheme={toggleTheme} />
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--BIZRA-bg)', color: 'var(--BIZRA-ink)' }}>
        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          fontSize={fontSize}
          setFontSize={setFontSize}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-grow">{renderActivePage()}</main>
        <Footer setCurrentTab={setCurrentTab} currentTab={currentTab} />
      </div>
    </SmoothScroll>
  );
}

export default App;
