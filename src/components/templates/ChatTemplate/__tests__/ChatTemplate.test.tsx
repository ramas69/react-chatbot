import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatTemplate from '../ChatTemplate';
import { MantineProvider, createTheme } from '@mantine/core';

describe('ChatTemplate', () => {
  const mockProps = {
    messages: [],
    inputValue: 'Test message',
    onInputChange: vi.fn(),
    onSend: vi.fn(),
    onClear: vi.fn(),
    isLoading: false
  };

  const theme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md'
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MantineProvider theme={theme}>{children}</MantineProvider>
  );

  it('handles message sending', () => {
    render(<ChatTemplate {...mockProps} />, { wrapper });
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    const sendButton = screen.getByTestId('button');
    fireEvent.click(sendButton);
    
    expect(mockProps.onSend).toHaveBeenCalled();
  });
}); 