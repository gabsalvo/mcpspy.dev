"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyAsMarkdownButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const response = await fetch('/llms.txt');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy markdown', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-slate-800 text-white rounded-full px-4 py-3 shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 font-medium text-sm group"
      title="Copy whole documentation as Markdown for AI Context"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-400" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Copy as Markdown</span>
        </>
      )}
    </button>
  );
}