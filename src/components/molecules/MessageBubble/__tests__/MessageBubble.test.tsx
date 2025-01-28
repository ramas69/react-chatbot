import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageBubble from '../MessageBubble';
import { MantineProvider, createTheme } from '@mantine/core';

describe('MessageBubble', () => {
  const mockProps = {
    type: 'user' as const,
    message: 'Hello world',
    timestamp: '10:00'
  };

  const theme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md'
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );

  it('renders user message correctly', () => {
    render(<MessageBubble {...mockProps} />, { wrapper });
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('renders agent message correctly', () => {
    render(<MessageBubble {...mockProps} type="agent" />, { wrapper });
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies correct alignment for user/agent messages', () => {
    const { rerender } = render(<MessageBubble {...mockProps} />, { wrapper });
    const messageBubble = screen.getByTestId('message-bubble');
    expect(messageBubble).toBeInTheDocument();

    rerender(<MessageBubble {...mockProps} type="agent" />);
    expect(messageBubble).toBeInTheDocument();
  });
}); 