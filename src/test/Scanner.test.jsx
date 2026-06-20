import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Scanner from '../pages/Scanner';

describe('Scanner Component', () => {
  it('renders scanner title and instructions', () => {
    render(<Scanner />);
    expect(screen.getByText(/Smart AI Scanner/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload your electricity bills, fuel receipts, shopping receipts, or grocery receipts/i)).toBeInTheDocument();
  });

  it('renders upload zone', () => {
    render(<Scanner />);
    expect(screen.getByText(/Drag & Drop your bill here/i)).toBeInTheDocument();
  });
});
