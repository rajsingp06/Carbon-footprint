import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders the main layout with navigation', () => {
    render(<App />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('renders the home page initially', () => {
    render(<App />);
    expect(screen.getByText(/Your Personal/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Carbon Reduction Coach/i)).toBeInTheDocument();
  });
});
