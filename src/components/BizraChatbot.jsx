import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, RotateCcw, Send, X, MapPin, LocateFixed, Loader2, Compass, Bot, ChevronRight
} from 'lucide-react';
import ResponseRenderer from './ResponseRenderer';

export default function BIZRAChatbot({ setCurrentTab }) {
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Live Location States
  const [userLocation, setUserLocation] = useState(null); // { latitude, longitude, city, state, country, pincode, address }
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle' | 'locating' | 'granted' | 'denied' | 'error'
  const [locationError, setLocationError] = useState(null);

  // Messaging Concierge Platform State
  const [messagingTab, setMessagingTab] = useState('whatsapp'); // 'whatsapp' | 'telegram'

  const openMessagingBot = () => {
    if (messagingTab === 'whatsapp') {
      window.open('https://wa.me/?text=Hello%20BIZRA%20AI%20Assistant', '_blank');
    } else {
      window.open('https://t.me/bizra_ai_bot', '_blank');
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
    const WEBHOOK_PATH = '/webhook/239e175e-8629-407e-98b8-580035573ac2';
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
      // First attempt: Proxy endpoint (bypasses browser CORS policy)
      response = await fetch(PROXY_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      // If proxy returns 404 or non-2xx status, attempt direct fetch
      if (!response.ok) {
        console.warn(`Proxy returned status ${response.status}, trying direct URL...`);
        response = await fetch(DIRECT_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
      }
    } catch (proxyError) {
      console.warn('Proxy fetch network error, attempting direct fetch:', proxyError);
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

  return (
    <div className="flex flex-col h-screen bg-[#111D21] text-[#EAF2C9] overflow-hidden font-sans">

      {/* Top Navigation Bar */}
      <header className="px-6 py-3 border-b border-[#3B5C65] bg-[#111D21]/95 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3B5C65] bg-[#18292E] text-xs font-semibold text-[#9ED4AC] hover:text-[#EAF2C9] hover:bg-[#22373D] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Home</span>
          </button>

          <div className="h-4 w-[1px] bg-[#3B5C65]" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#2EA8A4] text-[#18292E] font-black text-base shadow-md">
              B
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#EAF2C9]">
              BIZRA <span className="text-[#2EA8A4] font-normal text-xs uppercase px-1.5 py-0.5 rounded bg-[#2EA8A4]/15 border border-[#2EA8A4]/30 font-mono">AI Agent</span>
            </span>

            {/* Live Location Badge */}
            {locationStatus === 'granted' && userLocation && (
              <button
                onClick={autoDetectLocation}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2EA8A4]/15 text-[#2EA8A4] border border-[#2EA8A4]/30 hover:bg-[#2EA8A4]/25 transition-all cursor-pointer"
                title="Live Location active. Click to refresh location."
              >
                <MapPin size={11} className="text-[#2EA8A4] animate-pulse shrink-0" />
                <span className="max-w-[110px] sm:max-w-[170px] truncate">
                  {userLocation.city ? `${userLocation.city}, ${userLocation.state}` : userLocation.address}
                </span>
              </button>
            )}

            {locationStatus === 'locating' && (
              <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9ED4AC]/15 text-[#9ED4AC] border border-[#9ED4AC]/30 font-mono">
                <Loader2 size={11} className="animate-spin text-[#9ED4AC] shrink-0" />
                <span className="hidden sm:inline">Locating...</span>
              </div>
            )}

            {(locationStatus === 'idle' || locationStatus === 'denied' || locationStatus === 'error') && (
              <button
                onClick={autoDetectLocation}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#22373D] text-[#9ED4AC] hover:text-[#2EA8A4] border border-[#3B5C65] hover:border-[#2EA8A4]/40 transition-all cursor-pointer"
                title="Click to grant live location access for regional market data"
              >
                <LocateFixed size={11} className="shrink-0" />
                <span className="hidden sm:inline">Location Access</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Tab Switcher Actions */}
        <div className="flex items-center gap-2">
          {/* Mode Switch Pills */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#18292E] border border-[#3B5C65]">
            <button
              onClick={() => setCurrentTab('manual')}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-[#9ED4AC] hover:text-[#EAF2C9] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass size={13} />
              <span>Manual</span>
            </button>
            <button
              onClick={() => setCurrentTab('chatbot')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all bg-[#2EA8A4] text-[#18292E] shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Bot size={13} />
              <span>AI Chatbot</span>
            </button>
          </div>

          <button
            onClick={resetChat}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#18292E] border border-[#3B5C65] text-xs font-medium text-[#9ED4AC] hover:text-[#EAF2C9] hover:bg-[#22373D] transition-colors cursor-pointer"
            title="Reset Session"
          >
            <RotateCcw size={13} />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            onClick={() => setCurrentTab('landing')}
            className="p-1.5 rounded-xl border border-[#3B5C65] bg-[#18292E] text-[#9ED4AC] hover:text-[#EAF2C9] hover:bg-[#22373D] transition-colors cursor-pointer"
            aria-label="Exit"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="grid grid-cols-1 lg:grid-cols-12 flex-grow overflow-hidden">

        {/* Chat Feed Column (Left 8 Cols) */}
        <div className="lg:col-span-8 flex flex-col h-full relative overflow-hidden border-r border-[#3B5C65] bg-[#18292E]">

          {/* Scrollable Feed */}
          <div className="flex-grow overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                <div
                  className={`max-w-[580px] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-[#2EA8A4] text-[#18292E] rounded-br-none shadow-md font-medium'
                    : 'bg-[#22373D] text-[#EAF2C9] border border-[#3B5C65] rounded-bl-none shadow-lg'
                    }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <ResponseRenderer text={msg.text} />
                  )}
                  <div className={`text-[10px] font-bold mt-2 text-right ${msg.sender === 'user'
                    ? 'text-[#111D21]'
                    : 'text-[#9ED4AC]'
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
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer text-left bg-[#22373D] text-[#EAF2C9] border-[#3B5C65] hover:border-[#2EA8A4] hover:bg-[#2A444C]"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="p-3 rounded-xl border border-[#3B5C65] text-xs w-fit flex items-center gap-2 bg-[#22373D] text-[#EAF2C9]">
                <span className="w-2 h-2 rounded-full bg-[#2EA8A4] animate-ping" />
                <span>BIZRA AI Agent is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-[#3B5C65] bg-[#111D21]">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex items-center gap-2 rounded-xl p-1.5 border border-[#3B5C65] focus-within:border-[#2EA8A4] transition-colors bg-[#18292E]"
            >
              <button
                type="button"
                onClick={autoDetectLocation}
                className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${locationStatus === 'granted'
                  ? 'text-[#2EA8A4] hover:bg-[#2EA8A4]/10'
                  : 'text-[#9ED4AC] hover:text-[#EAF2C9] hover:bg-[#22373D]'
                  }`}
                title={userLocation ? `Location Active: ${userLocation.address}` : "Access live location"}
              >
                {locationStatus === 'locating' ? (
                  <Loader2 size={16} className="animate-spin text-[#9ED4AC]" />
                ) : (
                  <MapPin size={16} className={locationStatus === 'granted' ? 'text-[#2EA8A4]' : ''} />
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
                className="flex-grow px-2 py-2 bg-transparent text-xs sm:text-sm focus:outline-none text-[#EAF2C9] placeholder-[#9ED4AC]/60"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${inputQuery.trim()
                  ? 'bg-[#2EA8A4] text-[#18292E] hover:bg-[#258B87] shadow-sm'
                  : 'bg-[#22373D] text-[#9ED4AC]/40 cursor-not-allowed'
                  }`}
              >
                <Send size={15} />
              </button>
            </form>
          </div>

        </div>

        {/* Right Sidebar (4 Cols) - Navigation & WhatsApp/Telegram Bot (Matching BizraManual) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-between p-6 border-l border-[#3B5C65] bg-[#111D21] text-[#EAF2C9] overflow-y-auto">
          <div className="space-y-6 my-auto">
            {/* Mode Switcher Card */}
            <div className="p-5 rounded-2xl border border-[#3B5C65] bg-[#18292E] space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2EA8A4]/20 border border-[#2EA8A4]/30 flex items-center justify-center text-[#2EA8A4]">
                  <Compass size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#EAF2C9]">Prefer Guided Step-by-Step?</h3>
                  <span className="text-xs text-[#9ED4AC]">Switch to BIZRA Manual Wizard</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentTab('manual')}
                className="w-full py-2.5 rounded-xl bg-[#2EA8A4] text-[#18292E] font-black text-xs uppercase tracking-wider shadow-md hover:bg-[#258B87] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass size={14} />
                <span>Launch Manual Wizard</span>
              </button>
            </div>

            {/* WhatsApp / Telegram Concierge Card */}
            <div
              className={`p-6 rounded-2xl border shadow-xl text-center transition-all duration-300 ${
                messagingTab === 'whatsapp'
                  ? 'border-[#25D366]/40 bg-[#25D366] text-white'
                  : 'border-[#0088CC]/40 bg-[#0088CC] text-white'
              }`}
            >
              {/* Concierge Platform Switcher Buttons */}
              <div className="inline-flex items-center p-1 rounded-xl mb-4 bg-white/20 border border-white/30">
                <button
                  onClick={() => setMessagingTab('whatsapp')}
                  className={`px-3.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    messagingTab === 'whatsapp'
                      ? 'bg-white text-[#25D366] shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setMessagingTab('telegram')}
                  className={`px-3.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    messagingTab === 'telegram'
                      ? 'bg-white text-[#0088CC] shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Telegram
                </button>
              </div>

              {/* Dynamic Real Brand Icon Badge */}
              <div
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform mb-4 ${
                  messagingTab === 'whatsapp'
                    ? 'bg-white text-[#25D366]'
                    : 'bg-white text-[#0088CC]'
                }`}
                onClick={openMessagingBot}
              >
                {messagingTab === 'whatsapp' ? (
                  <svg className="w-10 h-10 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 fill-[#0088CC] ml-0.5" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.331.016.11.036.353.02.547z" />
                  </svg>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-black text-lg">
                  {messagingTab === 'whatsapp' ? 'Chat on WhatsApp' : 'Chat on Telegram'}
                </h3>
                <p className="text-xs max-w-xs mx-auto leading-relaxed font-medium text-white/90">
                  Connect with BIZRA AI on {messagingTab === 'whatsapp' ? 'WhatsApp' : 'Telegram'} for instant feasibility reports and mandi price alerts.
                </p>
              </div>

              <button
                onClick={openMessagingBot}
                className={`mt-5 px-6 py-2.5 rounded-xl uppercase font-extrabold tracking-wider cursor-pointer text-xs shadow-md transition-all ${
                  messagingTab === 'whatsapp'
                    ? 'bg-[#128C7E] text-white hover:bg-[#075E54]'
                    : 'bg-[#0F172A] text-white hover:bg-[#0284C7]'
                }`}
              >
                {messagingTab === 'whatsapp' ? 'Open WhatsApp Bot' : 'Open Telegram Bot'}
              </button>
            </div>

            {/* Popular Questions List */}
            <div className="p-5 rounded-2xl border border-[#3B5C65] bg-[#18292E] space-y-3 text-left">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#9ED4AC]">Popular Questions</h4>
              <div className="space-y-2">
                {[
                  'Which business is best in my area?',
                  'How much loan can I get?',
                  'What government schemes can I apply for?',
                  'How to start a bakery business?'
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="w-full p-2.5 rounded-xl border border-[#3B5C65]/80 bg-[#111D21] text-left text-xs font-semibold text-[#EAF2C9] hover:text-[#2EA8A4] hover:border-[#2EA8A4]/50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{q}</span>
                    <ChevronRight size={14} className="text-[#9ED4AC]/70 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3B5C65] text-center text-[10px] uppercase tracking-widest text-[#9ED4AC]/70">
            BIZRA Official Mobile Concierge
          </div>
        </div>

      </main>

    </div>
  );
}
