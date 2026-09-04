import React from 'react';

const internalLinks = [
  { label: 'Start a report', target: 'start-report', tab: 'landing' },
  { label: 'How the report is prepared', target: 'how-it-works', tab: 'how-it-works' },
  { label: 'Data and public purpose', target: 'why-BIZRA', tab: 'about' },
  { label: 'Sign in to saved reports', target: 'start-report', tab: 'landing', action: 'login' },
];

export default function Footer({ setCurrentTab, currentTab }) {
  const handleInternalLink = (event, link) => {
    event.preventDefault();
    if (link.action === 'login') {
      setCurrentTab?.('landing');
      window.setTimeout(() => document.querySelector('[aria-label="Sign in"]')?.click(), 60);
      return;
    }

    if (currentTab === 'landing' && link.target && document.getElementById(link.target)) {
      const el = document.getElementById(link.target);
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    setCurrentTab?.(link.tab);
    if (link.tab === 'landing' && link.target) {
      window.setTimeout(() => {
        const el = document.getElementById(link.target);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -80, duration: 1.0 });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
  };

  return (
    <footer className="BIZRA-footer" id="footer">
      <div className="BIZRA-shell">
        <div className="BIZRA-footer-grid">
          <div>
            <a className="BIZRA-brand" href="#start-report" onClick={(event) => handleInternalLink(event, internalLinks[0])}>
              <span className="BIZRA-brand-mark" aria-hidden="true">B</span>
              <span>
                <span className="BIZRA-brand-name">BIZRA</span>
                <span className="BIZRA-brand-sub">Rural Business Intelligence</span>
              </span>
            </a>
            <p className="footer-note">A Government of India public utility helping rural founders read local evidence, understand support options, and plan the next step.</p>
          </div>

          <div className="BIZRA-footer-column">
            <h4>Use BIZRA</h4>
            <ul>
              {internalLinks.map((link) => (
                <li key={link.label}>
                  <a href={`#${link.target}`} onClick={(event) => handleInternalLink(event, link)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="BIZRA-footer-column">
            <h4>Get help</h4>
            <ul>
              <li><a href="mailto:support@data.gov.in">Ask a regional advisor</a></li>
              <li><a href="https://www.data.gov.in/" target="_blank" rel="noreferrer">View source datasets</a></li>
              <li><a href="https://www.kviconline.gov.in/pmegpeportal/" target="_blank" rel="noreferrer">PMEGP official portal</a></li>
              <li><a href="mailto:support@data.gov.in?subject=BIZRA%20data%20issue">Report a data issue</a></li>
            </ul>
          </div>

          <div className="BIZRA-footer-column">
            <h4>Official contact</h4>
            <div className="BIZRA-footer-contact">
              Open Government Data Platform<br />
              Ministry of Electronics &amp; IT<br />
              Government of India<br /><br />
              <a href="mailto:support@data.gov.in">support@data.gov.in</a><br />
              <a href="tel:011-24305565">011-2430 5565</a>
            </div>
          </div>
        </div>

        <div className="BIZRA-footer-bottom">
          <span>© 2024 data.gov.in · Public utility · Accessibility statement</span>
          <span>Based on available verified government datasets.</span>
        </div>
      </div>
    </footer>
  );
}
