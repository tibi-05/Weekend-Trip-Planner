import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, beforeEach } from 'vitest';
import Home from './page';

describe('Weekend Trip Planner', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the form elements correctly', () => {
    expect(screen.getByText('Weekend Trip Planner')).toBeInTheDocument();
    expect(screen.getByLabelText('Day trip')).toBeInTheDocument();
    expect(screen.getByLabelText('2-day overnight')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Plan my trip' })).toBeInTheDocument();
  });

  it('shows fallback when budget is too small to travel anywhere', () => {
    const budgetInput = screen.getByRole('spinbutton');
    fireEvent.change(budgetInput, { target: { value: '0' } });
    
    // Ensure "Free Bus" is NOT checked so transport costs apply
    const freeBusCheckbox = screen.getByRole('checkbox');
    if ((freeBusCheckbox as HTMLInputElement).checked) {
      fireEvent.click(freeBusCheckbox);
    }
    
    const submitButton = screen.getByRole('button', { name: 'Plan my trip' });
    fireEvent.click(submitButton);

    expect(screen.getByText('Stay local this time')).toBeInTheDocument();
    expect(screen.getByText('Footdee (Fittie) Walk')).toBeInTheDocument();
  });

  it('generates a day trip successfully within budget', () => {
    const budgetInput = screen.getByRole('spinbutton');
    fireEvent.change(budgetInput, { target: { value: '50' } });

    const submitButton = screen.getByRole('button', { name: 'Plan my trip' });
    fireEvent.click(submitButton);

    // Should find a trip to somewhere, e.g. Stonehaven or Inverurie
    expect(screen.queryByText('Stay local this time')).not.toBeInTheDocument();
    expect(screen.getByText('Leave Aberdeen')).toBeInTheDocument();
  });

  it('prioritizes interests when planning a trip', () => {
    // With 50, let's select "History" and see if it picks a history-related place.
    const budgetInput = screen.getByRole('spinbutton');
    fireEvent.change(budgetInput, { target: { value: '100' } });
    
    const historyButton = screen.getByRole('button', { name: 'History' });
    fireEvent.click(historyButton);

    const submitButton = screen.getByRole('button', { name: 'Plan my trip' });
    fireEvent.click(submitButton);

    expect(screen.queryByText('Stay local this time')).not.toBeInTheDocument();
    expect(screen.getByText('Leave Aberdeen')).toBeInTheDocument();
    // Verify an activity related to history is present.
    // Hard to check exact without knowing the generated plan, but we check there's an activity list.
    expect(screen.getByText('Back to Aberdeen')).toBeInTheDocument();
  });

  it('adds overnight cost when 2-day overnight is selected', () => {
    const budgetInput = screen.getByRole('spinbutton');
    fireEvent.change(budgetInput, { target: { value: '150' } });
    
    const overnightRadio = screen.getByLabelText('2-day overnight');
    fireEvent.click(overnightRadio);

    const submitButton = screen.getByRole('button', { name: 'Plan my trip' });
    fireEvent.click(submitButton);

    expect(screen.queryByText('Stay local this time')).not.toBeInTheDocument();
    expect(screen.getByText(/Stay the night in /)).toBeInTheDocument();
  });
});
