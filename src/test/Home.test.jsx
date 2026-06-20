import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from '../pages/Home';

describe('Home Component', () => {
  it('renders the hero section with correct wording', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/EcoBuddy AI/i)).toBeInTheDocument();
    expect(screen.getByText(/conversational environmental insights/i)).toBeInTheDocument();
  });

  it('renders the call to action button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /Start your green journey/i })).toBeInTheDocument();
  });
});
