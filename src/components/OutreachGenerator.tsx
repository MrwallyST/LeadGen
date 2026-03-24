import React, { useState } from 'react';
import { Copy, Wand2, Check } from 'lucide-react';

export function OutreachGenerator() {
  const [businessName, setBusinessName] = useState('');
  const [niche, setNiche] = useState('');
  const [problem, setProblem] = useState('');
  const [myName, setMyName] = useState('');
  const [copied, setCopied] = useState(false);

  const generateEmail = () => {
    return `Subject: built you a new website (it's free)

Hey ${businessName || '[Name]'},

I'm ${myName || '[Your Name]'}, based in [City]. I came across your business and noticed that ${problem || 'your website could be doing more for you'}.

So I went ahead and built you a new, modern version of your site. Here it is: [Link]

It's yours — completely free. I'm building my portfolio in the ${niche || 'local service'} industry and your business stood out.

If you want me to fine-tune anything, just ping back with changes and I'll sort it. Or happy to jump on a 10-min call to dial it in for you.

Best,
${myName || '[Your Name]'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmail());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
          <Wand2 className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900">Outreach Email Generator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Business Name</label>
          <input 
            type="text" 
            placeholder="e.g. Bob's Plumbing"
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Your Name</label>
          <input 
            type="text" 
            placeholder="e.g. John Doe"
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Niche</label>
          <input 
            type="text" 
            placeholder="e.g. Plumbing"
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Problem Spotted</label>
          <input 
            type="text" 
            placeholder="e.g. your site isn't mobile-friendly"
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>
      </div>

      <div className="relative">
        <div className="bg-zinc-900 rounded-2xl p-6 text-zinc-300 font-mono text-sm whitespace-pre-wrap min-h-[200px]">
          {generateEmail()}
        </div>
        <button 
          onClick={handleCopy}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span className="text-xs font-bold">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
