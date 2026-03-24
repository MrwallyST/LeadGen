import { AppState, isValidAppState } from '../types';

export const defaultState: AppState = {
  leads: [],
  routines: [],
  startDate: new Date().toISOString(),
  settings: {
    webhookUrls: [''],
    netlifyToken: '',
    geminiKey: '',
    googleMapsKey: ''
  }
};

export function parseAppState(savedState: string | null): AppState {
  if (!savedState) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(savedState);

    if (isValidAppState(parsed)) {
      return parsed;
    }

    console.warn('Invalid AppState found in storage, returning default state.');
    return defaultState;
  } catch (error) {
    console.warn('Failed to parse AppState from storage, returning default state.', error);
    return defaultState;
  }
}
