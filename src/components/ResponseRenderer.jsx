import React, { useState, createContext, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Check, Copy, ExternalLink, ChevronRight, Minus
} from 'lucide-react';

/* ─── Ordered list context (tracks counter for styled list items) ─────────── */
const ListContext = createContext({ ordered: false, counter: { val: 0 } });

/* ─── Code Block with copy button ────────────────────────────────────────── */
function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const language = (className || '').replace('language-', '') || 'code';
  const code = String(children).replace(/\n$/, '');

  return (
    <div className="my-4 rounded-xl bg-[#FFFFFF] border border-gray-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2EA8A4]">
          {language}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          {copied
            ? <><Check size={12} className="text-[#2EA8A4]" /><span className="text-[#2EA8A4]">Copied</span></>
            : <><Copy size={12} /><span>Copy</span></>
          }
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-gray-900 overflow-x-auto whitespace-pre leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ─── Inline code ─────────────────────────────────────────────────────────── */
function InlineCode({ children }) {
  return (
    <code className="bg-[#2EA8A4]/15 text-gray-500 font-mono text-[11px] px-1.5 py-0.5 rounded border border-[#2EA8A4]/30 mx-0.5">
      {children}
    </code>
  );
}

/* ─── Headings ────────────────────────────────────────────────────────────── */
const H1 = ({ children }) => (
  <div className="mt-6 mb-3 pb-3 border-b-2 border-[#2EA8A4]/40">
    <h1 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 flex items-center gap-2.5">
      <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#2EA8A4] to-[#9ED4AC] inline-block shrink-0" />
      {children}
    </h1>
  </div>
);

const H2 = ({ children }) => (
  <div className="mt-5 mb-2">
    <h2 className="text-base sm:text-lg font-extrabold text-gray-900 flex items-center gap-2">
      <span className="w-5 h-5 rounded-md bg-[#2EA8A4]/20 border border-[#2EA8A4]/40 flex items-center justify-center shrink-0">
        <ChevronRight size={12} className="text-[#2EA8A4]" />
      </span>
      {children}
    </h2>
  </div>
);

const H3 = ({ children }) => (
  <h3 className="mt-4 mb-1.5 text-sm sm:text-base font-bold text-[#2EA8A4] flex items-center gap-1.5">
    <span className="w-2 h-2 rounded-full bg-[#2EA8A4]/60 inline-block shrink-0" />
    {children}
  </h3>
);

const H4 = ({ children }) => (
  <h4 className="mt-3 mb-1 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide">
    {children}
  </h4>
);

const H5 = ({ children }) => (
  <h5 className="mt-2 mb-1 text-xs font-bold text-gray-500/80">{children}</h5>
);

const H6 = ({ children }) => (
  <h6 className="mt-1 mb-1 text-xs font-semibold text-gray-500/60">{children}</h6>
);

/* ─── Paragraph ───────────────────────────────────────────────────────────── */
const Paragraph = ({ children }) => (
  <p className="text-xs sm:text-sm leading-relaxed text-gray-900 my-1.5">{children}</p>
);

/* ─── Strong / Em / Link ──────────────────────────────────────────────────── */
const Strong = ({ children }) => (
  <strong className="font-extrabold text-gray-900">{children}</strong>
);

const Em = ({ children }) => (
  <em className="italic text-gray-500">{children}</em>
);

const Link = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-[#2EA8A4] hover:text-gray-500 font-semibold underline underline-offset-2 transition-colors mx-0.5"
  >
    {children}
    <ExternalLink size={11} />
  </a>
);

/* ─── Blockquote ─────────────────────────────────────────────────────────── */
const Blockquote = ({ children }) => (
  <blockquote className="my-4 pl-4 border-l-[3px] border-[#2EA8A4] bg-[#2EA8A4]/8 rounded-r-xl py-3 pr-4 text-gray-500 italic text-sm">
    {children}
  </blockquote>
);

/* ─── Horizontal rule ─────────────────────────────────────────────────────── */
const Hr = () => (
  <div className="my-5 flex items-center gap-3">
    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    <Minus size={12} className="text-gray-300 shrink-0" />
    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
  </div>
);

/* ─── Lists ───────────────────────────────────────────────────────────────── */
const Ul = ({ children }) => (
  <ListContext.Provider value={{ ordered: false, counter: { val: 0 } }}>
    <ul className="my-2 space-y-1.5 pl-1">{children}</ul>
  </ListContext.Provider>
);

const Ol = ({ children, start }) => {
  const counter = { val: (start ?? 1) - 1 };
  return (
    <ListContext.Provider value={{ ordered: true, counter }}>
      <ol className="my-2 space-y-1.5 pl-1 list-none">{children}</ol>
    </ListContext.Provider>
  );
};

const Li = ({ children }) => {
  const { ordered, counter } = useContext(ListContext);
  if (ordered) {
    counter.val += 1;
    const num = counter.val;
    return (
      <li className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-100/60 border border-gray-200/60 hover:border-[#2EA8A4]/40 transition-colors">
        <span className="w-6 h-6 rounded-lg bg-[#2EA8A4]/20 border border-[#2EA8A4]/40 text-[#2EA8A4] font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
          {num}
        </span>
        <div className="flex-grow text-xs sm:text-sm text-gray-900 leading-relaxed pt-0.5">
          {children}
        </div>
      </li>
    );
  }
  return (
    <li className="flex items-start gap-2.5 text-gray-900">
      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#2EA8A4] shrink-0 flex-none" />
      <span className="text-xs sm:text-sm leading-relaxed flex-grow">{children}</span>
    </li>
  );
};

/* ─── Table ──────────────────────────────────────────────────────────────── */
const Table = ({ children }) => (
  <div className="my-5 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
    <div className="overflow-x-auto" data-lenis-prevent>
      <table className="w-full text-xs sm:text-sm border-collapse min-w-[400px]">
        {children}
      </table>
    </div>
  </div>
);

const Thead = ({ children }) => (
  <thead className="bg-[#1A2F35] border-b-2 border-[#2EA8A4]/50">
    {children}
  </thead>
);

const Tbody = ({ children }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

const Tr = ({ children }) => (
  <tr className="hover:bg-[#2EA8A4]/5 transition-colors even:bg-white/60">
    {children}
  </tr>
);

const Th = ({ children }) => (
  <th className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-wider text-[#2EA8A4] whitespace-nowrap border-r border-gray-200/40 last:border-r-0">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-4 py-3 text-gray-900 font-medium leading-snug border-r border-gray-200/30 last:border-r-0">
    {children}
  </td>
);

/* ─── Component map ──────────────────────────────────────────────────────── */
const components = {
  h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6,
  p: Paragraph,
  strong: Strong,
  em: Em,
  a: Link,
  blockquote: Blockquote,
  hr: Hr,
  ul: Ul,
  ol: Ol,
  li: Li,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  // code handles both inline and block depending on parent node
  code({ node, className, children, ...props }) {
    const isBlock = node?.parent?.tagName === 'pre';
    if (isBlock) return <CodeBlock className={className}>{children}</CodeBlock>;
    return <InlineCode>{children}</InlineCode>;
  },
  // Suppress the wrapping <pre> so CodeBlock renders its own
  pre({ children }) {
    return <>{children}</>;
  },
};

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function ResponseRenderer({ text }) {
  if (!text) return null;

  // ── Clean n8n artifacts before passing to react-markdown ──────────────────
  // The n8n AI can leak internal node/panel references (e.g. ###PANEL-1-2-1,
  // **PANEL-1-2-1) when expression resolution fails or a branch isn't reached.
  // We strip those lines entirely so the valid markdown content renders cleanly.
  const normalised = text
    .split('\n')
    .filter(line => {
      const t = line.trim();
      
      // Strip leading markdown chars (bullets, numbers, headers, bold, italics, literal bullets) and trailing bold
      const stripped = t.replace(/^[#*\-.\s\d>•◦▪]+/, '').replace(/[*]+$/, '').trim();
      
      // If the remaining core text is just a PANEL reference, drop the line entirely
      if (/^PANEL\s*[-_]\s*[\d\-]+$/i.test(stripped)) {
        return false;
      }
      
      // Drop bare unresolved n8n expression placeholders {{ … }}
      if (/^\{\{.*\}\}\s*$/.test(t)) return false;
      
      return true;
    })
    .map(line => {
      const t = line.trim();
      // Normalise horizontal rules (---, ===, ***) to a single proper ---
      if (/^-{3,}$/.test(t) || /^={3,}$/.test(t) || /^\*{3,}$/.test(t)) return '---';
      // Remove inline PANEL references that sneak into otherwise valid lines
      return line.replace(/PANEL\s*[-_]\s*[\d\-]+/gi, '').replace(/\s{2,}/g, ' ');
    })
    .join('\n');

  return (
    <div className="bizra-markdown space-y-0.5 font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        skipHtml={false}
      >
        {normalised}
      </ReactMarkdown>
    </div>
  );
}

/* ─── Inline-only convenience export (kept for back-compat) ─────────────── */
export function renderFormattedInline(text) {
  if (!text) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <>{children}</>,
        strong: Strong,
        em: Em,
        a: Link,
        code: ({ node, children }) => {
          const isBlock = node?.parent?.tagName === 'pre';
          return isBlock ? <code>{children}</code> : <InlineCode>{children}</InlineCode>;
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
