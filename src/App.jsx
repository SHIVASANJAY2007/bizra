import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AboutBizra from './components/AboutBizra';
import HowItWorks from './components/HowItWorks';
import BizraChatbot from './components/BizraChatbot';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1.0);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const renderActivePage = () => {
    switch (currentTab) {
      case 'landing':
        return <LandingPage setCurrentTab={setCurrentTab} fontSize={fontSize} />;
      case 'about':
        return <AboutBizra fontSize={fontSize} />;
      case 'how-it-works':
        return <HowItWorks fontSize={fontSize} />;
      case 'chatbot':
        return <BizraChatbot setCurrentTab={setCurrentTab} fontSize={fontSize} />;
      default:
        return <LandingPage setCurrentTab={setCurrentTab} fontSize={fontSize} />;
    }
  };

  // If viewing chatbot, render the full-screen immersive agent view
  if (currentTab === 'chatbot') {
    return (
      <div className={`min-h-screen flex flex-col ${highContrast ? 'high-contrast' : ''}`}>
        <BizraChatbot setCurrentTab={setCurrentTab} fontSize={fontSize} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'high-contrast' : ''}`}
      style={{ background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        highContrast={highContrast}
        toggleHighContrast={toggleHighContrast}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <main className="flex-grow">
        {renderActivePage()}
      </main>
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}

export default App;
