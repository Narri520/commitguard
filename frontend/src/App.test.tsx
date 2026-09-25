import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('CommitGuard Frontend Component Suite', () => {
  it('renders CommitGuard landing page title', () => {
    render(<App />);
    const heading = screen.getByText(/Your commitments deserve/i);
    expect(heading).toBeDefined();
  });
});
