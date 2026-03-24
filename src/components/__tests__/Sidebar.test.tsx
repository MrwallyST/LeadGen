import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Sidebar } from '../Sidebar';

// Mock the firebase module to prevent authentication-related errors in tests
vi.mock('../../firebase', () => ({
  logout: vi.fn(),
}));

describe('Sidebar Component', () => {
  it('renders the main title', () => {
    render(<Sidebar currentTab="dashboard" setCurrentTab={vi.fn()} />);
    expect(screen.getByText('100 Day Exit Plan')).toBeInTheDocument();
  });

  it('renders the Dashboard tab', () => {
    render(<Sidebar currentTab="dashboard" setCurrentTab={vi.fn()} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('calls setCurrentTab when a tab is clicked', () => {
    const mockSetCurrentTab = vi.fn();
    render(<Sidebar currentTab="dashboard" setCurrentTab={mockSetCurrentTab} />);

    // The PROSPECTING category is expanded by default (Lead Generator is in it)
    const leadGenTab = screen.getByText('Lead Generator');
    fireEvent.click(leadGenTab);

    expect(mockSetCurrentTab).toHaveBeenCalledWith('leadgenerator');
  });

  it('expands and collapses categories', () => {
    render(<Sidebar currentTab="dashboard" setCurrentTab={vi.fn()} />);

    // GETTING STARTED category should not be expanded initially
    expect(screen.queryByText('AI Agent Shortcut')).not.toBeInTheDocument();

    // Click to expand GETTING STARTED
    const gettingStartedBtn = screen.getByText('GETTING STARTED');
    fireEvent.click(gettingStartedBtn);

    // Now the item should be visible
    expect(screen.getByText('AI Agent Shortcut')).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(gettingStartedBtn);
    expect(screen.queryByText('AI Agent Shortcut')).not.toBeInTheDocument();
  });
});
