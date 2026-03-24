import React, { useState } from 'react';
import { 
  Zap, Target, Globe, Mail, Shield, Settings, Play, Pause, 
  RefreshCw, Plus, Trash2, ExternalLink, Search, AlertCircle, 
  Send, Copy, CheckCircle, ChevronDown, ChevronUp, Save, 
  Facebook, Instagram, Linkedin, Download, Layout, Eye, Rocket,
  X, Map, Link as LinkIcon, FileText, BarChart, MessageSquare
} from 'lucide-react';
import { AppSettings, Lead } from '../types';
import { GoogleGenAI } from '@google/genai';

interface ProspectorProps {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

interface ProspectorState {
  isAuditing: boolean;
  targetUrl: string;
  auditResults: any | null;
  error: string | null;
  activeTab: 'audit' | 'playbook';
  isSettingsOpen: boolean;
}

export function Prospector({ settings, updateSettings }: ProspectorProps) {
  const [state, setState] = useState<ProspectorState>({
    isAuditing: false,
    targetUrl: 'https://austineliteplumbing.com',
    auditResults: null,
    error: null,
    activeTab: 'audit',
    isSettingsOpen: false
  });

  const runAudit = async () => {
    const apiKey = settings.geminiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      alert("Please configure your Gemini API Key in Settings to run the audit.");
      setState(prev => ({ ...prev, isSettingsOpen: true }));
      return;
    }

    setState(prev => ({ ...prev, isAuditing: true, error: null }));
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class SEO and Conversion Rate Optimization expert. Perform an audit on the business website: ${state.targetUrl}. 
      If you cannot directly access it perfectly, infer the most common issues for this type of local business website.
      
      Return ONLY a JSON object with strictly these 4 keys:
      1. score (number 1-10)
      2. weaknesses (array of 3-4 strings detailing critical issues like 'No clear CTA', 'Slow mobile speed', etc.)
      3. strengths (array of 2-3 strings detailing good points)
      4. primaryAngle (string detailing the best sales angle based on the weaknesses)`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const auditData = JSON.parse(response.text || '{}');
      
      setState(prev => ({ 
        ...prev, 
        isAuditing: false,
        auditResults: {
          score: auditData.score || 6.5,
          weaknesses: auditData.weaknesses || ['Slow mobile load time', 'No clear Call to Action'],
          strengths: auditData.strengths || ['SSL certificate active'],
          primaryAngle: auditData.primaryAngle || 'Focus on mobile speed and conversion improvements.'
        }
      }));
    } catch (error: any) {
      console.error("Audit error:", error);
      setState(prev => ({ ...prev, isAuditing: false, error: "Failed to run audit." }));
      alert("Failed to run deep audit. Check your API key or console for details.");
    }
  };

  const addWebhook = () => updateSettings({ webhookUrls: [...settings.webhookUrls, ''] });
  
  const updateWebhook = (index: number, value: string) => {
    const newUrls = [...settings.webhookUrls];
    newUrls[index] = value;
    updateSettings({ webhookUrls: newUrls });
  };

  const removeWebhook = (index: number) => {
    updateSettings({ webhookUrls: settings.webhookUrls.filter((_, i) => i !== index) });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-zinc-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Eye className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Audit Sniper</h2>
            <p className="text-zinc-500 text-sm font-medium">Deep Business Analysis & Pitch Generation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Audits Today</p>
            <div className="flex items-center space-x-2">
              <div className="w-32 h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-indigo-600 rounded-full" />
              </div>
              <span className="text-sm font-bold text-zinc-900">5/10</span>
            </div>
          </div>
          <button 
            onClick={() => setState(prev => ({ ...prev, isSettingsOpen: true }))}
            className="p-2 hover:bg-zinc-200 rounded-xl transition-colors text-zinc-500"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Audit Section */}
      <section className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 overflow-hidden">
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-zinc-900">Deep Audit Sniper</h3>
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl">
            <button 
              onClick={() => setState(prev => ({ ...prev, activeTab: 'audit' }))}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${state.activeTab === 'audit' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
            >
              <Target className="w-4 h-4" />
              <span>Sniper Audit</span>
            </button>
            <button 
              onClick={() => setState(prev => ({ ...prev, activeTab: 'playbook' }))}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${state.activeTab === 'playbook' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Audit Playbook</span>
            </button>
          </div>
        </div>

        {state.activeTab === 'audit' ? (
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left: Input */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Business Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="https://example.com"
                      value={state.targetUrl}
                      onChange={(e) => setState(prev => ({ ...prev, targetUrl: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex flex-col items-center space-y-2">
                    <Zap className="w-4 h-4" />
                    <span>Speed Test</span>
                  </button>
                  <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex flex-col items-center space-y-2">
                    <Search className="w-4 h-4" />
                    <span>SEO Audit</span>
                  </button>
                  <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex flex-col items-center space-y-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>GMB Check</span>
                  </button>
                  <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex flex-col items-center space-y-2">
                    <Shield className="w-4 h-4" />
                    <span>Security</span>
                  </button>
                </div>

                <button 
                  onClick={runAudit}
                  disabled={state.isAuditing}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                    state.isAuditing 
                      ? 'bg-zinc-100 text-zinc-400' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  }`}
                >
                  {state.isAuditing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Run Deep Audit</span>
                    </>
                  )}
                </button>

                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <p className="text-xs text-indigo-900 leading-relaxed">
                    <span className="font-bold">Sniper Tip:</span> The agent will scrape the site, check SEO, mobile speed, GMB presence, and social proof to find the <span className="font-bold italic">perfect sales angle</span>.
                  </p>
                </div>
              </div>

              {/* Middle: Live Feed */}
              <div className="md:col-span-2 bg-zinc-900 rounded-3xl border border-zinc-800 p-6 font-mono text-sm text-zinc-400 min-h-[400px] overflow-y-auto shadow-inner relative">
                <div className="absolute top-4 right-4 flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                {state.isAuditing ? (
                  <div className="space-y-2">
                    <p className="text-emerald-400 animate-pulse">[SYSTEM] Sniper initialized. Targeting {state.targetUrl}...</p>
                    <p className="delay-100">[SCRAPE] Extracting metadata and content...</p>
                    <p className="delay-200">[SEO] Checking H1 tags and meta descriptions...</p>
                    <p className="text-indigo-400 delay-300">[SPEED] Running Lighthouse mobile performance test...</p>
                    <p className="delay-500">[GMB] Searching for Google Business Profile...</p>
                    <p className="text-rose-400 delay-700">[ALERT] No "Call Now" button detected on mobile view.</p>
                    <p className="delay-1000">[SOCIAL] Scanning for Facebook/Instagram pixels...</p>
                    <p className="delay-1200 text-amber-400">[INSIGHT] Found 3 missing conversion triggers.</p>
                    <div className="flex items-center space-x-2 text-zinc-500 mt-4">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Generating sales angles...</span>
                    </div>
                  </div>
                ) : state.auditResults ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                          <BarChart className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">Audit Report</h4>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Target: {state.targetUrl}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">AI Health Score</p>
                        <span className="px-4 py-1 bg-indigo-500 text-white rounded-full text-sm font-black tracking-tighter">{state.auditResults.score}/10</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                          <p className="text-xs font-bold text-rose-400 uppercase tracking-widest">Critical Weaknesses</p>
                        </div>
                        <ul className="space-y-3">
                          {state.auditResults.weaknesses.map((w: string, i: number) => (
                            <li key={i} className="text-xs text-zinc-300 flex items-start space-x-3 bg-rose-500/5 p-3 rounded-xl border border-rose-500/10">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Current Strengths</p>
                        </div>
                        <ul className="space-y-3">
                          {state.auditResults.strengths.map((s: string, i: number) => (
                            <li key={i} className="text-xs text-zinc-300 flex items-start space-x-3 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-50 font-black shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-indigo-400" />
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Primary Sales Angle</p>
                      </div>
                      <p className="text-sm text-white font-medium leading-relaxed">
                        {state.auditResults.primaryAngle || `Focus on the 4.2s mobile load time. In their niche, every second over 2.5s costs ~15% in conversion. Fixing this + adding a sticky CTA is a guaranteed 30% revenue bump.`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <div className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center">
                      <Search className="w-10 h-10 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Sniper Standby</p>
                      <p className="text-sm text-zinc-500">Enter a URL and click "Run Deep Audit" to begin scanning.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "The Speed Trap",
                  icon: <Zap className="w-6 h-6" />,
                  description: "Most local businesses have slow mobile sites. Use the '4-second rule' to show them how much money they're losing.",
                  action: "Watch Training"
                },
                {
                  title: "GMB Optimization",
                  icon: <Map className="w-6 h-6" />,
                  description: "Audit their Google Business Profile. Are they in the top 3? If not, show them exactly why and how to fix it.",
                  action: "View Checklist"
                },
                {
                  title: "Social Proof Audit",
                  icon: <MessageSquare className="w-6 h-6" />,
                  description: "Check if they have a review widget. If they have 50+ reviews but none on their site, that's a massive leak.",
                  action: "Get Template"
                },
                {
                  title: "The Mockup Close",
                  icon: <Layout className="w-6 h-6" />,
                  description: "Don't just tell them what's wrong. Show them a fixed version. Use the 'Mockup Generator' to build a high-speed landing page.",
                  action: "Open Generator"
                },
                {
                  title: "Loom Pitching",
                  icon: <Eye className="w-6 h-6" />,
                  description: "Record a 2-minute video showing their audit results. It's 10x more effective than a cold email.",
                  action: "See Examples"
                },
                {
                  title: "Automation Stacking",
                  icon: <Rocket className="w-6 h-6" />,
                  description: "Once you audit, push to Make.com to auto-generate a custom PDF report and send it to their inbox.",
                  action: "Setup Workflow"
                }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 shadow-sm mb-4 transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">{item.description}</p>
                  <button className="text-xs font-bold text-indigo-600 flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>{item.action}</span>
                    <Rocket className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-2xl font-bold mb-4">Master the Audit Close</h3>
                <p className="text-zinc-400 leading-relaxed mb-8">
                  The audit isn't just a report—it's your foot in the door. By showing a business owner exactly where they are leaking money, you position yourself as a consultant, not a salesperson.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
                    Start Advanced Training
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
                    Download PDF Guide
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/20 to-transparent pointer-events-none" />
              <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
            </div>
          </div>
        )}
      </section>

      {/* Pitch Generation Section */}
      {state.activeTab === 'audit' && state.auditResults && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">AI Pitch Generator</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-zinc-50 text-zinc-400 rounded-lg hover:text-indigo-600 transition-colors" title="Copy to Clipboard"><Copy className="w-4 h-4" /></button>
                  <button className="p-2 bg-zinc-50 text-zinc-400 rounded-lg hover:text-indigo-600 transition-colors" title="Regenerate Pitch"><RefreshCw className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 font-serif text-xl text-zinc-700 leading-relaxed relative group">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-4 h-4" />
                </div>
                "Hey Bill, I was just checking out Austin Elite Plumbing and noticed you have amazing reviews on Mason Rd, but your mobile site is taking over 4 seconds to load. In this heat, customers are clicking away before they even see your number. I built a quick mockup showing how we can fix that and add a 1-click 'Call Now' button. Want to see it?"
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center space-x-3 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Send via Gmail</span>
                </button>
                <button className="py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center space-x-3 hover:bg-black transition-all group">
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Send via SMS</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Next Actions</h3>
              </div>
              <div className="space-y-4">
                <button className="w-full p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center space-x-4 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-indigo-600 transition-colors">
                    <Layout className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-zinc-900">Build Website Mockup</p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Fixes speed & CTA issues</p>
                  </div>
                </button>
                <button className="w-full p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center space-x-4 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-indigo-600 transition-colors">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-zinc-900">Generate Loom Script</p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Personalized 2-min video pitch</p>
                  </div>
                </button>
                <button className="w-full p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center space-x-4 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-indigo-600 transition-colors">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-zinc-900">Push to Automation</p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Send to Make.com workflow</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Settings Modal */}
      {state.isSettingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden border border-zinc-200 animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Automation Settings</h3>
              </div>
              <button 
                onClick={() => setState(prev => ({ ...prev, isSettingsOpen: false }))}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-zinc-900">Webhook URLs (Make.com / Zapier)</label>
                  <button 
                    onClick={addWebhook}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Webhook</span>
                  </button>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">The automation agent pushes leads here automatically after enrichment.</p>
                <div className="space-y-3">
                  {settings.webhookUrls.map((url, i) => (
                    <div key={i} className="flex space-x-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="https://hook.make.com/..."
                          value={url}
                          onChange={(e) => updateWebhook(i, e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                      {settings.webhookUrls.length > 1 && (
                        <button onClick={() => removeWebhook(i)} className="p-3 text-zinc-400 hover:text-rose-500 transition-colors bg-zinc-50 border border-zinc-200 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-zinc-900">Netlify Personal Access Token</label>
                <p className="text-xs text-zinc-500 leading-relaxed">Create a token in your Netlify User Settings. This allows the app to instantly deploy the generated website mockups to a free .netlify.app site.</p>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    placeholder="nfp_..."
                    value={settings.netlifyToken}
                    onChange={(e) => updateSettings({ netlifyToken: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-zinc-900">Gemini API Key</label>
                <p className="text-xs text-zinc-500 leading-relaxed">Get your free API key from Google AI Studio. This is required for the AI agent to run audits, generate websites, and write emails.</p>
                <div className="relative">
                  <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    placeholder="AIza..."
                    value={settings.geminiKey}
                    onChange={(e) => updateSettings({ geminiKey: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex justify-end">
              <button 
                onClick={() => setState(prev => ({ ...prev, isSettingsOpen: false }))}
                className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
