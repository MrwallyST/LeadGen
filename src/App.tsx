import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Leads } from './components/Leads';
import { Roadmap } from './components/Roadmap';
import { LandingPage } from './components/LandingPage';
import { Tools } from './components/Tools';
import { Calculator } from './components/Calculator';
import { Objections } from './components/Objections';
import { RecurringAddons } from './components/RecurringAddons';
import { Competitors } from './components/Competitors';
import { MoneyMakers } from './components/MoneyMakers';
import { Prospector } from './components/Prospector';
import { LeadGenerator } from './components/LeadGenerator';
import { AutomationBlueprint } from './components/AutomationBlueprint';
import { DemonMode } from './components/DemonMode';
import { Execution101 } from './components/Execution101';
import { FirstClient } from './components/FirstClient';
import { Glossary } from './components/Glossary';
import { TrendingNiches } from './components/TrendingNiches';
import { FirstSaleJourney } from './components/FirstSaleJourney';
import { Mastery } from './components/Mastery';
import { AIAgentShortcut } from './components/AIAgentShortcut';
import { AppState, Lead, DailyRoutine } from './types';
import { parseAppState } from './utils/state';
import { Menu, X, LogIn, LogOut, Loader2 } from 'lucide-react';
import { auth, db, signInWithGoogle, logout } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, onSnapshot, query, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [state, setState] = useState<AppState>(() => {
    return parseAppState(localStorage.getItem('appState'));
  });

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    // @ts-ignore
    if (import.meta.env.VITE_MOCK_AUTH === 'true') {
      setUser({ uid: 'test-user-123', email: 'tester@example.com', displayName: 'Test Agent' } as User);
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    
    // Initialize user doc if it doesn't exist
    getDoc(userRef).then((docSnap) => {
      if (!docSnap.exists()) {
        setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          startDate: new Date().toISOString(),
          settings: {
            webhookUrls: [''],
            netlifyToken: '',
            geminiKey: '',
            googleMapsKey: ''
          }
        });
      } else {
        const data = docSnap.data();
        setState(prev => ({ 
          ...prev, 
          startDate: data.startDate,
          settings: data.settings || prev.settings
        }));
      }
    });

    const leadsRef = collection(db, 'users', user.uid, 'leads');
    const routinesRef = collection(db, 'users', user.uid, 'routines');

    const unsubLeads = onSnapshot(leadsRef, (snapshot) => {
      const leadsData: Lead[] = [];
      snapshot.forEach(doc => leadsData.push({ id: doc.id, ...doc.data() } as Lead));
      setState(prev => ({ ...prev, leads: leadsData.sort((a, b) => new Date(b.contactDate || 0).getTime() - new Date(a.contactDate || 0).getTime()) }));
    });

    const unsubRoutines = onSnapshot(routinesRef, (snapshot) => {
      const routinesData: DailyRoutine[] = [];
      snapshot.forEach(doc => routinesData.push({ ...doc.data() } as DailyRoutine));
      setState(prev => ({ ...prev, routines: routinesData }));
    });

    // Listen for settings changes
    const unsubSettings = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.settings) {
          setState(prev => ({ ...prev, settings: data.settings }));
        }
      }
    });

    return () => {
      unsubLeads();
      unsubRoutines();
      unsubSettings();
    };
  }, [user]);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e.detail) setCurrentTab(e.detail);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const updateSettings = async (newSettings: Partial<AppState['settings']>) => {
    if (!user) return;
    
    // Optimistic UI update for immediate feedback (fixes pasting issues)
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        settings: { ...state.settings, ...newSettings }
      });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const addLead = async (leadData: Omit<Lead, 'id'>) => {
    if (!user) return;
    
    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const newLead = { ...leadData, id: tempId, contactDate: new Date().toISOString() };
    setState(prev => ({
      ...prev,
      leads: [newLead, ...prev.leads]
    }));

    try {
      const leadsRef = collection(db, 'users', user.uid, 'leads');
      await addDoc(leadsRef, {
        ...leadData,
        contactDate: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error adding lead:", error);
      // Revert on failure
      setState(prev => ({
        ...prev,
        leads: prev.leads.filter(l => l.id !== tempId)
      }));
      console.warn("Lead saved locally but could not sync to Firestore.", error);
    }
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    if (!user) return;
    try {
      const leadRef = doc(db, 'users', user.uid, 'leads', id);
      await updateDoc(leadRef, updates);
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const updateRoutine = async (date: string, field: keyof DailyRoutine, value: boolean) => {
    if (!user) return;
    try {
      const routineRef = doc(db, 'users', user.uid, 'routines', date);
      const existing = state.routines.find(r => r.date === date);
      
      if (existing) {
        await updateDoc(routineRef, { [field]: value });
      } else {
        await setDoc(routineRef, {
          date,
          formsFilled: false,
          socialChecked: false,
          loomsSent: false,
          [field]: value
        });
      }
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-8">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-indigo-100">
            <LogIn className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">100 Day Exit Plan</h1>
            <p className="text-zinc-500 mt-3 text-sm leading-relaxed">
              Sign in to sync your CRM and progress across all your devices.
            </p>
          </div>
          <button
            onClick={signInWithGoogle}
            className="w-full bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center justify-center space-x-3 group"
          >
            <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900 overflow-hidden relative">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          currentTab={currentTab} 
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            setIsMobileMenuOpen(false);
          }} 
        />
      </div>

      <main className="flex-1 overflow-y-auto relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-zinc-200 sticky top-0 z-30">
          <h1 className="text-lg font-bold tracking-tight">100 Day Exit Plan</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => logout()}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-500"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="p-4 lg:p-0">
          {currentTab === 'dashboard' && <Dashboard state={state} updateRoutine={updateRoutine} />}
          {currentTab === 'firstclient' && <FirstClient />}
          {currentTab === 'firstsale' && <FirstSaleJourney />}
          {currentTab === 'leads' && <Leads state={state} addLead={addLead} updateLead={updateLead} settings={state.settings} />}
          {currentTab === 'leadgenerator' && <LeadGenerator settings={state.settings} updateSettings={updateSettings} addLead={addLead} />}
          {currentTab === 'prospector' && <Prospector settings={state.settings} updateSettings={updateSettings} />}
          {currentTab === 'automation' && <AutomationBlueprint />}
          {currentTab === 'trending' && <TrendingNiches />}
          {currentTab === 'tools' && <Tools state={state} />}
          {currentTab === 'addons' && <RecurringAddons />}
          {currentTab === 'moneymakers' && <MoneyMakers />}
          {currentTab === 'demonmode' && <DemonMode />}
          {currentTab === 'execution101' && <Execution101 />}
          {currentTab === 'glossary' && <Glossary />}
          {currentTab === 'competitors' && <Competitors />}
          {currentTab === 'objections' && <Objections />}
          {currentTab === 'calculator' && <Calculator />}
          {currentTab === 'roadmap' && <Roadmap />}
          {currentTab === 'mastery' && <Mastery />}
          {currentTab === 'agent' && <AIAgentShortcut />}
          {currentTab === 'landing' && <LandingPage />}
        </div>
      </main>
    </div>
  );
}

