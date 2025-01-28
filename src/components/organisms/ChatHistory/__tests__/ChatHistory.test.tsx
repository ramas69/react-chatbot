import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatHistory from '../ChatHistory';
import { MantineProvider, createTheme } from '@mantine/core';

describe('ChatHistory', () => {
  const mockMessages = [
    {
      id: '1',
      content: 'Hello',
      type: 'user' as const,
      timestamp: '10:00'
    },
    {
      id: '2',
      content: 'Hi there!',
      type: 'agent' as const,
      timestamp: '10:01'
    }
  ];

  // Mock scrollTo
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  const theme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md'
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );

  it('renders empty state when no messages', () => {
    render(<ChatHistory messages={[]} />, { wrapper });
    expect(screen.getByText('Commencez une conversation...')).toBeInTheDocument();
  });

  it('renders all messages', () => {
    render(<ChatHistory messages={mockMessages} />, { wrapper });
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<ChatHistory messages={mockMessages} isLoading={true} />, { wrapper });
    const loadingDots = screen.getByRole('status');
    expect(loadingDots).toBeInTheDocument();
  });
}); 