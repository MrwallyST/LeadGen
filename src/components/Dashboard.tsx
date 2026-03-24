import React from 'react';
import { AppState, DailyRoutine } from '../types';
import { Target, TrendingUp, Users, Video, Bot } from 'lucide-react';

interface DashboardProps {
  state: AppState;
  updateRoutine: (date: string, field: keyof DailyRoutine, value: boolean) => void;
}

export function Dashboard({ state, updateRoutine }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayRoutine = state.routines.find(r => r.date === today) || {
    date: today,
    formsFilled: false,
    socialChecked: false,
    loomsSent: false,
  };

  const { activeClients, mrr, loomsSent } = state.leads.reduce(
    (acc, l) => {
      if (l.status === 'Closed Won') {
        acc.activeClients++;
        acc.mrr += l.value || 1000;
        acc.loomsSent++;
      } else if (['Contacted', 'Meeting Booked', 'Proposal Sent'].includes(l.status)) {
        acc.loomsSent++;
      }
      return acc;
    },
    { activeClients: 0, mrr: 0, loomsSent: 0 }
  );
  
  const startDate = new Date(state.startDate);
  const diffTime = new Date().getTime() - startDate.getTime();
  const daysActive = diffTime < 0 ? 0 : Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const progress = Math.max(0, Math.min(100, (daysActive / 100) * 100));

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">Dashboard</h2>
        <p className="text-zinc-500 mt-2">Day {daysActive} of 100. Keep pushing.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500">Monthly Revenue</h3>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-900 mt-4">${mrr.toLocaleString()}</p>
          <p className="text-xs text-zinc-400 mt-2">Goal: $10,000</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500">Active Clients</h3>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-900 mt-4">{activeClients}</p>
          <p className="text-xs text-zinc-400 mt-2">Goal: 10</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500">Looms Sent</h3>
            <Video className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-900 mt-4">{loomsSent}</p>
          <p className="text-xs text-zinc-400 mt-2">Total outreach</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-500">Timeline</h3>
            <Target className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-900 mt-4">{daysActive} / 100</p>
          <div className="w-full bg-zinc-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Daily Routine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 border-b border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900">Daily 30-Minute Routine</h3>
            <p className="text-sm text-zinc-500 mt-1">Check these off every weekday to guarantee success.</p>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-start space-x-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer border border-transparent hover:border-zinc-200">
              <input 
                type="checkbox" 
                className="mt-1 w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                checked={todayRoutine.formsFilled}
                onChange={(e) => updateRoutine(today, 'formsFilled', e.target.checked)}
              />
              <div>
                <p className="font-medium text-zinc-900">10 min: Fill out 5 contact forms</p>
                <p className="text-sm text-zinc-500 mt-1">Note the business name, URL, and time submitted in the CRM.</p>
              </div>
            </label>

            <label className="flex items-start space-x-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer border border-transparent hover:border-zinc-200">
              <input 
                type="checkbox" 
                className="mt-1 w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                checked={todayRoutine.socialChecked}
                onChange={(e) => updateRoutine(today, 'socialChecked', e.target.checked)}
              />
              <div>
                <p className="font-medium text-zinc-900">10 min: Check Facebook & Nextdoor</p>
                <p className="text-sm text-zinc-500 mt-1">Look for local business owner posts and engage.</p>
              </div>
            </label>

            <label className="flex items-start space-x-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer border border-transparent hover:border-zinc-200">
              <input 
                type="checkbox" 
                className="mt-1 w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                checked={todayRoutine.loomsSent}
                onChange={(e) => updateRoutine(today, 'loomsSent', e.target.checked)}
              />
              <div>
                <p className="font-medium text-zinc-900">10 min: Record & send 1-2 Looms</p>
                <p className="text-sm text-zinc-500 mt-1">Send to your best prospects who haven't replied or replied slowly.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Pro Tips & Hacks */}
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Pro Tips & "Glitches"</span>
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">The "Loom Glitch"</p>
                <p className="text-xs text-zinc-400">Don't record a new video for every lead. Record 1 "Master Demo" and just change the browser tab to their website for the first 5 seconds. Use AI to swap the audio greeting.</p>
              </div>
              <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">The "Nextdoor Hack"</p>
                <p className="text-xs text-zinc-400">Search for "recommendations" in local groups. When someone asks for a plumber, don't just reply—DM the plumber they recommended and offer to automate their lead intake.</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-200">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>The AI Shortcut</span>
            </h3>
            <p className="text-xs text-purple-100 mb-4">Don't do it all yourself. Use an AI Agent as your co-pilot to build these systems.</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center font-bold">1</div>
                <span>Copy the <strong>AI Auditor</strong> prompt</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center font-bold">2</div>
                <span>Paste it into <strong>ChatGPT or Claude</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center font-bold">3</div>
                <span>Let the AI <strong>build the automation</strong></span>
              </div>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'agent' }))}
              className="w-full mt-4 py-2 bg-white text-purple-600 rounded-lg text-xs font-bold hover:bg-purple-50 transition-colors"
            >
              Get AI Prompts
            </button>
          </div>

          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Lead Gen Automation</span>
            </h3>
            <p className="text-xs text-indigo-100 mb-4">Have your own lead generator? Here is the "Make.com" shortcut:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center font-bold">1</div>
                <span>Copy the <strong>Webhook URL</strong> from Make.com</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center font-bold">2</div>
                <span>Paste it in your generator's <strong>API/Webhook</strong> settings</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center font-bold">3</div>
                <span>Map the data to <strong>OpenAI</strong> for an audit</span>
              </div>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'mastery' }))}
              className="w-full mt-4 py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors"
            >
              Mastery Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
