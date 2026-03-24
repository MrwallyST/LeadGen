import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parseAppState, defaultState } from '../state';
import { AppState } from '../../types';

describe('parseAppState', () => {
  let consoleWarnMock: any;

  beforeEach(() => {
    // Mock console.warn to keep test output clean
    consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
  });

  it('should return defaultState when savedState is null', () => {
    const result = parseAppState(null);
    expect(result).toEqual(defaultState);
  });

  it('should return defaultState when savedState is empty string', () => {
    const result = parseAppState('');
    expect(result).toEqual(defaultState);
  });

  it('should return defaultState and warn when savedState is invalid JSON', () => {
    const invalidJson = '{ not valid json';
    const result = parseAppState(invalidJson);

    expect(consoleWarnMock).toHaveBeenCalledWith('Failed to parse AppState from storage, returning default state.', expect.any(SyntaxError));
    expect(result).toEqual(defaultState);
  });

  it('should return defaultState and warn when JSON is valid but structure is invalid AppState', () => {
    const validJsonInvalidState = JSON.stringify({
      leads: [],
      // missing routines, startDate, settings
    });

    const result = parseAppState(validJsonInvalidState);

    expect(consoleWarnMock).toHaveBeenCalledWith('Invalid AppState found in storage, returning default state.');
    expect(result).toEqual(defaultState);
  });

  it('should return defaultState when AppState is missing settings', () => {
    const invalidState = JSON.stringify({
      leads: [],
      routines: [],
      startDate: new Date().toISOString(),
      // settings is missing completely
    });
    const result = parseAppState(invalidState);
    expect(result).toEqual(defaultState);
  });

  it('should return defaultState when an item in leads array has invalid structure', () => {
    const stateWithBadLead = JSON.stringify({
      leads: [
        {
          id: '1',
          businessName: 'Business A',
          // missing url, niche, status
        }
      ],
      routines: [],
      startDate: new Date().toISOString(),
      settings: defaultState.settings
    });

    const result = parseAppState(stateWithBadLead);
    expect(result).toEqual(defaultState);
  });

  it('should return the parsed state when JSON is valid and structure is correct', () => {
    const validState: AppState = {
      leads: [
        {
          id: '1',
          businessName: 'Acme Corp',
          url: 'https://acme.com',
          niche: 'Plumbers',
          status: 'New'
        }
      ],
      routines: [
        {
          date: '2023-10-27',
          formsFilled: true,
          socialChecked: false,
          loomsSent: true
        }
      ],
      startDate: '2023-10-20T10:00:00.000Z',
      settings: {
        webhookUrls: ['https://hook.com'],
        netlifyToken: 'token123',
        geminiKey: 'key123',
        googleMapsKey: 'maps123'
      }
    };

    const validJson = JSON.stringify(validState);
    const result = parseAppState(validJson);

    expect(consoleWarnMock).not.toHaveBeenCalled();
    expect(result).toEqual(validState);
  });
});
