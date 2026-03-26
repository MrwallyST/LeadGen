import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Leads } from '../Leads';

describe('Leads Component', () => {
  const mockState = {
    user: null,
    leads: [
      { id: '1', businessName: 'Lead 1', url: 'https://example.com', niche: 'Tech', status: 'New', value: 1000 },
      { id: '2', businessName: 'Lead 2', url: 'No website', niche: 'Plumbing', status: 'New', value: 1000 },
      { id: '3', businessName: 'Lead 3', url: 'https://test.com', niche: 'Tech', status: 'New', value: 1000 }
    ],
    nicheIdeas: [],
    huntMode: 'infinite' as any,
    isHunting: false,
    isHuntingNoWebsite: false,
    targetCount: 100,
    apiKey: ''
  };

  const mockSettings = { geminiKey: '', location: '', targetNiche: '' };

  it('renders leads correctly', () => {
    render(<Leads state={mockState} settings={mockSettings} addLead={vi.fn()} updateLead={vi.fn()} deleteLead={vi.fn()} />);
    expect(screen.getByText('Lead 1')).toBeDefined();
    expect(screen.getByText('Lead 2')).toBeDefined();
    expect(screen.getByText('Lead 3')).toBeDefined();
  });

  it('calls deleteLead only for leads with a valid website when "Delete All with Websites" is clicked', () => {
    const mockDeleteLead = vi.fn();
    window.confirm = vi.fn(() => true); // Mock confirm dialog

    render(<Leads state={mockState} settings={mockSettings} addLead={vi.fn()} updateLead={vi.fn()} deleteLead={mockDeleteLead} />);

    const deleteBtn = screen.getByText('Delete All with Websites');
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteLead).toHaveBeenCalledTimes(2); // Should delete id 1 and 3
    expect(mockDeleteLead).toHaveBeenCalledWith('1');
    expect(mockDeleteLead).toHaveBeenCalledWith('3');
  });

  it('renders horizontal scroll wrapper', () => {
    const { container } = render(<Leads state={mockState} settings={mockSettings} addLead={vi.fn()} updateLead={vi.fn()} deleteLead={vi.fn()} />);
    const scrollWrapper = container.querySelector('.overflow-x-auto');
    expect(scrollWrapper).toBeDefined();
    const minWidthWrapper = container.querySelector('.min-w-\\[800px\\]');
    expect(minWidthWrapper).toBeDefined();
  });
});
