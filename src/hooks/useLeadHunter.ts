import { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { AppSettings, Lead } from '../types';

type HuntMode = 'specific' | 'roulette' | 'infinite';
type LogStatus = 'info' | 'success' | 'warning';

interface SessionLogEntry {
  timestamp: string;
  action: string;
  status: LogStatus;
}

interface LeadHunterState {
  isHunting: boolean;
  isHuntingNoWebsite: boolean;
  huntMode: HuntMode;
  leadsFound: Lead[];
  error: string | null;
  sessionLog: SessionLogEntry[];
}

interface UseLeadHunterOptions {
  settings: AppSettings;
  addLead: (lead: Omit<Lead, 'id'>) => void;
  currentNiche: string;
  currentCity: string;
  leadCount: number;
  isNightShift: boolean;
}

const ROULETTE_NICHES = [
  'Roofing', 'HVAC', 'Med Spa', 'Solar', 'Custom Remodeling',
  'Personal Injury Law', 'Plumbing', 'Landscaping', 'Pest Control',
  'Tree Service', 'Pool Cleaning', 'Fencing', 'Electrician', 'Concrete Contractor'
];

const ROULETTE_CITIES = [
  'Austin, TX', 'Denver, CO', 'Nashville, TN', 'Charlotte, NC', 'Orlando, FL',
  'Phoenix, AZ', 'Dallas, TX', 'Atlanta, GA', 'Las Vegas, NV', 'Miami, FL',
  'Waco, TX', 'Mesa, AZ', 'Henderson, NV', 'Garland, TX', 'Hialeah, FL',
  'Reno, NV', 'Boise, ID', 'Spokane, WA', 'Des Moines, IA', 'Little Rock, AR',
  'Amarillo, TX', 'Shreveport, LA', 'Mobile, AL'
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function fetchGoogleMapsLeads(
  mapsKey: string,
  niche: string,
  city: string,
  leadCount: number,
  isNightShift: boolean,
  noWebsiteOnly: boolean
): Promise<Lead[]> {
  const modifiers = ['', 'independent', 'local', 'affordable', 'family owned'];
  const modifier = randomFrom(modifiers);
  const searchQuery = modifier ? `${modifier} ${niche} in ${city}` : `${niche} in ${city}`;

  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': mapsKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.primaryTypeDisplayName'
    },
    body: JSON.stringify({
      textQuery: searchQuery,
      maxResultCount: Math.min(Math.max(leadCount, 1), 20)
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message || 'Invalid Google Maps API key.');

  let places = data.places || [];
  if (noWebsiteOnly) places = places.filter((p: any) => !p.websiteUri);

  return places.map((place: any, index: number) => {
    const hasWebsite = !!place.websiteUri;
    const rating = place.rating || 0;
    const reviews = place.userRatingCount || 0;

    let angle = 'General Growth';
    if (!hasWebsite) angle = 'Needs a Website ASAP';
    else if (rating < 4.0) angle = 'Reputation Management (Bad Reviews)';
    else if (reviews < 20) angle = 'Needs More Reviews / SEO';
    else angle = 'Scale with AI Automation / Paid Ads';

    return {
      id: `gmaps-${place.id || Date.now()}-${index}`,
      businessName: place.displayName?.text || 'Unknown Business',
      url: place.websiteUri || 'No website',
      address: place.formattedAddress || 'No address',
      phone: place.nationalPhoneNumber || 'No phone',
      niche: place.primaryTypeDisplayName?.text || niche,
      status: 'New' as const,
      isSaved: isNightShift,
      score: rating,
      wordOfMouth: { score: rating, summary: `${reviews} Google Reviews` },
      decisionMaker: { name: 'Owner / Manager', title: 'Decision Maker' },
      emails: [],
      sniperInsights: {
        ownerVibe: rating >= 4.5 ? 'Proud of their service, protective of brand.' : 'Likely stressed, needs operational help.',
        bestSalesAngle: angle,
        icebreaker: hasWebsite
          ? 'Loved checking out your site, but noticed a missed opportunity.'
          : "Noticed you don't have a website yet, how are you getting leads?"
      }
    };
  });
}

async function fetchGeminiLeads(
  apiKey: string,
  niche: string,
  city: string,
  leadCount: number,
  isNightShift: boolean,
  isRandom: boolean,
  noWebsiteOnly: boolean
): Promise<Lead[]> {
  const ai = new GoogleGenAI({ apiKey });

  const targetContext = isRandom
    ? 'a randomly selected HIGH-TICKET niche (e.g., Roofing, HVAC, Med Spa, Solar, Custom Remodeling, Personal Injury Law) in a randomly selected US city. Specifically generate businesses that NEED HELP with their marketing (e.g., they have no website, bad reviews, or low word-of-mouth scores).'
    : `the niche '${niche}' in '${city}'`;

  const noWebsiteInstruction = noWebsiteOnly
    ? "CRITICAL - NO WEBSITE LEADS: 100% of the generated leads MUST NOT have a website (set the 'url' field to an empty string \"\"). This is a strict requirement."
    : "CRITICAL - NO WEBSITE LEADS: At least 40% of the generated leads MUST NOT have a website (set the 'url' field to an empty string \"\"). This is mandatory so the user can pitch web design services.";

  const prompt = `Generate a JSON array of ${leadCount} realistic, fictional local business leads for ${targetContext}.
        Persona: You are "The Prospector," a lead qualification specialist.
        Directives:
        1. BANT Framework: Qualify leads based on Budget, Authority, Need, and Timeline.
        2. Signal Detection: Identify specific pain points (e.g., missing website, low reviews, slow speed).
        3. ${noWebsiteInstruction}
        4. CRITICAL - LOW REVIEWS: At least 30% must have fewer than 5 reviews.
        5. Zero Hallucination: Ensure data looks authentic for the specified location.

        Include the following fields for each lead:
        - businessName (string)
        - url (string)
        - address (string)
        - phone (string)
        - niche (string)
        - decisionMaker (object with 'name' and 'title')
        - emails (array of strings)
        - score (number 1-10)
        - bant (object with 'budget', 'authority', 'need', 'timeline' strings)
        - signals (object with 'missingWebsite', 'lowReviews', 'slowSpeed', 'noCta' booleans)
        - wordOfMouth (object with 'score' and 'summary')
        - sniperInsights (object with 'ownerVibe', 'bestSalesAngle', 'icebreaker')
        Return ONLY valid JSON array.`;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            businessName: { type: Type.STRING },
            url: { type: Type.STRING },
            address: { type: Type.STRING },
            phone: { type: Type.STRING },
            niche: { type: Type.STRING },
            decisionMaker: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING }, title: { type: Type.STRING } }
            },
            emails: { type: Type.ARRAY, items: { type: Type.STRING } },
            score: { type: Type.NUMBER },
            bant: {
              type: Type.OBJECT,
              properties: {
                budget: { type: Type.STRING },
                authority: { type: Type.STRING },
                need: { type: Type.STRING },
                timeline: { type: Type.STRING }
              }
            },
            signals: {
              type: Type.OBJECT,
              properties: {
                missingWebsite: { type: Type.BOOLEAN },
                lowReviews: { type: Type.BOOLEAN },
                slowSpeed: { type: Type.BOOLEAN },
                noCta: { type: Type.BOOLEAN }
              }
            },
            wordOfMouth: {
              type: Type.OBJECT,
              properties: { score: { type: Type.NUMBER }, summary: { type: Type.STRING } }
            },
            sniperInsights: {
              type: Type.OBJECT,
              properties: {
                ownerVibe: { type: Type.STRING },
                bestSalesAngle: { type: Type.STRING },
                icebreaker: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  const generatedLeads = JSON.parse(response.text || '[]');
  return generatedLeads.map((lead: any, index: number) => ({
    id: `generated-${Date.now()}-${index}`,
    ...lead,
    niche: lead.niche || niche,
    status: 'New' as const,
    isSaved: isNightShift
  }));
}

export function useLeadHunter({
  settings,
  addLead,
  currentNiche,
  currentCity,
  leadCount,
  isNightShift
}: UseLeadHunterOptions) {
  const [state, setState] = useState<LeadHunterState>({
    isHunting: false,
    isHuntingNoWebsite: false,
    huntMode: 'specific',
    leadsFound: [],
    error: null,
    sessionLog: []
  });

  // Infinite loop: trigger next hunt 5s after results arrive
  useEffect(() => {
    if (!state.isHunting || state.huntMode !== 'infinite') return;
    const id = setTimeout(() => toggleHunting('infinite', state.isHuntingNoWebsite, true), 5000);
    return () => clearTimeout(id);
  }, [state.leadsFound]); // eslint-disable-line react-hooks/exhaustive-deps

  const addLog = (action: string, status: LogStatus = 'info') => {
    setState(prev => ({
      ...prev,
      sessionLog: [
        { timestamp: new Date().toLocaleTimeString(), action, status },
        ...prev.sessionLog
      ].slice(0, 10)
    }));
  };

  const markLeadSaved = (leadId: string) => {
    setState(prev => ({
      ...prev,
      leadsFound: prev.leadsFound.map(l => l.id === leadId ? { ...l, isSaved: true } : l)
    }));
  };

  const appendLeads = (leads: Lead[]) => {
    setState(prev => ({ ...prev, leadsFound: [...leads, ...prev.leadsFound] }));
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setState(prev => ({
      ...prev,
      leadsFound: prev.leadsFound.map(l => l.id === leadId ? { ...l, ...updates } : l)
    }));
  };

  const toggleHunting = async (
    mode: HuntMode = state.huntMode,
    restrictNoWebsite = false,
    isAutoLoop = false
  ) => {
    if (state.isHunting && !isAutoLoop) {
      setState(prev => ({ ...prev, isHunting: false, isHuntingNoWebsite: false }));
      return;
    }

    if (!settings.geminiKey && !settings.googleMapsKey && !import.meta.env.VITE_GEMINI_API_KEY) {
      alert('Please configure either a Gemini API Key (for fictional leads) or a Google Maps API Key (for real leads) in Settings.');
      return;
    }

    setState(prev => ({
      ...prev,
      isHunting: true,
      isHuntingNoWebsite: restrictNoWebsite,
      error: null,
      leadsFound: [],
      huntMode: mode
    }));

    try {
      const isRandom = mode === 'roulette' || mode === 'infinite';
      const targetNiche = isRandom ? randomFrom(ROULETTE_NICHES) : currentNiche;
      const targetCity = isRandom ? randomFrom(ROULETTE_CITIES) : currentCity;
      const mapsKey = settings.googleMapsKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const geminiKey = settings.geminiKey || import.meta.env.VITE_GEMINI_API_KEY;

      let formattedLeads: Lead[];

      if (mapsKey) {
        addLog(`Orchestrator: Initiating Deep Scrape for ${targetNiche} in ${targetCity}...`);
        formattedLeads = await fetchGoogleMapsLeads(
          mapsKey, targetNiche, targetCity, leadCount, isNightShift, restrictNoWebsite
        );
      } else {
        if (!geminiKey) throw new Error('API key not valid');
        addLog(`Orchestrator: Generating leads for ${targetNiche} in ${targetCity} via AI...`);
        formattedLeads = await fetchGeminiLeads(
          geminiKey, targetNiche, targetCity, leadCount, isNightShift, isRandom, restrictNoWebsite
        );
      }

      if (isNightShift) {
        formattedLeads.forEach(lead => {
          addLead({
            businessName: lead.businessName,
            url: lead.url,
            niche: lead.niche,
            status: 'New',
            address: lead.address,
            phone: lead.phone,
            decisionMaker: lead.decisionMaker,
            emails: lead.emails,
            wordOfMouth: lead.wordOfMouth,
            sniperInsights: lead.sniperInsights,
            score: lead.score,
            value: 1000
          });
        });
      }

      addLog(`Orchestrator: Found ${formattedLeads.length} leads.`, 'success');
      setState(prev => ({
        ...prev,
        leadsFound: formattedLeads,
        isHunting: mode === 'infinite'
      }));
    } catch (error: any) {
      console.error('Error generating leads:', error);
      const msg = (error?.status === 400 || error.message?.includes('API key not valid'))
        ? 'Invalid API key. Please check your Gemini API key in Settings or .env file.'
        : error.message || 'Failed to generate leads.';
      setState(prev => ({ ...prev, isHunting: false, isHuntingNoWebsite: false, error: msg }));
    }
  };

  return {
    isHunting: state.isHunting,
    isHuntingNoWebsite: state.isHuntingNoWebsite,
    huntMode: state.huntMode,
    leadsFound: state.leadsFound,
    error: state.error,
    sessionLog: state.sessionLog,
    toggleHunting,
    addLog,
    markLeadSaved,
    appendLeads,
    updateLead
  };
}
