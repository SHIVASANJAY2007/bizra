import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

export default function Footer({ setCurrentTab }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 3000); }
  };

  return (
    <footer style={{ background: 'var(--bg-darkest)', borderTop: '1px solid var(--border-subtle)' }} className="pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentTab('landing')}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, var(--emerald), #059669)', boxShadow: '0 0 20px var(--emerald-glow)' }}>
                <span className="font-black text-lg text-white tracking-tighter">B</span>
              </div>
              <div>
                <span className="font-black text-xl tracking-wider block leading-none" style={{ color: 'var(--text-white)' }}>BIZRA</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] block mt-1" style={{ color: 'var(--text-dim)' }}>
                  Build · Inform · Zone · Rise · Achieve
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              A Government of India Initiative to empower rural entrepreneurs through open data, AI-driven insights, and hyper-local market intelligence.
            </p>
            <div className="flex items-center gap-3">
              {['Facebook', 'Twitter', 'YouTube', 'LinkedIn', 'Instagram'].map((name, i) => (
                <a key={name} href="#" title={name}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--emerald)'; e.currentTarget.style.color = 'var(--emerald-bright)'; e.currentTarget.style.boxShadow = '0 0 12px var(--emerald-glow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <span className="text-xs font-bold">{name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 pb-2"
              style={{ color: 'var(--text-white)', borderBottom: '1px solid var(--border-subtle)' }}>Explore</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'How It Works', tab: 'how-it-works' },
                { label: 'Why BIZRA', tab: 'about' },
                { label: 'BIZRA AI Agent', tab: 'chatbot' },
              ].map(link => (
                <li key={link.tab}>
                  <button onClick={() => setCurrentTab(link.tab)}
                    className="transition-colors text-left cursor-pointer flex items-center gap-1.5"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald-bright)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <ArrowRight size={11} />{link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 pb-2"
              style={{ color: 'var(--text-white)', borderBottom: '1px solid var(--border-subtle)' }}>Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {['User Guides', 'API Documentation', 'Terms of Use', 'Privacy Policy'].map(label => (
                <li key={label}>
                  <a href="#" className="transition-colors flex items-center gap-1"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald-bright)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <ArrowRight size={10} />{label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 pb-2"
              style={{ color: 'var(--text-white)', borderBottom: '1px solid var(--border-subtle)' }}>Contact</h4>
            <div className="space-y-3.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                <p>Open Government Data (OGD) Platform, Ministry of Electronics & IT, Government of India.</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="shrink-0" style={{ color: 'var(--gold)' }} />
                <a href="mailto:support@data.gov.in" className="transition-colors"
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald-bright)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  support@data.gov.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="shrink-0" style={{ color: 'var(--gold)' }} />
                <a href="tel:011-24305565" className="transition-colors"
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald-bright)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  011-2430 5565
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row justify-between items-center gap-6 mb-14"
          style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-emerald)' }}>
          <div className="space-y-2 max-w-lg">
            <h4 className="font-bold text-lg" style={{ color: 'var(--text-white)' }}>Stay Updated with BIZRA</h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Subscribe for the latest market trends, policies, and rural business opportunities.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto max-w-md shrink-0">
            <div className="relative flex-grow">
              <input type="email" required placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-l-xl focus:outline-none text-sm"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRight: 'none', color: 'var(--text-primary)' }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--emerald)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border-light)'} />
              {subscribed && (
                <div className="absolute -top-9 left-0 px-3 py-1 rounded text-xs font-bold shadow-lg animate-fade-in"
                  style={{ background: 'var(--emerald)', color: '#fff' }}>
                  Subscribed!
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary px-6 py-3 rounded-l-none rounded-r-xl text-sm cursor-pointer flex items-center gap-1.5">
              Subscribe <Send size={13} />
            </button>
          </form>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-dim)' }}>
          <p>© 2024 data.gov.in. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {['Terms of Use', 'Privacy Policy', 'Accessibility', 'Sitemap'].map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span style={{ color: 'var(--text-dim)' }}>·</span>}
                <a href="#" className="transition-colors"
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--emerald-bright)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
                  {label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
