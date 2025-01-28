import { createContext, useContext, ReactNode, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { notifications } from '@mantine/notifications';
import { getChatResponse } from '../services/ChatService';
import { Message, ChatContextType } from '../types/chat.types';



const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { value: messages = [], setValue: setMessages, clearStorage } = useLocalStorage<Message[]>('chat_history', []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearHistory = () => {
    clearStorage();
    setMessages([]);  
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      type: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(userMessage.content);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: 'Impossible de générer une réponse.',
        color: 'red'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      inputValue, 
      isLoading, 
      setInputValue, 
      sendMessage, 
      clearHistory 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 