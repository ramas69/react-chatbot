import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ChatProvider, useChat } from '../ChatContext';
import { getChatResponse } from '../../services/ChatService';

vi.mock('../../services/ChatService', () => ({
  getChatResponse: vi.fn()
}));

describe('ChatContext', () => {
  it('sends message and updates state', async () => {
    vi.mocked(getChatResponse).mockResolvedValue('Test response');
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ChatProvider>{children}</ChatProvider>
    );

    const { result } = renderHook(() => useChat(), { wrapper });

    await act(async () => {
      result.current.setInputValue('Test message');
    });

    expect(result.current.inputValue).toBe('Test message');

    await act(async () => {
      await result.current.sendMessage();
    });

    // Vérifions que les messages sont ajoutés
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].content).toBe('Test message');
    expect(result.current.messages[1].content).toBe('Test response');
    expect(result.current.inputValue).toBe('');
  });

  it('clears history correctly', async () => {
    const { result } = renderHook(() => useChat(), { wrapper: ChatProvider });

    await act(async () => {
      result.current.setInputValue('Test message');
      await result.current.sendMessage();
      result.current.clearHistory();
    });

    expect(result.current.messages).toHaveLength(0);
  });
}); 