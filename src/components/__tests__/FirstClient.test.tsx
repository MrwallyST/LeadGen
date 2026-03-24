import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FirstClient } from '../FirstClient';

// Mock OutreachGenerator since it might have complex internal state or side effects
vi.mock('../OutreachGenerator', () => ({
  OutreachGenerator: () => <div data-testid="outreach-generator">Mocked Outreach Generator</div>,
}));

describe('FirstClient Component', () => {
  it('renders the main title', () => {
    render(<FirstClient />);
    expect(screen.getByText('First Client Playbook')).toBeInTheDocument();
  });

  it('renders the Baby Freelancer Action Plan section', () => {
    render(<FirstClient />);
    expect(screen.getByText(/The "Baby Freelancer" Action Plan/i)).toBeInTheDocument();
  });

  it('renders all phases of the playbook', () => {
    render(<FirstClient />);

    expect(screen.getByText(/Phase 1: Pick Your Niche/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase 2: Build Your Free Deliverable/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase 3: The Outreach/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase 4: The Upsell Path/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase 5: Collect Proof/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase 6: Scale/i)).toBeInTheDocument();
  });

  it('renders the OutreachGenerator component', () => {
    render(<FirstClient />);
    expect(screen.getByTestId('outreach-generator')).toBeInTheDocument();
  });
});
