import React, { useState } from 'react';
import { AppState, Lead, LeadStatus, AppSettings } from '../types';
import { Plus, Search, MoreVertical, ExternalLink, ChevronDown, ChevronUp, Download, Mail, Trash2 } from 'lucide-react';
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
    // Ignore invalid URLs
  }
  return '#';
};

export function Leads({ state, settings, addLead, updateLead, deleteLead }: LeadsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    businessName: '',
    url: '',
    niche: '',
    status: 'New',
    value: 1000
  });

  const handleAdd = () => {
    if (newLead.businessName) {
      addLead(newLead as Omit<Lead, 'id'>);
      setIsAdding(false);
      setNewLead({ businessName: '', url: '', niche: '', status: 'New', value: 1000 });
    }
  };

  const statusColors: Record<LeadStatus, string> = {
    'New': 'bg-zinc-100 text-zinc-700',
    'Contacted': 'bg-blue-100 text-blue-700',
    'Meeting Booked': 'bg-purple-100 text-purple-700',
    'Proposal Sent': 'bg-amber-100 text-amber-700',
    'Closed Won': 'bg-emerald-100 text-emerald-700',
    'Closed Lost': 'bg-rose-100 text-rose-700'
  };

  const toggleExpand = (id: string) => {
    setExpandedLeadId(expandedLeadId === id ? null : id);
  };

  const handleDeleteWithWebsites = () => {
    if (window.confirm("Are you sure you want to delete all leads that have websites?")) {
      const leadsToDelete = state.leads.filter(lead => lead.url && lead.url.trim() !== '' && lead.url.toLowerCase() !== 'no website');
      leadsToDelete.forEach(lead => deleteLead(lead.id));
    }
  };

  const handleExportCsv = () => {
    if (state.leads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const csvData = state.leads.map(lead => ({
      BusinessName: lead.businessName,
      Website: lead.url,
      Niche: lead.niche,
      Status: lead.status,
      Address: lead.address || '',
      Phone: lead.phone || '',
      DecisionMakerName: lead.decisionMaker?.name || '',
      DecisionMakerTitle: lead.decisionMaker?.title || '',
      Emails: lead.emails?.join(', ') || '',
      Score: lead.score || '',
      Value: lead.value || 0,
      ContactDate: lead.contactDate || '',
      Notes: lead.notes || ''
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `crm_leads_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDraftEmail = async (lead: Lead) => {
    const apiKey = settings?.geminiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      alert("Please configure your Gemini API Key in Settings to draft emails.");
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        config: {
          systemInstruction: `You are "The Closer," a world-class B2B copywriter. 
          Copywriting Directives:
          1. Smart Brevity: Use short sentences, active voice.
          2. Hyper-Personalization: Use the specific "Buying Signals".
          3. Frictionless CTA: End with a low-friction question.
          
          Output Format:
          Subject: [Subject Line]
          ---
          [Email Body]`,
        },
        contents: `Draft a cold email to ${lead.decisionMaker?.name || 'the owner'} at ${lead.businessName}. 
        Buying Signal: ${lead.sniperInsights?.icebreaker || 'I noticed your business online.'}
        BANT/Need: ${lead.bant?.need || 'Scaling with AI Automation'}
        Offer: A free AI-powered lead generation system.`
      });

      const fullText = response.text || '';
      const subjectMatch = fullText.match(/Subject: (.*)/i);
      const bodyMatch = fullText.split('---')[1];
      
      const subject = subjectMatch ? subjectMatch[1] : `Quick question for ${lead.businessName}`;
      const emailBody = bodyMatch ? bodyMatch.trim() : fullText;
      const toEmail = lead.emails && lead.emails.length > 0 ? lead.emails[0] : '';
      
      window.open(`mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`);
    } catch (error) {
      console.error("Error drafting email:", error);
      alert("Failed to draft email. Check console.");
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">CRM & Leads</h2>
          <p className="text-zinc-500 mt-2">Track your 5 daily contact forms and Loom outreach.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={handleDeleteWithWebsites}
            className="bg-rose-50 text-rose-600 border border-rose-100 px-4 py-2 rounded-xl font-medium hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2 flex-1 sm:flex-none"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete All with Websites</span>
          </button>
          <button 
            onClick={handleExportCsv}
            className="bg-zinc-100 text-zinc-700 px-4 py-2 rounded-xl font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 flex-1 sm:flex-none"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 flex-1 sm:flex-none"
          >
            <Plus className="w-5 h-5" />
            <span>Add Lead</span>
          </button>
        </div>
      </header>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 mb-8">
          <h3 className="text-lg font-bold text-zinc-900 mb-4">New Lead</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Business Name" 
              className="px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newLead.businessName}
              onChange={e => setNewLead({...newLead, businessName: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Website URL" 
              className="px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newLead.url}
              onChange={e => setNewLead({...newLead, url: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Niche (e.g. Plumber)" 
              className="px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newLead.niche}
              onChange={e => setNewLead({...newLead, niche: e.target.value})}
            />
            <div className="flex space-x-2">
              <button 
                onClick={handleAdd}
                className="flex-1 bg-zinc-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-zinc-800 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl font-medium text-zinc-500 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto px-4 pb-4 mt-4">
          <div className="space-y-4 min-w-[800px]">
            {state.leads.length === 0 ? (
               <div className="text-center py-12 text-zinc-500">No leads yet. Time to fill out some contact forms!</div>
            ) : (
              state.leads.map(lead => (
                <LeadCard
                key={lead.id}
                lead={lead}
                isExpanded={expandedLeadId === lead.id}
                onToggle={() => toggleExpand(lead.id)}
                isCrmView={true}
                onDelete={() => deleteLead(lead.id)}
                updateLead={updateLead}
                onDraftEmail={() => handleDraftEmail(lead)}
                onSave={() => {}}
                onSendToAutomation={() => {}}
                onBuildMockup={() => {}}
                onFindDecisionMaker={() => {}}
                onAutoPilot={() => {}}
                  onGenerateSniperInsights={() => {}}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
