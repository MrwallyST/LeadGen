import React, { useState } from 'react';
import { AppState, Lead, LeadStatus } from '../types';
import { Plus, Search, MoreVertical, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface LeadsProps {
  state: AppState;
  addLead: (lead: Omit<Lead, 'id'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
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

export function Leads({ state, addLead, updateLead }: LeadsProps) {
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

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">CRM & Leads</h2>
          <p className="text-zinc-500 mt-2">Track your 5 daily contact forms and Loom outreach.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Lead</span>
        </button>
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
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-zinc-500 bg-zinc-50/50">
                <th className="px-6 py-4 font-medium">Business</th>
                <th className="px-6 py-4 font-medium">Niche</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Contact Date</th>
                <th className="px-6 py-4 font-medium">Value</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {state.leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No leads yet. Time to fill out some contact forms!
                  </td>
                </tr>
              ) : (
                state.leads.map(lead => (
                  <React.Fragment key={lead.id}>
                    <tr className="hover:bg-zinc-50/50 transition-colors group cursor-pointer" onClick={() => toggleExpand(lead.id)}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-zinc-900">{lead.businessName}</div>
                        {lead.url && (
                          <a href={getSafeUrl(lead.url)} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline flex items-center mt-1" onClick={e => e.stopPropagation()}>
                            {lead.url} <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 text-zinc-600">{lead.niche}</td>
                      <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                        <select 
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${statusColors[lead.status]}`}
                          value={lead.status}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
                        >
                          {Object.keys(statusColors).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-zinc-600">
                        {lead.contactDate ? new Date(lead.contactDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 text-zinc-600">
                        ${lead.value?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                          {expandedLeadId === lead.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </td>
                    </tr>
                    {expandedLeadId === lead.id && (
                      <tr className="bg-zinc-50/50 border-b border-zinc-100">
                        <td colSpan={6} className="px-6 py-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-28 resize-none"
                                  placeholder="Add notes about this lead..."
                                  value={lead.notes || ''}
                                  onChange={(e) => updateLead(lead.id, { notes: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
