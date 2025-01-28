import { useState } from 'react'
import './App.css'

import ChatTemplate from './components/templates/ChatTemplate/ChatTemplate';

type Message = {
  id: string;
  content: string;
  type: 'user' | 'agent';
  timestamp: string;
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
      type: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    // message utilisateur
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // simule la réponse de l'agent
    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        content: "Je comprends. Comment puis-je vous aider davantage?",
        type: 'agent' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ChatTemplate
      messages={messages}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSend={handleSend}
      isLoading={isLoading}
    />
  );
}

export default App;
