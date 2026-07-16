"use client";

import { useState } from 'react';

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
      className="fixed bottom-6 right-6 z-50 bg-paper border border-ink text-ink hover:bg-ink hover:text-paper px-4 py-2 transition-colors text-[0.8rem] cursor-pointer"
      title="Copy the whole documentation as markdown for AI context"
    >
      {copied ? '✓ copied' : 'copy as markdown'}
    </button>
  );
}
