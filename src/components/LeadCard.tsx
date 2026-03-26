import React from 'react';
import {
  Zap, Target, Globe, Mail, Shield, Settings, Play, Pause,
  RefreshCw, Plus, Trash2, ExternalLink, Search, AlertCircle,
  Send, Copy, CheckCircle, ChevronDown, ChevronUp, Save,
  Facebook, Instagram, Linkedin, Download, Layout, Eye, Rocket,
  X, Map, Link as LinkIcon
} from 'lucide-react';
import { Lead, LeadStatus } from '../types';

const statusColors: Record<LeadStatus, string> = {
  'New': 'bg-zinc-100 text-zinc-700',
  'Contacted': 'bg-blue-100 text-blue-700',
  'Meeting Booked': 'bg-purple-100 text-purple-700',
  'Proposal Sent': 'bg-amber-100 text-amber-700',
  'Closed Won': 'bg-emerald-100 text-emerald-700',
  'Closed Lost': 'bg-rose-100 text-rose-700'
};

export function LeadCard({
  lead,
  isExpanded,
  onToggle,
  onSave,
  onSendToAutomation,
  onDraftEmail,
  onBuildMockup,
  onFindDecisionMaker,
  onAutoPilot,
  onGenerateSniperInsights,
  isCrmView,
  onDelete,
  updateLead
}: {
  lead: Lead,
  isExpanded: boolean,
  onToggle: () => void,
  onSave: () => void,
  onSendToAutomation: () => void,
  onDraftEmail: () => void,
  onBuildMockup: () => void,
  onFindDecisionMaker: () => void,
  onAutoPilot: () => void,
  onGenerateSniperInsights: () => void,
  isCrmView?: boolean,
  onDelete?: () => void,
  updateLead?: (id: string, updates: Partial<Lead>) => void,
  key?: React.Key
}) {
  return (
    <div className={`bg-white rounded-3xl border transition-all duration-300 ${isExpanded ? 'border-indigo-200 shadow-xl shadow-indigo-50' : 'border-zinc-200 hover:border-zinc-300'}`}>
      <div className="p-6 flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 font-black text-xl border border-zinc-100">
            {lead.businessName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h4 className="text-lg font-bold text-zinc-900">{lead.businessName}</h4>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest">Score: {lead.score}</span>
            </div>
            <div className="flex items-center space-x-4 mt-1 text-xs text-zinc-500">
              <span className="flex items-center space-x-1">
                <Map className="w-3 h-3" />
                <span>{lead.address}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <a href={lead.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline underline-offset-2" onClick={e => e.stopPropagation()}>{lead.url}</a>
              </span>
              <span className="flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span>{lead.phone}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isCrmView && updateLead ? (
            <select
              className={`text-xs font-medium px-2.5 py-1 rounded-full border-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${statusColors[lead.status]}`}
              value={lead.status}
              onClick={e => e.stopPropagation()}
              onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
            >
              {Object.keys(statusColors).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          ) : (
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              lead.status === 'New' ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-600'
            }`}>
              {lead.status}
            </span>
          )}
          {isExpanded ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-zinc-50 pt-6 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Info */}
            <div className="space-y-6">
              {lead.decisionMaker && (
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Decision Maker Found</h5>
                    <Linkedin className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900">{lead.decisionMaker.name}</p>
                  <p className="text-xs text-zinc-500">{lead.decisionMaker.title}</p>
                </div>
              )}

              {lead.bant && (
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">BANT Qualification</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white rounded-lg border border-zinc-100">
                      <p className="text-[8px] font-bold text-zinc-400 uppercase">Budget</p>
                      <p className="text-[10px] font-bold text-zinc-900">{lead.bant.budget || 'Unknown'}</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-zinc-100">
                      <p className="text-[8px] font-bold text-zinc-400 uppercase">Authority</p>
                      <p className="text-[10px] font-bold text-zinc-900">{lead.bant.authority || 'Unknown'}</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-zinc-100">
                      <p className="text-[8px] font-bold text-zinc-400 uppercase">Need</p>
                      <p className="text-[10px] font-bold text-zinc-900">{lead.bant.need || 'Unknown'}</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-zinc-100">
                      <p className="text-[8px] font-bold text-zinc-400 uppercase">Timeline</p>
                      <p className="text-[10px] font-bold text-zinc-900">{lead.bant.timeline || 'Unknown'}</p>
                    </div>
                  </div>
                </div>
              )}

              {lead.signals && (
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Signal Detection</h5>
                  <div className="flex flex-wrap gap-2">
                    {lead.signals.missingWebsite && <span className="px-2 py-1 bg-rose-50 text-rose-600 text-[8px] font-bold rounded-md border border-rose-100">No Website</span>}
                    {lead.signals.lowReviews && <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[8px] font-bold rounded-md border border-amber-100">Low Reviews</span>}
                    {lead.signals.slowSpeed && <span className="px-2 py-1 bg-orange-50 text-orange-600 text-[8px] font-bold rounded-md border border-orange-100">Slow Speed</span>}
                    {lead.signals.noCta && <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[8px] font-bold rounded-md border border-blue-100">No CTA</span>}
                  </div>
                </div>
              )}

              {lead.emails && lead.emails.length > 0 && (
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Guessed Emails</h5>
                  <div className="space-y-1">
                    {lead.emails.map((email, i) => (
                      <p key={i} className="text-xs text-zinc-600 font-mono">{email}</p>
                    ))}
                  </div>
                </div>
              )}

              {lead.wordOfMouth && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Local Word of Mouth</h5>
                    <span className="text-xs font-black text-emerald-600">{lead.wordOfMouth.score}/10 Trust</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed italic">"{lead.wordOfMouth.summary}"</p>
                </div>
              )}
            </div>

            {/* Middle Insights */}
            <div className="space-y-6">
              <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
                <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Sniper Insights
                </h5>

                {lead.sniperInsights ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Owner Vibe</p>
                      <p className="text-xs text-indigo-900 font-medium">{lead.sniperInsights.ownerVibe}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Best Sales Angle</p>
                      <p className="text-xs text-indigo-900 font-medium">{lead.sniperInsights.bestSalesAngle}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Hyper-Personalized Icebreaker</p>
                      <p className="text-xs text-indigo-900 leading-relaxed italic">"{lead.sniperInsights.icebreaker}"</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <button onClick={(e) => { e.stopPropagation(); onGenerateSniperInsights(); }} className="text-xs font-bold text-indigo-600 hover:underline">Generate Sniper Insights</button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="space-y-3">
              {!isCrmView && (
                <button onClick={(e) => { e.stopPropagation(); onAutoPilot(); }} className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  <Zap className="w-4 h-4" />
                  <span>1-Click Auto-Pilot</span>
                </button>
              )}

              {!isCrmView && (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={(e) => { e.stopPropagation(); onFindDecisionMaker(); }} className="py-2 px-3 bg-zinc-100 text-zinc-600 rounded-xl font-bold text-[10px] flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-all">
                    <Search className="w-3 h-3" />
                    <span>Find Decision Maker</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onGenerateSniperInsights(); }} className="py-2 px-3 bg-zinc-100 text-zinc-600 rounded-xl font-bold text-[10px] flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-all">
                    <Zap className="w-3 h-3" />
                    <span>Sniper Insights</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onBuildMockup(); }} className="py-2 px-3 bg-zinc-100 text-zinc-600 rounded-xl font-bold text-[10px] flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-all">
                    <Layout className="w-3 h-3" />
                    <span>Build Website Mockup</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onDraftEmail(); }} className="py-2 px-3 bg-zinc-100 text-zinc-600 rounded-xl font-bold text-[10px] flex items-center justify-center space-x-2 hover:bg-zinc-200 transition-all">
                    <Mail className="w-3 h-3" />
                    <span>Draft Email</span>
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {!isCrmView && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onSave(); }}
                    disabled={lead.isSaved}
                    className={`flex-1 py-2 rounded-xl font-bold text-[10px] flex items-center justify-center space-x-2 transition-all ${
                      lead.isSaved ? 'bg-emerald-100 text-emerald-600 cursor-not-allowed' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {lead.isSaved ? <CheckCircle className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                    <span>{lead.isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                )}

                {isCrmView && onDelete && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="flex-1 py-2 rounded-xl font-bold text-[10px] flex items-center justify-center space-x-2 transition-all bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Lead</span>
                  </button>
                )}

                <a href={`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(lead.businessName + ' ' + lead.address)}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2 bg-zinc-100 text-zinc-400 rounded-xl hover:text-blue-600 transition-colors" title="Search LinkedIn"><Linkedin className="w-4 h-4" /></a>
                <a href={`https://www.facebook.com/search/pages/?q=${encodeURIComponent(lead.businessName + ' ' + lead.address)}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2 bg-zinc-100 text-zinc-400 rounded-xl hover:text-blue-600 transition-colors" title="Search Facebook"><Facebook className="w-4 h-4" /></a>
                <a href={`https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(lead.businessName)}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2 bg-zinc-100 text-zinc-400 rounded-xl hover:text-pink-600 transition-colors" title="Search Instagram"><Instagram className="w-4 h-4" /></a>
                {lead.url !== 'No website' ? (
                  <a href={`https://hunter.io/search/${lead.url.replace(/^https?:\/\//, '').split('/')[0]}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2 bg-zinc-100 text-zinc-400 rounded-xl hover:text-emerald-600 transition-colors" title="Find Emails on Hunter.io"><Mail className="w-4 h-4" /></a>
                ) : (
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(lead.businessName + ' ' + lead.address + ' email contact')}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-2 bg-zinc-100 text-zinc-400 rounded-xl hover:text-emerald-600 transition-colors" title="Search Email on Google"><Mail className="w-4 h-4" /></a>
                )}
              </div>

              {!isCrmView && (
                <button onClick={(e) => { e.stopPropagation(); onSendToAutomation(); }} className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 hover:bg-black transition-all">
                  <Send className="w-4 h-4" />
                  <span>Send to Automation</span>
                </button>
              )}
            </div>
          </div>

          {/* CRM Form Fields section */}
          {isCrmView && updateLead && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-100 mt-6" onClick={e => e.stopPropagation()}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Received At</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={lead.receivedAt || ''}
                    onChange={(e) => updateLead(lead.id, { receivedAt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Form Filled At</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={lead.formFilledAt || ''}
                    onChange={(e) => updateLead(lead.id, { formFilledAt: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Loom Sent At</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={lead.loomSentDate || ''}
                    onChange={(e) => updateLead(lead.id, { loomSentDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Lead Value ($)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={lead.value || 0}
                    onChange={(e) => updateLead(lead.id, { value: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-16 resize-none"
                    placeholder="Add notes about this lead..."
                    value={lead.notes || ''}
                    onChange={(e) => updateLead(lead.id, { notes: e.target.value })}
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">AI Actions</label>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDraftEmail(); }}
                    className="w-full py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-medium text-sm flex items-center justify-center space-x-2 transition-colors border border-indigo-100"
                  >
                    <Mail className="w-4 h-4" />
                    <span>One-Click Draft Email</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
