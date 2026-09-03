import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, RotateCcw, Send, X, Sun, Moon, MapPin, LocateFixed, Loader2
} from 'lucide-react';
import ResponseRenderer from './ResponseRenderer';

export default function BIZRAChatbot({ setCurrentTab, theme: externalTheme, toggleTheme: externalToggleTheme }) {
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Live Location States
  const [userLocation, setUserLocation] = useState(null); // { latitude, longitude, city, state, country, pincode, address }
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle' | 'locating' | 'granted' | 'denied' | 'error'
  const [locationError, setLocationError] = useState(null);

  const [internalTheme, setInternalTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }
    return 'dark';
  });

  const activeTheme = externalTheme || internalTheme;

  const handleToggleTheme = () => {
    if (externalToggleTheme) {
      externalToggleTheme();
    } else {
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setInternalTheme(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      window.localStorage.setItem('BIZRA-theme', nextTheme);
    }
  };

  const fetchIpLocation = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data.city || data.region || data.latitude) {
          const readable = [data.city, data.region, data.country_name].filter(Boolean).join(', ');
          return {
            latitude: data.latitude || 0,
            longitude: data.longitude || 0,
            city: data.city || '',
            state: data.region || '',
            country: data.country_name || '',
            pincode: data.postal || '',
            address: readable || 'Detected via IP',
            source: 'IP Auto-Detect'
          };
        }
      }
    } catch (e) {
      console.warn('Primary IP location fallback failed:', e);
    }

    try {
      const res2 = await fetch('https://freeipapi.com/api/json');
      if (res2.ok) {
        const data2 = await res2.json();
        const readable = [data2.cityName, data2.regionName, data2.countryName].filter(Boolean).join(', ');
        return {
          latitude: data2.latitude || 0,
          longitude: data2.longitude || 0,
          city: data2.cityName || '',
          state: data2.regionName || '',
          country: data2.countryName || '',
          pincode: data2.zipCode || '',
          address: readable || 'Detected via IP',
          source: 'IP Auto-Detect'
        };
      }
    } catch (e) {
      console.warn('Secondary IP location fallback failed:', e);
    }

    return null;
  };

  const autoDetectLocation = async () => {
    setLocationStatus('locating');
    setLocationError(null);

    // 1. Try HTML5 Geolocation with a quick timeout (3s)
    if (typeof window !== 'undefined' && navigator.geolocation) {
      const getGpsPosition = () =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 3000,
            maximumAge: 300000
          });
        });

      try {
        const position = await getGpsPosition();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        let locData = {
          latitude: lat,
          longitude: lon,
          city: '',
          state: '',
          country: '',
          pincode: '',
          address: `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`,
          source: 'GPS'
        };

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (res.ok) {
            const geoJson = await res.json();
            const addr = geoJson.address || {};
            const city = addr.city || addr.town || addr.village || addr.county || addr.suburb || '';
            const state = addr.state || addr.region || '';
            const country = addr.country || '';
            const pincode = addr.postcode || '';

            const readableAddress = [city, state, country].filter(Boolean).join(', ');
            locData = {
              latitude: lat,
              longitude: lon,
              city,
              state,
              country,
              pincode,
              address: readableAddress || `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`,
              source: 'GPS'
            };
          }
        } catch (e) { }

        setUserLocation(locData);
        setLocationStatus('granted');
        return;
      } catch (gpsErr) {
        console.log('Browser GPS prompt skipped/blocked. Auto-switching to IP location...');
      }
    }

    // 2. Immediate IP Location Fallback (zero user effort!)
    const ipLoc = await fetchIpLocation();
    if (ipLoc) {
      setUserLocation(ipLoc);
      setLocationStatus('granted');
    } else {
      setLocationStatus('denied');
    }
  };

  useEffect(() => {
    // Automatically detect location on load (Zero manual work for user!)
    autoDetectLocation();
  }, []);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Welcome to BIZRA AI Agent! 🚀\n\nHow can I assist you with your rural business feasibility, local demand research, or government loan schemes today?",
      time: 'Just now',
      quickPills: [
        '🌾 Dairy business feasibility in Tamil Nadu',
        '💰 PMEGP 35% Subsidy calculation',
        '📍 Find competitors within 10km radius',
        '📋 FSSAI & GST licensing checklist'
      ]
    }
  ]);

  const generateSessionId = () => 'BIZRA-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();
  const [sessionId, setSessionId] = useState(generateSessionId);

  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(2);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const callN8nAgent = async (userText, session, locationData) => {
    const WEBHOOK_PATH = '/webhook/27a70dce-19d0-4858-82c0-d1126492962e';
    const PROXY_URL = `/n8n-api${WEBHOOK_PATH}`;
    const DIRECT_URL = `https://prefamiliar-overliterary-princess.ngrok-free.dev${WEBHOOK_PATH}`;

    let promptWithLocation = userText;
    if (locationData && locationData.address) {
      promptWithLocation = `${userText}\n\n[User Live Location Context: ${locationData.address} (Lat: ${locationData.latitude}, Lon: ${locationData.longitude}${locationData.pincode ? `, Pincode: ${locationData.pincode}` : ''})]`;
    }

    const payload = {
      chatInput: promptWithLocation,
      message: userText,
      rawQuery: userText,
      sessionId: session,
      location: locationData || null
    };

    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    };

    let response;
    try {
      // First attempt: Proxy via Vite server (bypasses browser CORS policy completely)
      response = await fetch(PROXY_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
    } catch (proxyError) {
      console.warn('Proxy fetch failed, attempting direct fetch:', proxyError);
      response = await fetch(DIRECT_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
    }

    if (!response.ok) {
      throw new Error(`n8n AI Agent returned status ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (typeof data === 'string') return data;
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        if (typeof first === 'string') return first;
        return (
          first?.output ||
          first?.response ||
          first?.text ||
          first?.message ||
          first?.json?.output ||
          first?.json?.text ||
          first?.json?.response ||
          JSON.stringify(first)
        );
      }
      if (typeof data === 'object' && data !== null) {
        return (
          data.output ||
          data.response ||
          data.text ||
          data.message ||
          data.fulfillmentText ||
          data.json?.output ||
          data.json?.text ||
          data.json?.response ||
          JSON.stringify(data)
        );
      }
      return String(data);
    } else {
      return await response.text();
    }
  };

  const handleSendMessage = async (textToSend = inputQuery) => {
    if (!textToSend.trim() || isTyping) return;

    const query = textToSend.trim();
    const userMsg = {
      id: messageIdRef.current++,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const aiReplyText = await callN8nAgent(query, sessionId, userLocation);
      const aiMsg = {
        id: messageIdRef.current++,
        sender: 'ai',
        text: aiReplyText || "Received empty response from AI Agent.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Agent connection error:', err);
      const errorMsg = {
        id: messageIdRef.current++,
        sender: 'ai',
        text: `⚠️ **Connection Error**: Unable to reach BIZRA AI Agent.\n\nDetails: ${err.message || 'Network error'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    setSessionId(generateSessionId());
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: "Welcome to BIZRA AI Agent! 🚀\n\nHow can I assist you with your rural business feasibility, local demand research, or government loan schemes today?",
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

  const isLight = activeTheme === 'light';

  return (
    <div className={`h-[100dvh] w-full flex flex-col transition-colors duration-200 overflow-hidden ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#080c14] text-gray-100'
      }`}>

      {/* ── TOP HEADER BAR ── */}
      <header className={`h-16 w-full shrink-0 border-b px-4 sm:px-6 flex items-center justify-between z-30 transition-colors ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#04060a] border-white/10 text-white'
        }`}>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('landing')}
            className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-lg border ${isLight
              ? 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-200'
              : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
          >
            <ArrowLeft size={16} />
            <span>Home</span>
          </button>

          <span className={`${isLight ? 'text-slate-300' : 'text-white/20'} hidden sm:block`}>|</span>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-500 text-xs">
              B
            </div>
            <span className={`font-black text-sm tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              BIZRA AI Agent
            </span>

            {/* Live Location Badge */}
            {locationStatus === 'granted' && userLocation && (
              <button
                onClick={autoDetectLocation}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all cursor-pointer"
                title="Live Location active. Click to refresh location."
              >
                <MapPin size={11} className="text-emerald-500 animate-pulse shrink-0" />
                <span className="max-w-[110px] sm:max-w-[170px] truncate">
                  {userLocation.city ? `${userLocation.city}, ${userLocation.state}` : userLocation.address}
                </span>
              </button>
            )}

            {locationStatus === 'locating' && (
              <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-mono">
                <Loader2 size={11} className="animate-spin text-amber-500 shrink-0" />
                <span className="hidden sm:inline">Locating...</span>
              </div>
            )}

            {(locationStatus === 'idle' || locationStatus === 'denied' || locationStatus === 'error') && (
              <button
                onClick={autoDetectLocation}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-500/15 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-500/30 hover:border-emerald-500/40 transition-all cursor-pointer"
                title="Click to grant live location access for regional market data"
              >
                <LocateFixed size={11} className="shrink-0" />
                <span className="hidden sm:inline">Location Access</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={handleToggleTheme}
            className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-lg border ${isLight
              ? 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-200'
              : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {isLight ? <Moon size={15} className="text-emerald-600" /> : <Sun size={15} className="text-amber-400" />}
            <span className="hidden sm:inline">{isLight ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          {/* Reset Session Button */}
          <button
            onClick={resetChat}
            className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-lg border ${isLight
              ? 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-200'
              : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            title="Reset Session"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset Session</span>
          </button>

          {/* Back to Home Button */}
          <button
            onClick={() => setCurrentTab('landing')}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${isLight
              ? 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-200'
              : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            title="Back to Landing Page"
          >
            <X size={18} />
          </button>
        </div>

      </header>

      {/* ── MAIN CHAT WORKSPACE ── */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 min-h-0 w-full overflow-hidden">

        {/* Chat Feed Column (Left 8 Cols) */}
        <div className={`lg:col-span-8 flex flex-col h-full relative overflow-hidden border-r transition-colors ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#080c14] border-white/5'
          }`}>

          {/* Scrollable Feed */}
          <div className="flex-grow overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                <div
                  className={`max-w-[580px] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md font-medium'
                    : isLight
                      ? 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-sm'
                      : 'bg-[#121826] text-gray-200 border border-white/10 rounded-bl-none shadow-lg'
                    }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <ResponseRenderer text={msg.text} />
                  )}
                  <div className={`text-[10px] font-bold mt-2 text-right ${msg.sender === 'user'
                    ? 'text-emerald-200'
                    : isLight
                      ? 'text-slate-400'
                      : 'text-gray-400'
                    }`}>
                    {msg.time}
                  </div>
                </div>

                {msg.quickPills && (
                  <div className="flex flex-wrap gap-2 max-w-[580px] pt-1">
                    {msg.quickPills.map((pill, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(pill)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer text-left ${isLight
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 shadow-sm'
                          : 'bg-[#efe7d5]/10 text-[#efe7d5] border-[#efe7d5]/25 hover:border-[#efe7d5]/50 hover:bg-[#efe7d5]/20'
                          }`}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className={`p-3 rounded-xl border text-xs w-fit flex items-center gap-2 ${isLight
                ? 'bg-white border-slate-200 text-slate-600 shadow-sm'
                : 'bg-[#121826] border-[#efe7d5]/20 text-[#efe7d5]'
                }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>BIZRA AI Agent is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* Input Bar */}
          <div className={`p-4 border-t transition-colors ${isLight ? 'bg-white border-slate-200' : 'bg-[#04060a] border-white/10'
            }`}>
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className={`flex items-center gap-2 rounded-xl p-1.5 border focus-within:border-emerald-500 transition-colors ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#121826] border-white/10'
                }`}
            >
              <button
                type="button"
                onClick={autoDetectLocation}
                className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${locationStatus === 'granted'
                  ? 'text-emerald-500 hover:bg-emerald-500/10'
                  : isLight
                    ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                title={userLocation ? `Location Active: ${userLocation.address}` : "Access live location"}
              >
                {locationStatus === 'locating' ? (
                  <Loader2 size={16} className="animate-spin text-amber-500" />
                ) : (
                  <MapPin size={16} className={locationStatus === 'granted' ? 'text-emerald-500' : ''} />
                )}
              </button>

              <input
                type="text"
                placeholder={
                  userLocation
                    ? `Ask BIZRA AI about market feasibility near ${userLocation.city || 'your location'}...`
                    : "Ask BIZRA AI about feasibility, subsidies, or local market demand..."
                }
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className={`flex-grow px-2 py-2 bg-transparent text-xs sm:text-sm focus:outline-none ${isLight ? 'text-slate-900 placeholder-slate-400' : 'text-white placeholder-gray-400'
                  }`}
              />

              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all cursor-pointer ${inputQuery.trim()
                  ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm'
                  : isLight
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white/10 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Send size={15} />
              </button>
            </form>
          </div>

        </div>

        {/* WhatsApp Mobile Concierge Column (Right 4 Cols) */}
        <div className={`hidden lg:flex lg:col-span-4 flex-col justify-between p-8 text-center border-l transition-colors ${isLight ? 'bg-slate-100/70 border-slate-200 text-slate-800' : 'bg-[#05080f] border-white/5 text-white'
          }`}>
          <div className="space-y-6 my-auto">
            {/* Tan Paper Highlighted Concierge Card in Dark Mode */}
            <div className={`p-6 rounded-2xl border transition-all ${isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-[#efe7d5] text-[#152329] border-[#efe7d5]/40 shadow-xl'
              }`}>
              <div
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform mb-4 ${isLight ? 'bg-[#25D366]' : 'bg-[#152329] text-[#efe7d5]'
                  }`}
                onClick={openWhatsApp}
              >
                <svg className={`w-10 h-10 ${isLight ? 'fill-white' : 'fill-[#efe7d5]'}`} viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>

              <div className="space-y-1">
                <h3 className={`font-black text-lg ${isLight ? 'text-slate-900' : 'text-[#152329]'}`}>
                  Chat on WhatsApp
                </h3>
                <p className={`text-xs max-w-xs mx-auto leading-relaxed font-medium ${isLight ? 'text-slate-500' : 'text-[#152329]/80'}`}>
                  Connect with BIZRA AI on WhatsApp for instant feasibility reports and mandi price alerts.
                </p>
              </div>

              <button
                onClick={openWhatsApp}
                className={`mt-5 px-6 py-2.5 rounded-xl uppercase font-extrabold tracking-wider cursor-pointer text-xs shadow-md transition-all ${isLight
                  ? 'bg-[#25D366] text-white hover:bg-emerald-600'
                  : 'bg-[#152329] text-[#efe7d5] hover:bg-black'
                  }`}
              >
                Open WhatsApp Bot
              </button>
            </div>
          </div>

          <div className={`pt-4 border-t text-[10px] uppercase tracking-widest ${isLight ? 'border-slate-200 text-slate-400' : 'border-white/5 text-gray-500'
            }`}>
            BIZRA Official Mobile Concierge
          </div>
        </div>

      </main>

    </div>
  );
}
