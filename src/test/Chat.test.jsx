import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Chat from '../pages/Chat';
import { CarbonProvider } from '../context/CarbonContext';

window.HTMLElement.prototype.scrollIntoView = function() {};

describe('Chat Component', () => {
  it('renders chat interface and status', () => {
    render(<CarbonProvider><Chat /></CarbonProvider>);
    expect(screen.getAllByText(/EcoBuddy AI/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/context-aware responses based on your scanned bills/i)).toBeInTheDocument();
  });

  it('renders specific suggestion questions', () => {
    render(<CarbonProvider><Chat /></CarbonProvider>);
    expect(screen.getByText(/Why is my footprint high this month\?/i)).toBeInTheDocument();
    expect(screen.getByText(/How can I reduce my emissions\?/i)).toBeInTheDocument();
  });
});
