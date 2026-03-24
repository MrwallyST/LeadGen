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
