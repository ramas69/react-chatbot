import { useState } from 'react'
import './App.css'

import ChatTemplate from './components/templates/ChatTemplate/ChatTemplate';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      type: 'agent' as const,
      timestamp: '10:00 AM'
    },
    {
      id: '2',
      content: 'Hi! I have a question about the service.',
      type: 'user' as const,
      timestamp: '10:01 AM'
    },
    {
      id: '3',
      content: "Of course! I'd be happy to help. What would you like to know?",
      type: 'agent' as const,
      timestamp: '10:02 AM'
    }
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your request...",
        type: 'agent' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <ChatTemplate
      messages={messages}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSend={handleSend}
      data-testid="chat-app"
    />
  );
}

export default App;
