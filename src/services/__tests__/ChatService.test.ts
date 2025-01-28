import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getChatResponse } from '../ChatService';

describe('ChatService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles greetings correctly', async () => {
    const response = await getChatResponse('bonjour');
    expect(response).toMatch(/Bonjour|Salut/);
  });

  it('handles farewells correctly', async () => {
    const response = await getChatResponse('au revoir');
    expect(response).toMatch(/Au revoir|Merci/);
  });

  it('handles empty messages', async () => {
    const response = await getChatResponse('');
    expect(response).toBeTruthy();
  });

  it('handles API errors gracefully', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));
    
    const response = await getChatResponse('test error');
    expect(response).toBeTruthy();
  });

  it('handles different greeting variations', async () => {
    const greetings = ['salut', 'hello','bonjour', 'hi', 'hey'];
    
    for (const greeting of greetings) {
      const response = await getChatResponse(greeting);
      expect(response).toMatch(/Bonjour|Salut/);
    }
  });
}); 