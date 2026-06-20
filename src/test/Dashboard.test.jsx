import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../pages/Dashboard';
import { CarbonProvider } from '../context/CarbonContext';

vi.mock('recharts', () => {
  const OriginalRechartsModule = vi.importActual('recharts');
  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: '100%', height: 300 }}>{children}</div>
    ),
    LineChart: () => <div>LineChart</div>,
    PieChart: () => <div>PieChart</div>,
    Pie: () => <div>Pie</div>,
    Cell: () => <div>Cell</div>,
    XAxis: () => <div>XAxis</div>,
    Tooltip: () => <div>Tooltip</div>,
    Line: () => <div>Line</div>,
  };
});

describe('Dashboard Component', () => {
  it('renders the personalized greeting', () => {
    render(<CarbonProvider><Dashboard /></CarbonProvider>);
    expect(screen.getByText(/Good Morning Raj/i)).toBeInTheDocument();
  });

  it('renders gamification and badges', () => {
    render(<CarbonProvider><Dashboard /></CarbonProvider>);
    expect(screen.getByText(/Carbon Saver/i)).toBeInTheDocument();
    expect(screen.getByText(/Eco Warrior/i)).toBeInTheDocument();
  });

  it('renders action plans', () => {
    render(<CarbonProvider><Dashboard /></CarbonProvider>);
    expect(screen.getByText(/Take the train twice this week/i)).toBeInTheDocument();
  });
});
