
import {
  Zap, Target, Globe, Mail, Shield, Settings, Play, Pause,
  RefreshCw, Plus, Trash2, ExternalLink, Search, AlertCircle,
  Send, Copy, CheckCircle, ChevronDown, ChevronUp, Save,
  Facebook, Instagram, Linkedin, Download, Layout, Eye, Rocket,
  X, Map, Link as LinkIcon, Phone, SlidersHorizontal, Flame,
  BookmarkCheck, TrendingUp, Filter
} from 'lucide-react';

interface LeadGeneratorProps {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  addLead: (lead: Omit<Lead, 'id'>) => void;
}

interface LeadGenState {
  isNightShift: boolean;
  currentNiche: string;
  currentCity: string;
  leadCount: number;
  activeListTab: 'all' | 'has-website' | 'no-website' | 'saved' | 'playbook';
  expandedLeadId: string | null;
  isSettingsOpen: boolean;
  sortOrder: 'score-desc' | 'score-asc' | 'newest';
  minScore: number;
  searchQuery: string;
}

const NICHES = ['Plumbers','HVAC','Roofers','Electricians','Landscapers','Pest Control','Tree Service','Pool Cleaning','Fencing','Concrete Contractor','Solar','Med Spa','Custom Remodeling','Personal Injury Law','Chiropractors','Dentists','Auto Repair','Pressure Washing','Painters','Flooring','Handyman','Moving Services','Carpet Cleaning','Window Cleaning','Gym / Fitness Studio','Real Estate Agent','Insurance Agent','Towing Service','Locksmith','Junk Removal'];

const CITIES = [
  'Austin, TX','Dallas, TX','Houston, TX','San Antonio, TX','Fort Worth, TX','Waco, TX','Amarillo, TX','Lubbock, TX','El Paso, TX',
  'Miami, FL','Orlando, FL','Tampa, FL','Jacksonville, FL','Hialeah, FL','Tallahassee, FL',
  'Atlanta, GA','Savannah, GA','Charlotte, NC','Raleigh, NC','Nashville, TN','Memphis, TN',
  'Phoenix, AZ','Mesa, AZ','Tucson, AZ','Scottsdale, AZ',
  'Denver, CO','Colorado Springs, CO','Las Vegas, NV','Henderson, NV','Reno, NV',
  'Los Angeles, CA','San Diego, CA','Sacramento, CA','Fresno, CA','San Jose, CA',
  'Chicago, IL','Columbus, OH','Cleveland, OH','Indianapolis, IN','Detroit, MI',
  'Boise, ID','Spokane, WA','Portland, OR','Seattle, WA','Tacoma, WA',
  'Des Moines, IA','Little Rock, AR','Shreveport, LA','New Orleans, LA','Mobile, AL','Birmingham, AL',
  'New York, NY','Philadelphia, PA','Richmond, VA','Virginia Beach, VA','Baltimore, MD','Washington, DC',
  'Minneapolis, MN','Kansas City, MO','St. Louis, MO','Omaha, NE','Tulsa, OK','Oklahoma City, OK'
];

export function LeadGenerator({ settings, updateSettings, addLead }: LeadGeneratorProps) {
  const [state, setState] = useState<LeadGenState>({
    isNightShift: false,
    currentNiche: 'Plumbers',
    currentCity: 'Austin, TX',
    leadCount: 10,
    activeListTab: 'all',
    expandedLeadId: null,
    isSettingsOpen: false,

  });
  const [nicheOpen, setNicheOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mockup, setMockup] = useState<{ html: string; leadName: string } | null>(null);
  const [mockupLoading, setMockupLoading] = useState(false);
  const nicheRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);


  const {
    isHunting,
    isHuntingNoWebsite,
    huntMode,
    leadsFound,
    error,
    sessionLog,
    toggleHunting,
    addLog,
    markLeadSaved,
    appendLeads,
    updateLead
  } = useLeadHunter({
    settings,
    addLead,
    currentNiche: state.currentNiche,
    currentCity: state.currentCity,
    leadCount: state.leadCount,
    isNightShift: state.isNightShift
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (nicheRef.current && !nicheRef.current.contains(e.target as Node)) setNicheOpen(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    addLog(`Orchestrator: Processing CSV upload...`);
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const leads: Lead[] = results.data.map((row: any, index: number) => ({
          id: `csv-${Date.now()}-${index}`,
          businessName: row.businessName || row.Company || 'Unknown',
          url: row.url || row.Website || 'No website',
          niche: row.niche || row.Industry || state.currentNiche,
          status: 'New',
          address: row.address || row.Location || '',
          phone: row.phone || row.Phone || '',
          decisionMaker: {
            name: row.decisionMakerName || row.Contact || 'Owner / Manager',
            title: row.decisionMakerTitle || row.Title || 'Decision Maker'
          },
          emails: row.emails ? row.emails.split(',').map((e: string) => e.trim()) : [],
          score: parseFloat(row.score) || 7.0,
          isSaved: true
        }));

        appendLeads(leads);
        addLog(`Orchestrator: 🟢 Successfully imported ${leads.length} leads from CSV.`, 'success');
      },
      error: (error) => {
        addLog(`Orchestrator: 🔴 CSV Import failed: ${error.message}`, "warning");
      }
    });
  };


    addLead({
      businessName: lead.businessName,
      url: lead.url,
      niche: lead.niche,
      status: lead.status || 'New',
      address: lead.address,
      phone: lead.phone,
      decisionMaker: lead.decisionMaker,
      emails: lead.emails,
      wordOfMouth: lead.wordOfMouth,
      sniperInsights: lead.sniperInsights,
      score: lead.score,
      value: 1000,
      bant: lead.bant,
      signals: lead.signals
    });
    markLeadSaved(lead.id);

  };

  const handleSendToAutomation = async (lead: Lead) => {
    addLog(`Sentinel: Validating payload for ${lead.businessName}...`);
    
    if (!lead.businessName || (!lead.emails?.length && !lead.phone)) {
      addLog("Sentinel: 🔴 [FAIL] Missing critical contact data.", "warning");
      alert("Sentinel: Data Integrity Error. Lead missing contact info.");
      return;
    }

    if (!settings.webhookUrls || settings.webhookUrls.length === 0 || !settings.webhookUrls[0]) {
      addLog("Sentinel: 🔴 [FAIL] No Webhook URL configured.", "warning");
      alert("Please configure at least one Webhook URL in Settings.");
      setState(prev => ({ ...prev, isSettingsOpen: true }));
      return;
    }

    try {
      addLog("Sentinel: 🟢 [PASS] Data integrity verified. Initiating handshake...");
      for (const url of settings.webhookUrls) {
        if (!url) continue;
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lead)
        });
      }
      addLog(`Sentinel: 🟢 [PASS] Automation handshake successful for ${lead.businessName}.`, "success");
      alert(`Lead ${lead.businessName} sent to automation successfully!`);
    } catch (error) {
      console.error("Error sending to webhook:", error);
      alert("Failed to send to automation. Check console for details.");
    }
  };

  const handleDraftEmail = async (lead: Lead) => {
    const apiKey = settings.geminiKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      alert("Please configure your Gemini API Key in Settings to draft emails.");
      setState(prev => ({ ...prev, isSettingsOpen: true }));
      return;
    }

    try {
      addLog(`Closer: Crafting bespoke outreach for ${lead.businessName}...`);
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        config: {
          systemInstruction: `You are "The Closer," a world-class B2B copywriter. 
          Copywriting Directives:
          1. Smart Brevity: Use short sentences, active voice. BLUF (Bottom Line Up Front).
          2. Hyper-Personalization: Use the specific "Buying Signals" (BANT/Pain Points).
          3. Frictionless CTA: End with a low-friction question.
          4. Subject Line: Generate a compelling, short subject line.
          
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
      
      addLog("Closer: Outreach copy finalized.", "success");
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
    } catch (error) {
      console.error("Error drafting email:", error);
      alert("Failed to draft email.");
    }
  };

  const handleExportCsv = () => {
    if (leadsFound.length === 0) {
      alert("No leads to export.");
      return;
    }

    const csvData = leadsFound.map(lead => ({
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
      Budget: lead.bant?.budget || '',
      Authority: lead.bant?.authority || '',
      Need: lead.bant?.need || '',
      Timeline: lead.bant?.timeline || '',
      MissingWebsite: lead.signals?.missingWebsite ? 'Yes' : 'No',
      LowReviews: lead.signals?.lowReviews ? 'Yes' : 'No',
      SlowSpeed: lead.signals?.slowSpeed ? 'Yes' : 'No',
      NoCTA: lead.signals?.noCta ? 'Yes' : 'No',
      WordOfMouthScore: lead.wordOfMouth?.score || '',
      WordOfMouthSummary: lead.wordOfMouth?.summary || '',
      OwnerVibe: lead.sniperInsights?.ownerVibe || '',
      BestSalesAngle: lead.sniperInsights?.bestSalesAngle || '',
      Icebreaker: lead.sniperInsights?.icebreaker || ''
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLog(`Orchestrator: Exported ${csvData.length} leads to CSV.`, "success");
  };

  const toggleNightShift = () => setState(prev => ({ ...prev, isNightShift: !prev.isNightShift }));
  
  const addWebhook = () => updateSettings({ webhookUrls: [...settings.webhookUrls, ''] });
  
  const updateWebhook = (index: number, value: string) => {
    const newUrls = [...settings.webhookUrls];
    newUrls[index] = value;
    updateSettings({ webhookUrls: newUrls });
  };

  const removeWebhook = (index: number) => {
    updateSettings({ webhookUrls: settings.webhookUrls.filter((_, i) => i !== index) });
  };

  const toggleLeadExpansion = (id: string) => {
    setState(prev => ({ ...prev, expandedLeadId: prev.expandedLeadId === id ? null : id }));
  };

  const handleFindDecisionMaker = (lead: Lead) => {
    const query = lead.decisionMaker?.name && lead.decisionMaker.name !== 'Owner / Manager' 
      ? `${lead.decisionMaker.name} ${lead.businessName}`
      : `${lead.businessName} owner OR founder`;
    window.open(`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(query)}`, '_blank');
  };

  const handleGenerateSniperInsights = async (lead: Lead) => {
    const apiKey = settings.geminiKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      alert("Please configure your Gemini API Key in Settings to generate sniper insights.");
      setState(prev => ({ ...prev, isSettingsOpen: true }));
      return;
    }

    try {
      addLog(`Orchestrator: Generating Sniper Insights for ${lead.businessName}...`);
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Analyze this local business lead and provide 'Sniper Insights' for a cold outreach:
      Business Name: ${lead.businessName}
      Niche: ${lead.niche}
      Website: ${lead.url}
      Reviews: ${lead.wordOfMouth?.summary || 'Unknown'}

      Return ONLY a JSON object with these exactly 3 keys:
      1. ownerVibe (string) - A short description of the likely owner's personality based on their industry/reviews.
      2. bestSalesAngle (string) - The best angle to pitch them (e.g. Needs Website, Needs SEO, Automation).
      3. icebreaker (string) - A hyper-personalized 1-sentence icebreaker to start the cold email.`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const insights = JSON.parse(response.text || '{}');

      const newSniperInsights = {
        ownerVibe: insights.ownerVibe || 'Unknown',
        bestSalesAngle: insights.bestSalesAngle || 'Unknown',
        icebreaker: insights.icebreaker || 'Unknown'
      };

      updateLead(lead.id, { sniperInsights: newSniperInsights });
      addLog(`Orchestrator: Sniper Insights generated for ${lead.businessName}.`, "success");
      return newSniperInsights;
    } catch (error) {
      console.error("Error generating insights:", error);
      alert("Failed to generate Sniper Insights.");
      return null;
    }
  };

  const handleAutoPilot = async (lead: Lead) => {
    addLog(`Orchestrator: Initiating 1-Click Auto-Pilot for ${lead.businessName}...`);
    handleSaveLead(lead);

    let currentLead = { ...lead };
    if (!currentLead.sniperInsights) {
      const generatedInsights = await handleGenerateSniperInsights(currentLead);
      if (generatedInsights) {
        currentLead.sniperInsights = generatedInsights;
      }
    }
    await handleSendToAutomation(currentLead);
    addLog(`Orchestrator: 1-Click Auto-Pilot sequence complete for ${lead.businessName}.`, "success");
  };

  const handleBuildMockup = async (lead: Lead) => {
    const apiKey = settings.geminiKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      alert("Please configure your Gemini API Key in Settings to build mockups.");
      setState(prev => ({ ...prev, isSettingsOpen: true }));
      return;
    }

    setMockupLoading(true);
    try {
      addLog(`Builder: Generating website mockup for ${lead.businessName}...`);
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Generate a single-file HTML landing page for a local business named "${lead.businessName}" in the "${lead.niche}" industry located at "${lead.address || 'USA'}".
      Use Tailwind CSS via CDN (https://cdn.tailwindcss.com). Make it look modern, clean, and highly converting.
      Include: hero section with business name and tagline, services section (3-4 services), a trust/reviews section, and a contact form with phone and email.
      Use a professional color scheme appropriate for ${lead.niche}.
      Return ONLY the raw HTML code starting with <!DOCTYPE html>. No markdown, no backticks.`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });

      let htmlContent = response.text || '';
      htmlContent = htmlContent.replace(/^```html\s*/i, '').replace(/\s*```$/i, '').trim();

      setMockup({ html: htmlContent, leadName: lead.businessName });
      addLog(`Builder: Mockup ready for ${lead.businessName}.`, 'success');
    } catch (error) {
      console.error("Error building mockup:", error);
      alert("Failed to build website mockup. Check your Gemini API key.");
    } finally {
      setMockupLoading(false);
    }
  };



  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-zinc-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">LeadGen Pro</h2>
            <p className="text-zinc-500 text-sm font-medium">AI-Powered Prospecting & Automation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Daily Goal: 10 Pitches</p>
            <div className="flex items-center space-x-2">
              <div className="w-32 h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div className="w-1/10 h-full bg-indigo-600 rounded-full" />
              </div>
              <span className="text-sm font-bold text-zinc-900">1/10</span>
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

      {/* Target Acquisition Section */}
      <section className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 overflow-hidden">
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-zinc-900">Target Acquisition</h3>
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl">
            <button 
              onClick={() => setState(prev => ({ ...prev, isNightShift: false }))}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${!state.isNightShift ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
            >
              <Target className="w-4 h-4" />
              <span>Manual Hunt</span>
            </button>
            <button 
              onClick={() => setState(prev => ({ ...prev, isNightShift: true }))}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${state.isNightShift ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500'}`}
            >
              <Zap className="w-4 h-4" />
              <span>Night Shift (Auto)</span>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Sub-tabs */}
          <div className="flex items-center space-x-8 border-b border-zinc-100 pb-4">
            <button 
              onClick={() => setState(prev => ({ ...prev, huntMode: 'specific' }))}
              className={`text-sm font-bold pb-4 relative transition-colors ${huntMode === 'specific' ? 'text-indigo-600' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Specific Target</span>
              </div>
              {huntMode === 'specific' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />}
            </button>
            <button 
              onClick={() => setState(prev => ({ ...prev, huntMode: 'roulette' }))}
              className={`text-sm font-bold pb-4 relative transition-colors ${huntMode === 'roulette' ? 'text-indigo-600' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Global Roulette</span>
              </div>
              {huntMode === 'roulette' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />}
            </button>
            <button 
              onClick={() => setState(prev => ({ ...prev, huntMode: 'infinite' }))}
              className={`text-sm font-bold pb-4 relative transition-colors ${huntMode === 'infinite' ? 'text-indigo-600' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                <span>Infinite Loop</span>
              </div>
              {huntMode === 'infinite' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />}
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* NICHE DROPDOWN */}
            <div className="space-y-2" ref={nicheRef}>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Target Niche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="e.g. Plumber"
                  value={state.currentNiche}
                  onFocus={() => setNicheOpen(true)}
                  onChange={(e) => { setState(prev => ({ ...prev, currentNiche: e.target.value })); setNicheOpen(true); }}
                  className="w-full pl-10 pr-8 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <ChevronDown
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 cursor-pointer transition-transform ${nicheOpen ? 'rotate-180' : ''}`}
                  onClick={() => setNicheOpen(o => !o)}
                />
                {nicheOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-zinc-200 rounded-xl shadow-xl overflow-y-auto max-h-60">
                    {recentNiches.length > 0 && (
                      <>
                        <p className="px-4 pt-2 pb-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Recent</p>
                        {recentNiches.map(niche => (
                          <button key={`r-${niche}`} onMouseDown={() => { setState(prev => ({ ...prev, currentNiche: niche })); setNicheOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center space-x-2">
                            <RefreshCw className="w-3 h-3 text-zinc-400" /><span>{niche}</span>
                          </button>
                        ))}
                        <div className="border-t border-zinc-100 my-1" />
                      </>
                    )}
                    {NICHES.filter(n => n.toLowerCase().includes(state.currentNiche.toLowerCase()) || state.currentNiche === '').map(niche => (
                      <button
                        key={niche}
                        onMouseDown={() => { setState(prev => ({ ...prev, currentNiche: niche })); setNicheOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* CITY DROPDOWN */}
            <div className="space-y-2" ref={cityRef}>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Austin, TX"
                  value={state.currentCity}
                  onFocus={() => setCityOpen(true)}
                  onChange={(e) => { setState(prev => ({ ...prev, currentCity: e.target.value })); setCityOpen(true); }}
                  className="w-full px-4 pr-8 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <ChevronDown
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 cursor-pointer transition-transform ${cityOpen ? 'rotate-180' : ''}`}
                  onClick={() => setCityOpen(o => !o)}
                />
                {cityOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-zinc-200 rounded-xl shadow-xl overflow-y-auto max-h-60">
                    {recentCities.length > 0 && (
                      <>
                        <p className="px-4 pt-2 pb-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Recent</p>
                        {recentCities.map(city => (
                          <button key={`r-${city}`} onMouseDown={() => { setState(prev => ({ ...prev, currentCity: city })); setCityOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center space-x-2">
                            <RefreshCw className="w-3 h-3 text-zinc-400" /><span>{city}</span>
                          </button>
                        ))}
                        <div className="border-t border-zinc-100 my-1" />
                      </>
                    )}
                    {CITIES.filter(c => c.toLowerCase().includes(state.currentCity.toLowerCase()) || state.currentCity === '').map(city => (
                      <button
                        key={city}
                        onMouseDown={() => { setState(prev => ({ ...prev, currentCity: city })); setCityOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Lead Count</label>
              <div className="flex items-center space-x-4">
                <input 
                  type="number" 
                  value={state.leadCount}
                  onChange={(e) => setState(prev => ({ ...prev, leadCount: parseInt(e.target.value) }))}
                  className="w-24 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />

                  className={`flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                    isHunting 
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' 
                      : state.isNightShift 
                        ? 'bg-zinc-900 text-white hover:bg-black shadow-lg shadow-zinc-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  }`}
                >
                  {isHunting && !isHuntingNoWebsite ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Stop Hunting</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>{state.isNightShift ? 'Start Night Shift' : 'Hunt'}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => toggleHunting(huntMode, true)}
                  className={`py-3 px-6 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                    isHunting && isHuntingNoWebsite
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                      : 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-200'
                  }`}
                  title="Strictly hunt for businesses that do NOT have a website"
                >
                  {isHunting && isHuntingNoWebsite ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Hunt No-Website Only</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start space-x-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              <span className="font-bold">Night Shift:</span> The agent will find top leads, save them, run full enrichment, generate custom HTML audits, build website mockups, and wait for your approval to <span className="font-bold italic">export a CSV</span> when finished.
            </p>
          </div>
        </div>
      </section>

      {/* Orchestrator Session Log */}
      <section className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Orchestrator Session Log</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">System Online</span>
          </div>
        </div>
        <div className="p-6 font-mono text-[11px] space-y-2 max-h-48 overflow-y-auto">
          {sessionLog.length > 0 ? (
            sessionLog.map((log, i) => (
              <div key={i} className="flex items-start space-x-3">
                <span className="text-zinc-600 shrink-0">[{log.timestamp}]</span>
                <span className={`${
                  log.status === 'success' ? 'text-emerald-400' : 
                  log.status === 'warning' ? 'text-rose-400' : 
                  'text-zinc-400'
                }`}>
                  {log.action}
                </span>
              </div>
            ))
          ) : (
            <p className="text-zinc-600 italic">Waiting for system initialization...</p>
          )}
        </div>
      </section>

      {/* Lead List Section */}
      <section className="space-y-6">
        {/* Hunt Stats Bar */}
        {huntStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 flex items-center space-x-3">
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center"><TrendingUp className="w-5 h-5 text-indigo-600" /></div>
              <div><p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Avg Score</p><p className="text-xl font-black text-zinc-900">{huntStats.avgScore}<span className="text-xs text-zinc-400">/10</span></p></div>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 flex items-center space-x-3">
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center"><Flame className="w-5 h-5 text-amber-500" /></div>
              <div><p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Hot Leads</p><p className="text-xl font-black text-zinc-900">{huntStats.hotCount}<span className="text-xs text-zinc-400"> score 8+</span></p></div>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 flex items-center space-x-3">
              <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-rose-500" /></div>
              <div><p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">No Website</p><p className="text-xl font-black text-zinc-900">{huntStats.noWebCount}<span className="text-xs text-zinc-400"> leads</span></p></div>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 flex items-center space-x-3">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center"><BookmarkCheck className="w-5 h-5 text-emerald-600" /></div>
              <div><p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Saved</p><p className="text-xl font-black text-zinc-900">{huntStats.savedCount}<span className="text-xs text-zinc-400">/{huntStats.total}</span></p></div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* Top row: tabs + actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center bg-zinc-100 p-1 rounded-xl overflow-x-auto">
              {[
                { id: 'all', label: `All (${leadsFound.length})` },
                { id: 'has-website', label: 'Has Website' },
                { id: 'no-website', label: 'No Website' },
                { id: 'saved', label: `Saved (${leadsFound.filter(l => l.isSaved).length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setState(prev => ({ ...prev, activeListTab: tab.id as any }))}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${state.activeListTab === tab.id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 flex-wrap gap-2">
              {filteredLeads.filter(l => !l.isSaved).length > 0 && (
                <button onClick={handleSaveAllVisible}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm">
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Save All Visible ({filteredLeads.filter(l => !l.isSaved).length})</span>
                </button>
              )}
              <select
                value={state.sortOrder}
                onChange={(e) => setState(prev => ({ ...prev, sortOrder: e.target.value as LeadGenState['sortOrder'] }))}
                className="bg-white border border-zinc-200 rounded-xl px-4 py-2 text-xs font-bold text-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="score-desc">Score: High → Low</option>
                <option value="score-asc">Score: Low → High</option>
                <option value="newest">Newest First</option>
              </select>
              <label className="flex items-center space-x-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer">
                <Plus className="w-4 h-4" /><span>Import CSV</span>
                <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
              </label>
              <button onClick={handleExportCsv} className="flex items-center space-x-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
                <Download className="w-4 h-4" /><span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Filter row: search + score slider */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-2xl border border-zinc-200 p-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search leads..."
                value={state.searchQuery}
                onChange={e => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex items-center space-x-3 flex-1">
              <SlidersHorizontal className="w-4 h-4 text-zinc-400 shrink-0" />
              <span className="text-xs font-bold text-zinc-500 shrink-0">Min Score:</span>
              <input
                type="range" min={0} max={10} step={1}
                value={state.minScore}
                onChange={e => setState(prev => ({ ...prev, minScore: Number(e.target.value) }))}
                className="flex-1 accent-indigo-600"
              />
              <span className={`text-sm font-black w-8 text-center rounded-lg px-1 ${state.minScore >= 8 ? 'text-emerald-600' : state.minScore >= 5 ? 'text-amber-600' : 'text-zinc-600'}`}>
                {state.minScore === 0 ? 'All' : `${state.minScore}+`}
              </span>
            </div>
            <span className="text-xs text-zinc-400 shrink-0">
              Showing {filteredLeads.length}/{leadsFound.length}
            </span>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="space-y-4">
          {isHunting ? (
            <div className="bg-white rounded-3xl border border-zinc-200 p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900">
                  {state.isNightShift ? 'Night Shift Active...' : 'Deep Scraping Google Maps...'}
                </h4>
                <p className="text-zinc-500 text-sm">
                  {huntMode === 'roulette' || huntMode === 'infinite' ? 'Bypassing top results to find hidden gems in smaller cities...' : `Scanning 50+ profiles in ${state.currentCity} for ${state.currentNiche}...`}
                </p>
              </div>
            </div>
          ) : filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                isExpanded={state.expandedLeadId === lead.id}
                onToggle={() => toggleLeadExpansion(lead.id)}
                onSave={() => handleSaveLead(lead)}
                onSendToAutomation={() => handleSendToAutomation(lead)}
                onDraftEmail={() => handleDraftEmail(lead)}
                onBuildMockup={() => handleBuildMockup(lead)}
                onFindDecisionMaker={() => handleFindDecisionMaker(lead)}
                onAutoPilot={() => handleAutoPilot(lead)}
                onGenerateSniperInsights={() => handleGenerateSniperInsights(lead)}
                onMarkContacted={() => {
                  updateLead(lead.id, { status: 'Contacted' as Lead['status'] });
                  if (!lead.isSaved) handleSaveLead(lead, true);
                }}
              />
            ))
          ) : (
            <div className="bg-white rounded-3xl border border-zinc-200 p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-zinc-200" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900">No leads found.</h4>
                <p className="text-zinc-500 text-sm">Configure your target acquisition and start hunting.</p>
              </div>
            </div>
          )}
        </div>
      </section>

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
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Get your free API key from Google AI Studio. This is required for the AI agent to run audits, generate websites, and write emails.
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-1">Get your API key here.</a>
                </p>
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

              <div className="space-y-4">
                <label className="text-sm font-bold text-zinc-900">Google Maps API Key</label>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Required for pulling REAL businesses from Google Maps. If left blank, Gemini will generate fictional leads.
                  <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-1">Get your API key here.</a>
                </p>
                <div className="relative">
                  <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    placeholder="AIza..."
                    value={settings.googleMapsKey || ''}
                    onChange={(e) => updateSettings({ googleMapsKey: e.target.value })}
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

      {/* Mockup Loading Overlay */}
      {mockupLoading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-10 text-center space-y-4 shadow-2xl max-w-sm mx-4">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
            <h3 className="text-lg font-black text-zinc-900">Building Mockup...</h3>
            <p className="text-sm text-zinc-500">Gemini is designing a custom landing page. Takes ~10 seconds.</p>
          </div>
        </div>
      )}

      {/* Mockup Preview Modal */}
      {mockup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-white border-b border-zinc-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Layout className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-black text-zinc-900 text-sm">Website Mockup — {mockup.leadName}</h3>
                <p className="text-[10px] text-zinc-400">AI-generated preview · Show this to the client</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={URL.createObjectURL(new Blob([mockup.html], { type: 'text/html' }))}
                download={`mockup-${mockup.leadName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Download HTML</span>
              </a>
              <button
                onClick={() => setMockup(null)}
                className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
          </div>
          <iframe
            srcDoc={mockup.html}
            className="flex-1 w-full bg-white"
            title={`Mockup for ${mockup.leadName}`}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
}
