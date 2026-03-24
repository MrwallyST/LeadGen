export type LeadStatus = 'New' | 'Contacted' | 'Meeting Booked' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost';

export interface Lead {
  id: string;
  businessName: string;
  url: string;
  niche: string;
  status: LeadStatus;
  contactDate?: string;
  loomSentDate?: string;
  zoomDate?: string;
  receivedAt?: string;
  formFilledAt?: string;
  notes?: string;
  value?: number;
  score?: number;
  address?: string;
  phone?: string;
  decisionMaker?: {
    name: string;
    title: string;
    linkedin?: string;
  };
  emails?: string[];
  wordOfMouth?: {
    score: number;
    summary: string;
  };
  bant?: {
    budget?: string;
    authority?: string;
    need?: string;
    timeline?: string;
  };
  signals?: {
    missingWebsite?: boolean;
    lowReviews?: boolean;
    slowSpeed?: boolean;
    noCta?: boolean;
  };
  sniperInsights?: {
    ownerVibe: string;
    bestSalesAngle: string;
    icebreaker: string;
  };
  websiteMockupUrl?: string;
  isSaved?: boolean;
}

export interface DailyRoutine {
  date: string;
  formsFilled: boolean;
  socialChecked: boolean;
  loomsSent: boolean;
}

export interface AppSettings {
  webhookUrls: string[];
  netlifyToken: string;
  geminiKey: string;
  googleMapsKey: string;
}

export interface AppState {
  leads: Lead[];
  routines: DailyRoutine[];
  startDate: string;
  settings: AppSettings;
}

// Type Guards

export function isValidLeadStatus(status: any): status is LeadStatus {
  return [
    'New',
    'Contacted',
    'Meeting Booked',
    'Proposal Sent',
    'Closed Won',
    'Closed Lost',
  ].includes(status);
}

export function isValidLead(lead: any): lead is Lead {
  if (!lead || typeof lead !== 'object') return false;
  return (
    typeof lead.id === 'string' &&
    typeof lead.businessName === 'string' &&
    typeof lead.url === 'string' &&
    typeof lead.niche === 'string' &&
    isValidLeadStatus(lead.status)
  );
}

export function isValidDailyRoutine(routine: any): routine is DailyRoutine {
  if (!routine || typeof routine !== 'object') return false;
  return (
    typeof routine.date === 'string' &&
    typeof routine.formsFilled === 'boolean' &&
    typeof routine.socialChecked === 'boolean' &&
    typeof routine.loomsSent === 'boolean'
  );
}

export function isValidAppSettings(settings: any): settings is AppSettings {
  if (!settings || typeof settings !== 'object') return false;
  return (
    Array.isArray(settings.webhookUrls) &&
    settings.webhookUrls.every((url: any) => typeof url === 'string') &&
    typeof settings.netlifyToken === 'string' &&
    typeof settings.geminiKey === 'string' &&
    typeof settings.googleMapsKey === 'string'
  );
}

export function isValidAppState(state: any): state is AppState {
  if (!state || typeof state !== 'object') return false;
  return (
    Array.isArray(state.leads) &&
    state.leads.every(isValidLead) &&
    Array.isArray(state.routines) &&
    state.routines.every(isValidDailyRoutine) &&
    typeof state.startDate === 'string' &&
    isValidAppSettings(state.settings)
  );
}
