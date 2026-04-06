import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../App';

function highlightCpp(code) {
  const keywords = ['include', 'using', 'namespace', 'std', 'int', 'string', 'auto', 'for', 'while', 'if', 'else', 'return', 'cout', 'cin', 'endl', 'vector', 'stack', 'queue', 'set', 'map', 'pair', 'priority_queue', 'unordered_map', 'unordered_set', 'sort', 'reverse', 'find', 'count', 'push_back', 'pop_back', 'push', 'pop', 'top', 'front', 'back', 'begin', 'end', 'size', 'empty', 'insert', 'erase', 'main', 'true', 'false', 'nullptr', 'const', 'char', 'bool', 'void'];

  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Strings
    .replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
    // Comments
    .replace(/(\/\/[^\n]*)/g, '<span class="text-slate-500 italic">$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>')
    // Preprocessor
    .replace(/(#\w+)/g, '<span class="text-purple-400">$1</span>')
    // Keywords
    .replace(new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), '<span class="text-brand-400 font-semibold">$1</span>');
}

export default function CodeBlock({ code, language = 'cpp', title }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-1">{title || 'example.cpp'}</span>
        </div>
        <button onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10">
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <div className="bg-slate-950 dark:bg-black p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          <code dangerouslySetInnerHTML={{ __html: highlightCpp(code) }} />
        </pre>
      </div>
    </div>
  );
}
