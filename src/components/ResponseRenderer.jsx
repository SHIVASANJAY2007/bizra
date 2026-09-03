import React, { useState } from 'react';
import {
  Check, Copy, ExternalLink, ChevronRight, Lightbulb,
  AlertTriangle, Info, Sparkles
} from 'lucide-react';

/**
 * Formats inline text converting **bold**, *italic*, ***bold-italic***, `code`, and [links](url)
 * into styled React components without raw syntax marks.
 */
export function renderFormattedInline(text) {
  if (!text) return null;

  const regex = /(\[.*?\]\(https?:\/\/[^\s)]+\)|`[^`]+`|\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|_.*?_)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Link: [Text](url)
    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
      if (match) {
        return (
          <a
            key={idx}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-500 dark:text-[#efe7d5] hover:text-emerald-600 dark:hover:text-white font-semibold underline underline-offset-2 transition-colors mx-0.5"
          >
            <span>{match[1]}</span>
            <ExternalLink size={12} />
          </a>
        );
      }
    }

    // Inline Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="bg-emerald-500/10 dark:bg-[#efe7d5]/15 text-emerald-600 dark:text-[#efe7d5] font-mono text-[11px] px-1.5 py-0.5 rounded border border-emerald-500/30 dark:border-[#efe7d5]/30 mx-0.5 shadow-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold-Italic: ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
      return (
        <strong key={idx} className="font-extrabold italic text-inherit tracking-wide">
          {part.slice(3, -3)}
        </strong>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-extrabold text-inherit">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text* or _text_
    if ((part.startsWith('*') && part.endsWith('*') && part.length > 2) ||
        (part.startsWith('_') && part.endsWith('_') && part.length > 2)) {
      return (
        <em key={idx} className="italic opacity-90">
          {part.slice(1, -1)}
        </em>
      );
    }

    return <span key={idx}>{part}</span>;
  });
}

/**
 * Code Block Renderer with Copy functionality
 */
function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl bg-[#070b12] border border-[#efe7d5]/20 overflow-hidden shadow-lg text-gray-100">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#efe7d5]/5 border-b border-[#efe7d5]/15 text-[11px] font-mono text-gray-400">
        <span className="uppercase font-semibold text-[#efe7d5]">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[#efe7d5]"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-[#efe7d5] overflow-x-auto whitespace-pre leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/**
 * Main ResponseRenderer component that transforms n8n chatbot output into structured React components.
 */
export default function ResponseRenderer({ text }) {
  if (!text) return null;

  const lines = text.split('\n');
  const blocks = [];

  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent = [];
  let kvGroup = [];

  const flushKvGroup = () => {
    if (kvGroup.length > 0) {
      blocks.push({
        type: 'kv-group',
        items: [...kvGroup]
      });
      kvGroup = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code block start/end
    if (trimmed.startsWith('```')) {
      flushKvGroup();
      if (inCodeBlock) {
        blocks.push({
          type: 'code',
          language: codeBlockLang,
          code: codeBlockContent.join('\n')
        });
        inCodeBlock = false;
        codeBlockContent = [];
        codeBlockLang = '';
      } else {
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(rawLine);
      continue;
    }

    // Empty lines
    if (!trimmed) {
      flushKvGroup();
      blocks.push({ type: 'empty' });
      continue;
    }

    // Headings: #, ##, ###
    if (trimmed.startsWith('#')) {
      flushKvGroup();
      let level = 1;
      if (trimmed.startsWith('###')) level = 3;
      else if (trimmed.startsWith('##')) level = 2;

      const titleText = trimmed.replace(/^#+\s*/, '');
      blocks.push({
        type: 'heading',
        level,
        text: titleText
      });
      continue;
    }

    // Callouts / Tips / Warnings (lines with 💡, ⚠️, 📌, >, ℹ️)
    if (
      trimmed.startsWith('💡') ||
      trimmed.startsWith('⚠️') ||
      trimmed.startsWith('📌') ||
      trimmed.startsWith('ℹ️') ||
      trimmed.startsWith('>')
    ) {
      flushKvGroup();
      let style = 'info';
      if (trimmed.startsWith('💡')) style = 'tip';
      else if (trimmed.startsWith('⚠️')) style = 'warning';
      else if (trimmed.startsWith('📌')) style = 'accent';

      const content = trimmed.replace(/^(💡|⚠️|📌|ℹ️|>)\s*/, '');
      blocks.push({
        type: 'callout',
        style,
        text: content
      });
      continue;
    }

    // Check for Bullet points / Lists (•, -, *, +)
    const bulletMatch = trimmed.match(/^(?:[•\-*+])\s+(.*)$/);
    if (bulletMatch) {
      const itemContent = bulletMatch[1];

      // Check if this bullet item is a Key-Value pair like **Key:** Value or Key: Value
      const kvMatch = itemContent.match(/^(?:\*\*(.*?)\*\*|\*(.*?)\*|(.*?)):\s*(.*)$/);
      if (kvMatch) {
        const keyName = (kvMatch[1] || kvMatch[2] || kvMatch[3]).trim();
        const valueName = kvMatch[4].trim();
        kvGroup.push({ key: keyName, value: valueName });
        continue;
      } else {
        flushKvGroup();
        blocks.push({
          type: 'bullet',
          text: itemContent
        });
        continue;
      }
    } else {
      flushKvGroup();
    }

    // Numbered lists (1., 2., etc.)
    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numberMatch) {
      blocks.push({
        type: 'numbered',
        number: numberMatch[1],
        text: numberMatch[2]
      });
      continue;
    }

    // Standalone lines with bold headers e.g. 📊 **Title**
    if (trimmed.match(/^(?:[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}])\s+\*\*(.*?)\*\*$/u) || trimmed.match(/^\*\*(.*?)\*\*$/)) {
      blocks.push({
        type: 'title-badge',
        text: trimmed
      });
      continue;
    }

    // Normal paragraph
    blocks.push({
      type: 'paragraph',
      text: trimmed
    });
  }

  flushKvGroup();

  return (
    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed font-sans">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'title-badge':
            return (
              <div
                key={index}
                className="my-2 p-3 rounded-xl bg-gradient-to-r from-[#efe7d5]/20 via-[#efe7d5]/8 to-transparent border border-[#efe7d5]/35 font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm text-slate-900 dark:text-[#efe7d5]"
              >
                <Sparkles size={16} className="text-emerald-500 dark:text-[#efe7d5] shrink-0" />
                <span>{renderFormattedInline(block.text)}</span>
              </div>
            );

          case 'heading':
            if (block.level === 1) {
              return (
                <div key={index} className="pt-2 pb-1 border-b border-emerald-500/20 dark:border-[#efe7d5]/25 my-2">
                  <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-[#efe7d5]">
                    <span className="w-2 h-4 rounded-full bg-emerald-500 dark:bg-[#efe7d5] inline-block" />
                    {renderFormattedInline(block.text)}
                  </h2>
                </div>
              );
            }
            if (block.level === 2) {
              return (
                <h3 key={index} className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-[#efe7d5] mt-3 mb-1 flex items-center gap-1.5">
                  <ChevronRight size={15} className="text-emerald-600 dark:text-[#efe7d5]" />
                  {renderFormattedInline(block.text)}
                </h3>
              );
            }
            return (
              <h4 key={index} className="text-xs sm:text-sm font-bold mt-2 mb-1 text-slate-900 dark:text-[#efe7d5]">
                {renderFormattedInline(block.text)}
              </h4>
            );

          case 'kv-group':
            return (
              <div key={index} className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {block.items.map((item, kIdx) => (
                  <div
                    key={kIdx}
                    className="p-3 rounded-xl bg-emerald-500/[0.04] dark:bg-[#efe7d5]/[0.08] border border-slate-200 dark:border-[#efe7d5]/25 hover:border-emerald-500/40 dark:hover:border-[#efe7d5]/50 transition-colors flex flex-col justify-between shadow-sm group"
                  >
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 dark:text-[#efe7d5] mb-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#efe7d5]" />
                      {item.key}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#efe7d5] group-hover:text-emerald-600 dark:group-hover:text-white transition-colors">
                      {renderFormattedInline(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            );

          case 'bullet':
            return (
              <div key={index} className="flex items-start gap-2.5 my-1 pl-1">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#efe7d5] shrink-0 shadow-[0_0_8px_rgba(239,231,213,0.6)]" />
                <div className="flex-grow">{renderFormattedInline(block.text)}</div>
              </div>
            );

          case 'numbered':
            return (
              <div key={index} className="flex items-start gap-3 my-2 p-2.5 rounded-xl bg-slate-100/70 dark:bg-[#efe7d5]/[0.05] border border-slate-200 dark:border-[#efe7d5]/20">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 dark:bg-[#efe7d5]/20 border border-emerald-500/40 dark:border-[#efe7d5]/40 text-emerald-600 dark:text-[#efe7d5] font-extrabold text-xs flex items-center justify-center shrink-0">
                  {block.number}
                </span>
                <div className="flex-grow pt-0.5 text-xs sm:text-sm">
                  {renderFormattedInline(block.text)}
                </div>
              </div>
            );

          case 'callout':
            return (
              <div
                key={index}
                className={`my-3 p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 shadow-md ${
                  block.style === 'tip'
                    ? 'bg-amber-500/10 dark:bg-[#efe7d5]/15 border-amber-500/30 dark:border-[#efe7d5]/35 text-amber-900 dark:text-[#efe7d5]'
                    : block.style === 'warning'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-100'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {block.style === 'tip' ? (
                    <Lightbulb size={18} className="text-amber-500 dark:text-[#efe7d5]" />
                  ) : block.style === 'warning' ? (
                    <AlertTriangle size={18} className="text-rose-500" />
                  ) : (
                    <Info size={18} className="text-emerald-500 dark:text-[#efe7d5]" />
                  )}
                </div>
                <div className="flex-grow text-xs sm:text-sm leading-relaxed font-medium">
                  {renderFormattedInline(block.text)}
                </div>
              </div>
            );

          case 'code':
            return <CodeBlock key={index} language={block.language} code={block.code} />;

          case 'empty':
            return <div key={index} className="h-1" />;

          case 'paragraph':
          default:
            return (
              <p key={index} className="leading-relaxed">
                {renderFormattedInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
