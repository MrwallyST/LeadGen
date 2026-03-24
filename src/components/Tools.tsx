import React, { useState } from 'react';
import { AppState } from '../types';
import { Search, ExternalLink, Video, Copy, CheckCircle2, Calculator, DollarSign, TrendingUp } from 'lucide-react';

interface ToolsProps {
  state: AppState;
}

const NICHE_OPTIONS = [
  { value: 'plumber', label: 'Plumber' },
  { value: 'roofer', label: 'Roofer' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'HVAC', label: 'HVAC' },
  { value: 'dentist', label: 'Dentist' },
  { value: 'landscaper', label: 'Landscaper' },
  { value: 'lawyer', label: 'Lawyer' },
  { value: 'electrician', label: 'Electrician' }
];

export function Tools({ state }: ToolsProps) {
  const [city, setCity] = useState('');
  const [niche, setNiche] = useState('plumber');
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [copied, setCopied] = useState(false);

  // ROI Calculator State
  const [avgDealValue, setAvgDealValue] = useState<number>(3000);
  const [currentLeads, setCurrentLeads] = useState<number>(50);
  const [currentCloseRate, setCurrentCloseRate] = useState<number>(20);

  const selectedLead = state.leads.find(l => l.id === selectedLeadId);

  const generateSearchUrl = () => {
    if (!city) return '#';
    const query = encodeURIComponent(`${niche} in ${city}`);
    return `https://www.google.com/maps/search/${query}`;
  };

  const generateScript = () => {
    if (!selectedLead) return '';
    return `Hey ${selectedLead.businessName} team,

I was doing some research on ${selectedLead.niche}s in the area and noticed your website. 

I actually just built a system for another home service business that automatically replies to new contact form leads in under 5 seconds and books them directly onto your calendar. 

I noticed a small gap in how your current form is set up where you might be losing leads to competitors who reply faster. 

I made a quick 2-minute video showing exactly how to fix it and how the automated system works. 

Mind if I send the video over?

Best,
[Your Name]`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ROI Math
  const currentRevenue = currentLeads * (currentCloseRate / 100) * avgDealValue;
  
  // AI Impact Assumptions:
  // 1. 20% more leads captured (missed calls, after hours, instant webchat)
  // 2. 10% absolute increase in close rate (speed to lead)
  const newLeads = Math.round(currentLeads * 1.2);
  const newCloseRate = currentCloseRate + 10;
  const newRevenue = newLeads * (newCloseRate / 100) * avgDealValue;
  
  const monthlyRevenueIncrease = newRevenue - currentRevenue;
  const suggestedSetupFee = Math.min(Math.max(Math.round(monthlyRevenueIncrease * 0.1 / 100) * 100, 1500), 5000); // 10% of monthly lift, min 1.5k, max 5k
  const suggestedRetainer = Math.min(Math.max(Math.round(monthlyRevenueIncrease * 0.05 / 100) * 100, 500), 2000); // 5% of monthly lift, min 500, max 2k

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Tools & Scripts</h2>
        <p className="text-zinc-500 mt-2">Find leads, generate scripts, and calculate ROI to close deals.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Finder */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Lead Finder</h3>
          </div>
          
          <p className="text-zinc-600 mb-6 text-sm">
            Generate targeted Google Maps searches to find local businesses. Fill out their contact forms and add them to your CRM.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Target City</label>
              <input 
                type="text" 
                placeholder="e.g. Austin, TX" 
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Niche</label>
              <select 
                className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={niche}
                onChange={e => setNiche(e.target.value)}
              >
                {NICHE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <a 
              href={generateSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                city ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
              onClick={e => !city && e.preventDefault()}
            >
              <span>Search Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Loom Script Generator */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 flex flex-col">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Loom Script Generator</h3>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 mb-1">Select Lead from CRM</label>
            <select 
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={selectedLeadId}
              onChange={e => setSelectedLeadId(e.target.value)}
            >
              <option value="">-- Select a lead --</option>
              {state.leads.map(lead => (
                <option key={lead.id} value={lead.id}>{lead.businessName} ({lead.niche})</option>
              ))}
            </select>
          </div>

          <div className="flex-1 bg-zinc-50 rounded-xl border border-zinc-200 p-4 relative group">
            {selectedLead ? (
              <>
                <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-700">
                  {generateScript()}
                </pre>
                <button 
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 bg-white border border-zinc-200 rounded-lg shadow-sm text-zinc-500 hover:text-zinc-900 transition-colors opacity-0 group-hover:opacity-100"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-zinc-400 text-center">
                Select a lead above to generate<br/>a personalized outreach script.
              </div>
            )}
          </div>
        </div>

        {/* ROI & Pricing Calculator */}
        <div className="bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 p-6 lg:col-span-2 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">The "No-Brainer" ROI Calculator</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-8 max-w-2xl">
              Use this live on sales calls. Input their current metrics, show them how much money they are losing by missing calls/leads, and let the math justify your pricing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Inputs */}
              <div className="space-y-5">
                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2">Client Metrics</h4>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Average Deal Value ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-zinc-500" />
                    </div>
                    <input 
                      type="number" 
                      className="w-full pl-9 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={avgDealValue}
                      onChange={e => setAvgDealValue(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Current Leads per Month</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={currentLeads}
                    onChange={e => setCurrentLeads(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Current Close Rate (%)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={currentCloseRate}
                    onChange={e => setCurrentCloseRate(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* AI Impact */}
              <div className="space-y-5">
                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2">With AI Automation</h4>
                <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-zinc-400">New Leads Caught</span>
                    <span className="text-emerald-400 font-bold">+{Math.round(currentLeads * 0.2)}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500">Assumes 20% lift from 24/7 webchat & missed call text-back.</p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-zinc-400">New Close Rate</span>
                    <span className="text-emerald-400 font-bold">{newCloseRate}%</span>
                  </div>
                  <p className="text-[10px] text-zinc-500">Assumes 10% lift from instant speed-to-lead follow up.</p>
                </div>
                <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-emerald-100">Projected Monthly Lift</span>
                    <span className="text-emerald-400 font-black text-xl">+${monthlyRevenueIncrease.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Pricing Suggestion */}
              <div className="space-y-5">
                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2">What To Charge</h4>
                <div className="bg-zinc-800 p-5 rounded-xl border border-zinc-700 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-12 h-12 text-emerald-500" />
                  </div>
                  <p className="text-xs text-zinc-400 mb-1">Suggested Setup Fee</p>
                  <p className="text-3xl font-black text-white">${suggestedSetupFee.toLocaleString()}</p>
                  <p className="text-[10px] text-zinc-500 mt-2">Priced at ~10% of the first month's projected revenue lift.</p>
                </div>
                
                <div className="bg-zinc-800 p-5 rounded-xl border border-zinc-700 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                  <p className="text-xs text-zinc-400 mb-1">Suggested Monthly Retainer</p>
                  <p className="text-3xl font-black text-white">${suggestedRetainer.toLocaleString()}<span className="text-sm font-normal text-zinc-500">/mo</span></p>
                  <p className="text-[10px] text-zinc-500 mt-2">Priced at ~5% of ongoing monthly revenue lift.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
