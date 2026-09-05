import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  CircleCheck,
  Database,
  FileCheck2,
  FileText,
  Flag,
  Info,
  Lightbulb,
  MapPin,
  MapPinned,
  ScanSearch,
  ShieldCheck,
} from 'lucide-react';
import heroBg from '../assets/824784.jpg';
import valleyBottom from '../assets/valley6.bf02ee47.avif';
import ScrollVelocity from './ScrollVelocity';

gsap.registerPlugin(ScrollTrigger);

const budgetOptions = [
  { value: '', label: 'Select a range' },
  { value: 'low', label: '₹50,000 – ₹1 lakh' },
  { value: 'mid', label: '₹1 – ₹3 lakhs' },
  { value: 'high', label: '₹3 – ₹10 lakhs' },
  { value: 'enterprise', label: 'Above ₹10 lakhs' },
];

const commitments = [
  { title: 'Free public utility', description: 'Open to every citizen', Icon: BadgeCheck },
  { title: 'Official datasets', description: 'Source-led public records', Icon: Database },
  { title: 'Hyper-local data', description: 'Place matters to the answer', Icon: MapPinned },
  { title: 'Bank-loan ready', description: 'Reports shaped for next steps', Icon: FileCheck2 },
];

const workflowStations = [
  {
    number: '01',
    title: 'Choose location',
    description: 'State, district, or village block sets the evidence boundary.',
    status: 'Request detail',
    Icon: MapPin,
  },
  {
    number: '02',
    title: 'Describe the idea',
    description: 'Add category, budget, and optional space or experience details.',
    status: 'Request detail',
    Icon: Lightbulb,
  },
  {
    number: '03',
    title: 'Check local evidence',
    description: 'Demand, competition, suppliers, and seasonal records are matched.',
    status: 'Analysis',
    Icon: ScanSearch,
  },
  {
    number: '04',
    title: 'Read the report',
    description: 'See score, assumptions, scheme matches, and a SWOT summary.',
    status: 'Output',
    Icon: FileText,
  },
  {
    number: '05',
    title: 'Take the next step',
    description: 'Download a proposal, check permits, or ask for regional help.',
    status: 'Action',
    Icon: Flag,
  },
];

const audienceProfiles = {
  aspiring: {
    stage: 'Pre-launch blueprint',
    title: 'Aspiring Entrepreneurs',
    description: 'Formulate and validate your business idea with hyper-local demographics, demand indices, and subsidized capital roadmaps.',
    features: [
      ['Pincode market reports', 'Local consumer demand and demographic volume index'],
      ['PMEGP subsidy guidance', 'Up to 35% government capital subsidy assistance matches'],
      ['Regulatory checklist', 'Licensing, NOCs, GST, and trade permit sequence'],
      ['Supplier proximity map', 'Sourcing distance to wholesale mandis and machinery blocks'],
    ],
    stats: [
      ['Recommended capital', '₹50,000 – ₹3 Lakhs', 'Low entry barrier'],
      ['Break-even horizon', '6 – 9 Months', 'High liquidity model'],
      ['Viability index', '88% High', 'Verified across 12 sectors'],
    ],
  },
  existing: {
    stage: 'Scale & expansion',
    title: 'Existing Business Owners',
    description: 'Unlock growth opportunities with regional pricing benchmarks, consumer preference shifts, and multi-district supply networks.',
    features: [
      ['Seasonal demand forecasting', 'Quarterly sales fluctuations and crop cycles'],
      ['Competitor density alerts', 'Nearby new venture registrations and market pressure'],
      ['Cold-chain & freight linkage', 'Transportation route efficiency and cost optimization'],
      ['Bulk machinery grants', 'Technology upgradation subsidy scheme guidance'],
    ],
    stats: [
      ['Margin improvement', '+18% – 25%', 'With direct sourcing'],
      ['Customer reach', '3.2× expansion', 'Across adjoining blocks'],
      ['Efficiency gain', '34% lower waste', 'With seasonal planning'],
    ],
  },
  youth: {
    stage: 'Digital ventures',
    title: 'Rural Youth & Innovators',
    description: 'Launch tech-enabled rural startups across agritech, logistics, common service centres, and local e-commerce.',
    features: [
      ['Drone & agritech blueprints', 'Farm-tech service models with low initial outlay'],
      ['Incubation hub access', 'Links to rural innovation centres and mentors'],
      ['Digital service franchises', 'CSC, banking correspondent, and fintech portals'],
      ['Micro-venture grants', 'Startup India and state youth startup aid'],
    ],
    stats: [
      ['Top growth domain', 'Agri-logistics', '42% YoY sector growth'],
      ['Maximum grant aid', 'Up to ₹5 Lakhs', 'Seed stage assistance'],
      ['Skill match ratio', '94% aligned', 'Vocational compatibility'],
    ],
  },
  women: {
    stage: 'Women-led enterprise',
    title: 'Women Entrepreneurs',
    description: 'Find concessional credit, SHG cluster linkages, women-focused grants, and direct markets for your enterprise.',
    features: [
      ['Mudra scheme quotas', 'Tarun and Kishor loans with relaxed collateral terms'],
      ['SHG cluster integration', 'Shared packaging and collective bargaining power'],
      ['Direct market exhibitions', 'SARAS melas and national export expos'],
      ['Dedicated mentorship', 'Peer advice and certified financial guidance'],
    ],
    stats: [
      ['Interest subvention', 'Up to 5% off', 'Concessional credit rates'],
      ['Government backing', '100% guaranteed', 'Under CGTMSE coverage'],
      ['Cluster access', '450+ SHGs', 'Active partner networks'],
    ],
  },
};

const recordCounts = [
  ['354,773+', 'public datasets'],
  ['500+', 'districts covered'],
  ['12.6 M+', 'reports generated'],
  ['840+', 'data officers'],
];

const updates = [
  {
    date: '11 MAY 2024',
    source: 'Ministry of Agriculture',
    title: 'District agriculture & mandi yield metrics 2024–25',
    description: 'Seasonal yield trends, fertilizer price indices, and procurement metrics updated across rural districts.',
    stat: '400+',
    statLabel: 'districts updated',
  },
  {
    date: '03 MAY 2024',
    source: 'Digital India OGD Team',
    title: 'BIZRA crosses one million registered rural founders',
    description: 'Feasibility sheets and bank-loan proposals created by rural citizens across the public utility.',
    stat: '1M+',
    statLabel: 'registered founders',
  },
  {
    date: '25 APR 2024',
    source: 'MSME Development Institute',
    title: 'Workshop: using open data for Mudra loans',
    description: 'Bank managers and founders review how to present local evidence in a project proposal.',
    stat: '8,500',
    statLabel: 'attendees',
  },
];

const sampleEvidence = [
  { label: 'Demand', value: 'High', tone: 'green' },
  { label: 'Competition', value: 'Moderate', tone: 'amber' },
  { label: 'Possible subsidy', value: 'Up to 35%', tone: 'green' },
  { label: 'Liquidity', value: 'High', tone: 'neutral' },
];

function validateRequest(values) {
  const errors = {};
  if (!values.location.trim()) errors.location = 'Add a state, district, or village block.';
  if (!values.idea.trim()) errors.idea = 'Describe the business you are considering.';
  if (!values.budget) errors.budget = 'Choose an approximate starting range.';
  return errors;
}

function ReportRequestForm() {
  const [values, setValues] = useState({ location: '', idea: '', budget: '' });
  const [touched, setTouched] = useState({ location: false, idea: false, budget: false });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setStatus('idle');
    if (touched[field]) setErrors(validateRequest(nextValues));
  };

  const handleBlur = (field) => {
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    setErrors(validateRequest(values));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateRequest(values);
    setTouched({ location: true, idea: true, budget: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }
    setStatus('ready');
  };

  const fieldError = (field) => (touched[field] || status === 'error' ? errors[field] : '');

  return (
    <form className="BIZRA-field-sheet" aria-label="Start a feasibility report" onSubmit={handleSubmit} noValidate>
      <div className="BIZRA-sheet-head">
        <div>
          <div className="BIZRA-sheet-kicker">Report request</div>
          <div className="BIZRA-sheet-title">Tell us the three things we need first.</div>
        </div>
        <span className="BIZRA-sheet-progress BIZRA-mono">01 — 03</span>
      </div>

      <div className="BIZRA-field-row">
        <div className="BIZRA-field">
          <label htmlFor="location">
            Location
            <span>State, district, or village block</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={values.location}
            placeholder="e.g. Coimbatore, Tamil Nadu"
            aria-invalid={Boolean(fieldError('location'))}
            aria-describedby={fieldError('location') ? 'location-error' : undefined}
            onChange={(event) => updateField('location', event.target.value)}
            onBlur={() => handleBlur('location')}
          />
          {fieldError('location') && <span className="BIZRA-field-error" id="location-error">{fieldError('location')}</span>}
        </div>

        <div className="BIZRA-field">
          <label htmlFor="idea">
            Business idea
            <span>What are you considering?</span>
          </label>
          <input
            id="idea"
            name="idea"
            type="text"
            value={values.idea}
            placeholder="e.g. dairy processing"
            aria-invalid={Boolean(fieldError('idea'))}
            aria-describedby={fieldError('idea') ? 'idea-error' : undefined}
            onChange={(event) => updateField('idea', event.target.value)}
            onBlur={() => handleBlur('idea')}
          />
          {fieldError('idea') && <span className="BIZRA-field-error" id="idea-error">{fieldError('idea')}</span>}
        </div>

        <div className="BIZRA-field">
          <label htmlFor="budget">
            Investment capacity
            <span>Approximate starting range</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            aria-invalid={Boolean(fieldError('budget'))}
            aria-describedby={fieldError('budget') ? 'budget-error' : undefined}
            onChange={(event) => updateField('budget', event.target.value)}
            onBlur={() => handleBlur('budget')}
          >
            {budgetOptions.map((option) => (
              <option key={option.value || 'placeholder'} value={option.value} disabled={!option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldError('budget') && <span className="BIZRA-field-error" id="budget-error">{fieldError('budget')}</span>}
        </div>
      </div>

      <div className="BIZRA-sheet-foot">
        <small>Your answers remain editable. A report may be limited where local records are incomplete or out of date.</small>
        <button className="BIZRA-primary" type="submit">
          <span>{status === 'ready' ? 'Request saved' : 'Build my report'}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      {status === 'ready' && (
        <div className="BIZRA-form-status" role="status">
          Request saved locally. Continue when a report service is connected; no live dataset request was made.
        </div>
      )}
      {status === 'error' && (
        <div className="BIZRA-form-status error" role="alert">
          Check the highlighted details before building your report.
        </div>
      )}
    </form>
  );
}

function SampleReportCard() {
  return (
    <div className="BIZRA-sample-wrap">
      <div className="BIZRA-sample-frame">
        <div className="BIZRA-sample-top">
          <div className="BIZRA-sample-label">
            <span className="square" aria-hidden="true" />
            <span>Sample report</span>
          </div>
          <span className="BIZRA-sample-state BIZRA-mono">NOT A LIVE RESULT</span>
        </div>
        <img
          className="BIZRA-sample-image"
          src="/hero_tractor.png"
          alt="Illustrated farmer working with a tractor in a rural field"
          decoding="async"
          fetchPriority="high"
        />
        <div className="BIZRA-sample-caption">
          <span className="BIZRA-mono">SAMPLE REQUEST · COIMBATORE, TAMIL NADU</span>
          <h3>Dairy processing feasibility</h3>
          <p>Illustrative report preview showing the kind of local evidence BIZRA organizes before you commit capital.</p>
        </div>
        <div className="BIZRA-sample-evidence" aria-label="Illustrative report evidence">
          {sampleEvidence.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong className={item.tone}>{item.value}</strong>
            </div>
          ))}
        </div>
        <div className="BIZRA-sample-source">
          <strong>Based on available verified government datasets.</strong>{' '}
          Sample values are shown for explanation and should not be treated as an eligibility decision.
        </div>
      </div>
    </div>
  );
}

function CommitmentStrip() {
  const row1Node = (
    <div className="flex items-center gap-3 py-1">
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><BadgeCheck size={16} /></span>
        <span>Free public utility</span>
        <span className="sub-desc">· Open to every citizen</span>
      </div>
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><Database size={16} /></span>
        <span>Official datasets</span>
        <span className="sub-desc">· Source-led public records</span>
      </div>
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><MapPinned size={16} /></span>
        <span>Hyper-local data</span>
        <span className="sub-desc">· Place matters to the answer</span>
      </div>
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><FileCheck2 size={16} /></span>
        <span>Bank-loan ready</span>
        <span className="sub-desc">· Reports shaped for next steps</span>
      </div>
    </div>
  );

  const row2Node = (
    <div className="flex items-center gap-3 py-1">
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><ShieldCheck size={16} /></span>
        <span>Verified OGD Datasets</span>
        <span className="sub-desc">· Direct central & state feeds</span>
      </div>
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><Check size={16} /></span>
        <span>100% Free Public Utility</span>
        <span className="sub-desc">· Zero subscription fees</span>
      </div>
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><BadgeCheck size={16} /></span>
        <span>Government Loan Schemes</span>
        <span className="sub-desc">· PMEGP & Mudra guidance</span>
      </div>
      <div className="scroll-velocity-item">
        <span className="scroll-velocity-icon"><CircleCheck size={16} /></span>
        <span>Institutional Feasibility</span>
        <span className="sub-desc">· Instant SWOT & Demand index</span>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#111D21] border-y border-[#3B5C65] py-4 overflow-hidden shadow-inner" aria-label="BIZRA service commitments">
      <ScrollVelocity
        texts={[row1Node, row2Node]}
        velocity={60}
        numCopies={4}
        damping={40}
        stiffness={300}
      />
    </div>
  );
}

function EvidenceSection() {
  return (
    <section className="BIZRA-section" id="why-BIZRA" aria-labelledby="evidence-title">
      <div className="BIZRA-shell">
        <div className="BIZRA-section-head">
          <div>
            <div className="BIZRA-section-index">02 / LOCAL EVIDENCE</div>
            <h2 id="evidence-title">The report is built from evidence you can inspect.</h2>
          </div>
          <p>One readable document brings local demand, competition, and capital guidance together—without asking you to decode a dashboard.</p>
        </div>

        <div className="BIZRA-evidence-grid">
          <div className="BIZRA-report-paper">
            <div className="BIZRA-paper-top">
              <div>
                <span className="BIZRA-mono">BIZRA FEASIBILITY REPORT</span>
                <strong>Dairy processing · Coimbatore</strong>
              </div>
              <span className="BIZRA-paper-stamp">SAMPLE ONLY</span>
            </div>
            <div className="BIZRA-paper-intro">
              <h3>What the local records suggest</h3>
              <p>Evidence is grouped by the decision it helps you make. Each section can be checked against its source and date.</p>
            </div>
            <div className="BIZRA-fragment-row">
              <div className="BIZRA-fragment BIZRA-fragment-demand">
                <span className="BIZRA-fragment-label">01 · Local demand</span>
                <h4>Demand signal</h4>
                <div className="big-answer">High</div>
                <div className="BIZRA-line-meter" aria-label="Illustrative high demand meter">
                  <span className="active" /><span className="active" /><span className="active" /><span className="active" /><span />
                </div>
                <p className="BIZRA-fragment-foot">Fresh milk, curd, paneer, and ghee show the strongest local opportunity in this sample.</p>
              </div>
              <div className="BIZRA-fragment BIZRA-fragment-competition">
                <span className="BIZRA-fragment-label">02 · Nearby supply</span>
                <h4>Competition check</h4>
                <div className="metric"><strong>12</strong><span>registered units</span></div>
                <div className="metric"><strong>6.4 km</strong><span>nearest mandi</span></div>
                <p className="BIZRA-fragment-foot">A gap remains for branded value-added goods.</p>
              </div>
            </div>
            <div className="BIZRA-fragment BIZRA-fragment-capital">
              <div>
                <span className="BIZRA-fragment-label">03 · Capital</span>
                <strong>₹1.2–2.5L</strong>
                <span>recommended start</span>
              </div>
              <div>
                <span className="BIZRA-fragment-label">04 · Scheme</span>
                <strong>PMEGP</strong>
                <span>possible margin support</span>
              </div>
              <div>
                <span className="BIZRA-fragment-label">05 · Timing</span>
                <strong>6–9 mo.</strong>
                <span>estimated break-even</span>
              </div>
            </div>
          </div>

          <div className="BIZRA-evidence-copy">
            <h3>Three questions before a business decision.</h3>
            <p>BIZRA organizes the information around the choices you need to make—not around the datasets themselves.</p>
            <ol className="BIZRA-evidence-list">
              <li>
                <span className="list-number">01</span>
                <div><strong>Is there demand here?</strong><span>Local demographics, trade records, seasonal patterns, and purchasing signals.</span></div>
              </li>
              <li>
                <span className="list-number">02</span>
                <div><strong>Who already serves the area?</strong><span>Nearby business registrations, supplier distances, and market gaps.</span></div>
              </li>
              <li>
                <span className="list-number">03</span>
                <div><strong>What support may apply?</strong><span>Capital ranges, possible schemes, licensing steps, and a practical launch order.</span></div>
              </li>
            </ol>
            <div className="BIZRA-source-note">
              <Info size={16} aria-hidden="true" />
              <span>Every result should show its source, date, assumptions, and limitations. A missing record is shown as missing—not filled with a guess.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessLine() {
  return (
    <section className="BIZRA-section BIZRA-process-section" id="how-it-works" aria-labelledby="process-title">
      <div className="BIZRA-shell">
        <div className="BIZRA-section-head">
          <div>
            <div className="BIZRA-section-index">03 / THE REPORT LINE</div>
            <h2 id="process-title">Five steps from a place to a plan.</h2>
          </div>
          <p>You provide the context. BIZRA prepares the evidence, explains the result, and keeps the next action visible.</p>
        </div>
        <div className="BIZRA-process-line">
          {workflowStations.map(({ number, title, description, status, Icon }) => (
            <article className="BIZRA-station" key={number}>
              <div className="BIZRA-station-top">
                <div className="BIZRA-station-node"><Icon size={20} aria-hidden="true" /></div>
                <span className="BIZRA-station-number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="BIZRA-station-status"><CircleCheck size={12} aria-hidden="true" />{status}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceAdvisory() {
  const [activeAudience, setActiveAudience] = useState('aspiring');
  const branchRefs = useRef([]);
  const profile = audienceProfiles[activeAudience];
  const branchKeys = Object.keys(audienceProfiles);
  const branchLabels = {
    aspiring: 'Aspiring founder',
    existing: 'Existing business',
    youth: 'Rural youth & innovators',
    women: 'Women-led enterprise',
  };

  const handleBranchKeyDown = (event, index) => {
    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % branchKeys.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + branchKeys.length) % branchKeys.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = branchKeys.length - 1;
    if (nextIndex !== index) {
      event.preventDefault();
      const nextKey = branchKeys[nextIndex];
      setActiveAudience(nextKey);
      branchRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section className="BIZRA-section" aria-labelledby="audience-title">
      <div className="BIZRA-shell">
        <div className="BIZRA-section-head">
          <div>
            <div className="BIZRA-section-index">04 / YOUR STARTING POINT</div>
            <h2 id="audience-title">Choose the help that fits your stage.</h2>
          </div>
          <p>The same report route adapts to the kind of decision you are making today. Select one branch to see the practical guidance.</p>
        </div>

        <div className="BIZRA-audience-layout">
          <div className="BIZRA-branch-list" role="tablist" aria-label="Founder stage">
            {branchKeys.map((key, index) => (
              <button
                key={key}
                ref={(node) => { branchRefs.current[index] = node; }}
                className={`BIZRA-branch-button ${activeAudience === key ? 'active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeAudience === key}
                aria-controls="audience-panel"
                tabIndex={activeAudience === key ? 0 : -1}
                onClick={() => setActiveAudience(key)}
                onKeyDown={(event) => handleBranchKeyDown(event, index)}
              >
                <span className="branch-index">{String.fromCharCode(65 + index)}</span>
                <strong>{branchLabels[key]}</strong>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="BIZRA-advisory-panel" id="audience-panel" role="tabpanel" aria-label={`${profile.title} guidance`}>
            <div className="BIZRA-advisory-top">
              <div>
                <div className="BIZRA-stage-label">{profile.stage}</div>
                <h3>{profile.title}</h3>
                <p className="BIZRA-advisory-desc">{profile.description}</p>
              </div>
              {activeAudience === 'women' && (
                <img
                  className="BIZRA-audience-photo"
                  src="/woman_entrepreneur.png"
                  alt="Woman entrepreneur in a rural business setting"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <div className="BIZRA-advisory-body">
              <div className="BIZRA-feature-list">
                {profile.features.map(([title, description]) => (
                  <div className="BIZRA-feature-item" key={title}>
                    <Check size={16} aria-hidden="true" />
                    <div><strong>{title}</strong><span>{description}</span></div>
                  </div>
                ))}
              </div>
              <div className="BIZRA-advisory-stats">
                {profile.stats.map(([label, value, note]) => (
                  <div className="BIZRA-advisory-stat" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <em>{note}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicRecordDocket() {
  return (
    <section className="BIZRA-section BIZRA-docket-section" aria-labelledby="record-title">
      <div className="BIZRA-shell BIZRA-docket-layout">
        <div className="BIZRA-docket-intro">
          <div className="BIZRA-section-index">05 / PUBLIC RECORD</div>
          <h2 id="record-title">Official notices, in plain view.</h2>
          <p>Updates belong beside their source and date. The public record is supporting evidence—not a decorative news grid.</p>
          <div className="BIZRA-record-counts">
            {recordCounts.map(([value, label]) => (
              <div className="BIZRA-record-count" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="BIZRA-docket">
          {updates.map((update) => (
            <article className="BIZRA-docket-item" key={update.title}>
              <div className="BIZRA-docket-date">{update.date}<small>{update.source}</small></div>
              <div>
                <h3>{update.title}</h3>
                <p>{update.description}</p>
              </div>
              <div className="BIZRA-docket-stat">{update.stat}<span>{update.statLabel}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderStory() {
  return (
    <section className="BIZRA-story-section" aria-labelledby="story-title">
      <div className="BIZRA-shell BIZRA-story-grid">
        <div className="BIZRA-story-quote">
          <div className="BIZRA-quote-mark" aria-hidden="true">“</div>
          <blockquote>BIZRA helped me understand local market demand for my dairy business. The insights were easy to understand and bank-loan ready.</blockquote>
          <div className="BIZRA-story-person">
            <span className="BIZRA-person-initial" aria-hidden="true">RS</span>
            <div><strong>Rameshwar Singh</strong><span>Dairy farmer · Uttar Pradesh</span></div>
          </div>
        </div>
        <div className="BIZRA-story-proof">
          <div>
            <div className="BIZRA-proof-label">Evidence-led founder story</div>
            <h3 id="story-title">The value is not the score. It is knowing what to do next.</h3>
            <p>This account validates the report’s local-demand explanation and its bank-ready proposal path. No star rating is needed where the capability can be named.</p>
          </div>
          <div className="BIZRA-proof-row">
            <div><strong>Demand → proposal</strong><span>Capability this story validates</span></div>
            <ArrowUpRight size={24} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const valleyImgRef = useRef(null);
  const heroWrapRef = useRef(null);

  useEffect(() => {
    const valley = valleyImgRef.current;
    const heroSection = heroWrapRef.current?.querySelector('section');
    if (!valley || !heroSection) return;

    // Reset valley to its natural position on mount.
    gsap.set(valley, { yPercent: 0 });

    // Use GSAP pin:true so ScrollTrigger both locks the hero in view AND
    // creates the extra scroll space itself (no blank-page 200vh wrapper needed).
    // pinSpacing:true (default) inserts a spacer equal to the pinned element's
    // height after the pin ends — this is what pushes the next section down
    // seamlessly with zero blank gap visible.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        // pin for 100vh of additional scroll distance for the valley animation
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: 'valley-pull-trigger',
      },
    });

    // Slide valley from 0% → 120% of its own height so it fully exits the
    // hero frame before the hero unpins and normal scroll continues.
    tl.to(valley, {
      yPercent: 120,
      ease: 'none',
    });

    return () => {
      const st = ScrollTrigger.getById('valley-pull-trigger');
      if (st) st.kill();
      tl.kill();
      gsap.set(valley, { clearProps: 'all' });
    };
  }, []);

  return (
    <div className="field-notebook">
      <main>
        {/* Hero section wrapper — GSAP ScrollTrigger pins the inner section
             and creates scroll space automatically. No fixed height needed. */}
        <div ref={heroWrapRef} className="hero-pin-wrap">
          <section
            className="relative w-full h-screen py-8 sm:py-12 md:py-16 px-6 overflow-hidden flex flex-col items-center justify-center text-center border-b border-[#3B5C65]"
            id="start-report"
            aria-labelledby="hero-title"
            // GSAP ScrollTrigger handles pinning via pin:true
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(17, 29, 33, 0.85), rgba(24, 41, 46, 0.70)), url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Text & title content — sits above the valley image (z-20), locked in place */}
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-20 relative -translate-y-12 sm:-translate-y-16 md:-translate-y-20">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#2EA8A4]/15 border border-[#2EA8A4]/35 text-[#9ED4AC] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-4 shadow-md backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2EA8A4] animate-pulse" />
                START WITH THE GROUND YOU KNOW
              </span>

              {/* Main Headline */}
              <h1
                id="hero-title"
                className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-[#EAF2C9] leading-[0.96] max-w-4xl mx-auto mb-4 drop-shadow-xl"
              >
                Know the ground before you{' '}
                <span className="font-palace text-[#2EA8A4] normal-case tracking-normal text-[1.12em] inline-block font-normal">
                  invest.
                </span>
              </h1>

              {/* Subtitle / Lede */}
              <p className="text-base sm:text-lg md:text-xl text-[#9ED4AC] font-medium leading-relaxed max-w-2xl mx-auto mb-6 drop-shadow-md">
                Build a clear, local feasibility report from the place, idea, and budget you already have. BIZRA turns public records into practical next steps for rural businesses.
              </p>

              {/* Note / Tagline */}
              <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#EAF2C9]/90 bg-[#18292E]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#3B5C65] shadow-xl">
                <ShieldCheck size={16} className="text-[#2EA8A4] shrink-0" />
                <span>Free public utility · Uses available verified government datasets</span>
              </div>
            </div>

            {/* Valley Bottom Image — sits over the hero (z-10), pulled down on scroll */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
              <img
                ref={valleyImgRef}
                src={valleyBottom}
                alt="Valley landscape framing"
                onLoad={() => ScrollTrigger.refresh()}
                className="absolute top-0 left-0 w-full h-[115%] object-cover object-top block will-change-transform"
              />
            </div>
          </section>
        </div>

        <CommitmentStrip />
        <EvidenceSection />
        <ProcessLine />
        <AudienceAdvisory />
        <PublicRecordDocket />
        <FounderStory />
        <section className="BIZRA-closing" aria-labelledby="closing-title">
          <div className="BIZRA-shell BIZRA-closing-inner">
            <div>
              <h2 id="closing-title">Ready to begin with your location?</h2>
              <p>Start a free feasibility report and keep every answer editable.</p>
            </div>
            <a className="BIZRA-primary" href="#start-report">
              <span>Start a feasibility report</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
