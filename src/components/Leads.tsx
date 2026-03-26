import React, { useState, useMemo } from 'react';
import { AppState, Lead, LeadStatus, AppSettings } from '../types';
import { Plus, Search, ExternalLink, ChevronDown, ChevronUp, Download, Mail, Trash2, Globe, WifiOff, CheckSquare, Square } from 'lucide-react';
import Papa from 'papaparse';
import { GoogleGenAI } from '@google/genai';
import { LeadCard } from './LeadCard';

interface LeadsProps {
  state: AppState;
  settings: AppSettings;
  addLead: (lead: Omit<Lead, 'id'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;

}

const getSafeUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      return parsedUrl.href;
    }
  } catch (e) {
    // ignore
  }
  return '#';
};


  const [isAdding, setIsAdding] = useState(false);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    businessName: '', url: '', niche: '', status: 'New', value: 1000
  });

  const statusColors: Record<LeadStatus, string> = {
    'New': 'bg-zinc-100 text-zinc-700',
    'Contacted': 'bg-blue-100 text-blue-700',
    'Meeting Booked': 'bg-purple-100 text-purple-700',
    'Proposal Sent': 'bg-amber-100 text-amber-700',
    'Closed Won': 'bg-emerald-100 text-emerald-700',
    'Closed Lost': 'bg-rose-100 text-rose-700'
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return state.leads;
    const q = search.toLowerCase();
    return state.leads.filter(l =>
      l.businessName.toLowerCase().includes(q) ||
      (l.niche || '').toLowerCase().includes(q) ||
      (l.phone || '').toLowerCase().includes(q) ||
      (l.url || '').toLowerCase().includes(q) ||
      (l.emails || []).some(e => e.toLowerCase().includes(q))
    );
  }, [state.leads, search]);

  const allSelected = filtered.length > 0 && filtered.every(l => selected.has(l.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(l => s.delete(l.id)); return s; });
    } else {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(l => s.add(l.id)); return s; });
    }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };

  const handleDeleteSelected = () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} lead(s)?`)) return;
    deleteLeads([...selected]);
    setSelected(new Set());
  };

  const handleDeleteWithWebsite = () => {
    const ids = state.leads.filter(l => !hasNoWebsite(l)).map(l => l.id);
    if (ids.length === 0) return;
    if (!confirm(`Delete all ${ids.length} leads WITH a website?`)) return;
    deleteLeads(ids);
    setSelected(new Set());
  };

  const handleDeleteNoWebsite = () => {
    const ids = state.leads.filter(l => hasNoWebsite(l)).map(l => l.id);
    if (ids.length === 0) return;
    if (!confirm(`Delete all ${ids.length} leads WITHOUT a website?`)) return;
    deleteLeads(ids);
    setSelected(new Set());
  };

  const handleAdd = () => {
    if (newLead.businessName) {
      addLead(newLead as Omit<Lead, 'id'>);
      setIsAdding(false);
      setNewLead({ businessName: '', url: '', niche: '', status: 'New', value: 1000 });
    }
  };

  const handleExportCsv = () => {
    if (state.leads.length === 0) { alert("No leads to export."); return; }
    const csvData = state.leads.map(lead => ({
      BusinessName: lead.businessName,
      Website: lead.url,
      Niche: lead.niche,
      Status: lead.status,
      Phone: lead.phone || '',
      Email: lead.emails?.join(', ') || '',
      Score: lead.score || '',
      Address: lead.address || '',
      DecisionMaker: lead.decisionMaker?.name || '',
      Value: lead.value || 0,
      ContactDate: lead.contactDate || '',
      Notes: lead.notes || ''
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `crm_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDraftEmail = async (lead: Lead) => {
    const apiKey = settings?.geminiKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) { alert("Please configure your Gemini API Key in Settings."); return; }
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        config: {
          systemInstruction: `You are "The Closer," a world-class B2B copywriter.
          Output Format: Subject: [line]\n---\n[body]`,
        },
        contents: `Draft a cold email to ${lead.decisionMaker?.name || 'the owner'} at ${lead.businessName}.
        Buying Signal: ${lead.sniperInsights?.icebreaker || 'I noticed your business online.'}
        Need: ${lead.bant?.need || 'Scaling with AI Automation'}`
      });
      const text = response.text || '';
      const subject = (text.match(/Subject: (.*)/i)?.[1]) ?? `Quick question for ${lead.businessName}`;
      const body = (text.split('---')[1] ?? text).trim();
      const to = lead.emails?.[0] ?? '';
      window.open(`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } catch { alert("Failed to draft email."); }
  };

  const withWebsiteCount = state.leads.filter(l => !hasNoWebsite(l)).length;
  const noWebsiteCount = state.leads.filter(l => hasNoWebsite(l)).length;

  return (
    <div className="p-4 lg:p-8 max-w-full space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">CRM & Leads</h2>
          <p className="text-zinc-500 mt-1 text-sm">{state.leads.length} total · {withWebsiteCount} with website · {noWebsiteCount} without</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={handleExportCsv} className="bg-zinc-100 text-zinc-700 px-4 py-2 rounded-xl font-medium hover:bg-zinc-200 transition-colors flex items-center space-x-2 text-sm">
            <Download className="w-4 h-4" /><span>Export CSV</span>
          </button>
          <button onClick={() => setIsAdding(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 text-sm">
            <Plus className="w-4 h-4" /><span>Add Lead</span>
          </button>
        </div>
      </header>

      {/* Add Lead Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <h3 className="text-lg font-bold text-zinc-900 mb-4">New Lead</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="Business Name" className="px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={newLead.businessName} onChange={e => setNewLead({ ...newLead, businessName: e.target.value })} />
            <input type="text" placeholder="Website URL" className="px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={newLead.url} onChange={e => setNewLead({ ...newLead, url: e.target.value })} />
            <input type="text" placeholder="Niche (e.g. Plumber)" className="px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={newLead.niche} onChange={e => setNewLead({ ...newLead, niche: e.target.value })} />
            <div className="flex space-x-2">
              <button onClick={handleAdd} className="flex-1 bg-zinc-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-zinc-800 transition-colors text-sm">Save</button>
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl font-medium text-zinc-500 hover:bg-zinc-100 transition-colors text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-56" />
          </div>

          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {selected.size > 0 && (
              <button onClick={handleDeleteSelected}
                className="flex items-center space-x-1.5 px-3 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /><span>Delete {selected.size} selected</span>
              </button>
            )}
            <button onClick={handleDeleteWithWebsite}
              className="flex items-center space-x-1.5 px-3 py-2 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors">
              <Globe className="w-3.5 h-3.5" /><span>Delete w/ website ({withWebsiteCount})</span>
            </button>
            <button onClick={handleDeleteNoWebsite}
              className="flex items-center space-x-1.5 px-3 py-2 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors">
              <WifiOff className="w-3.5 h-3.5" /><span>Delete no website ({noWebsiteCount})</span>
            </button>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
