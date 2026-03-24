import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Map, Globe, Settings, Wrench, Calculator, 
  ShieldAlert, Zap, Swords, Target, Sparkles, Flame, GraduationCap, 
  Rocket, BookOpen, TrendingUp, Trophy, Bot, LogOut, ChevronDown, ChevronRight 
} from 'lucide-react';
import { logout } from '../firebase';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: any;
}

interface Category {
  id: string;
  label: string;
  icon: any;
  items: TabItem[];
}

export function Sidebar({ currentTab, setCurrentTab }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['prospecting']);

  const categories: Category[] = [
    {
      id: 'getting-started',
      label: 'GETTING STARTED',
      icon: Rocket,
      items: [
        { id: 'agent', label: 'AI Agent Shortcut', icon: Bot },
        { id: 'firstclient', label: 'First Client Playbook', icon: Rocket },
        { id: 'firstsale', label: '0 to 1st Sale Tracker', icon: Trophy },
        { id: 'roadmap', label: '100-Day Roadmap', icon: Map },
      ]
    },
    {
      id: 'prospecting',
      label: 'PROSPECTING',
      icon: Target,
      items: [
        { id: 'leadgenerator', label: 'Lead Generator', icon: Zap },
        { id: 'prospector', label: 'Client Prospector', icon: Target },
        { id: 'leads', label: 'CRM & Leads', icon: Users },
        { id: 'trending', label: 'Hot Niches Radar', icon: TrendingUp },
      ]
    },
    {
      id: 'tools-automation',
      label: 'TOOLS & AUTOMATION',
      icon: Wrench,
      items: [
        { id: 'automation', label: 'Automation Blueprint', icon: Zap },
        { id: 'tools', label: 'Tools & Scripts', icon: Wrench },
        { id: 'addons', label: 'Recurring AI Add-ons', icon: Zap },
        { id: 'calculator', label: 'Revenue Calculator', icon: Calculator },
      ]
    },
    {
      id: 'advanced-strategies',
      label: 'ADVANCED STRATEGIES',
      icon: Swords,
      items: [
        { id: 'moneymakers', label: 'New Money Makers', icon: Sparkles },
        { id: 'demonmode', label: 'Demon Mode 😈', icon: Flame },
        { id: 'competitors', label: 'Competitor Battlecards', icon: Swords },
        { id: 'objections', label: 'Objection Handling', icon: ShieldAlert },
      ]
    },
    {
      id: 'mindset-focus',
      label: 'MINDSET & FOCUS',
      icon: Flame,
      items: [
        { id: 'execution101', label: 'Execution 101', icon: GraduationCap },
        { id: 'mastery', label: 'Mastery & Mindset', icon: Trophy },
        { id: 'glossary', label: 'AI Jargon Buster', icon: BookOpen },
        { id: 'landing', label: 'Landing Page', icon: Globe },
      ]
    }
  ];

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-64 bg-zinc-900 text-zinc-300 flex flex-col h-screen border-r border-zinc-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-tight">100 Day Exit Plan</h1>
        <p className="text-xs text-zinc-500 mt-1">Zero to $10k/month</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {/* Dashboard is always visible and not in a category */}
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors mb-4 ${
            currentTab === 'dashboard' 
              ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
              : 'hover:bg-zinc-800/50 hover:text-white'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${currentTab === 'dashboard' ? 'text-indigo-400' : 'text-zinc-500'}`} />
          <span className="text-sm font-bold">Dashboard</span>
        </button>

        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const CategoryIcon = category.icon;
          
          return (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <CategoryIcon className="w-3 h-3" />
                  <span>{category.label}</span>
                </div>
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>

              {isExpanded && (
                <div className="space-y-1 ml-2">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors ${
                          isActive 
                            ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                            : 'hover:bg-zinc-800/50 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-zinc-800/50 hover:text-white transition-colors">
          <Settings className="w-5 h-5 text-zinc-500" />
          <span>Settings</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-rose-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
