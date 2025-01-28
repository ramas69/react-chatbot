import { useState } from 'react'
import './App.css'
import Input from './components/atoms/Input/Input';
import Button from './components/atoms/Button/Button';

import Text from './components/atoms/Text/Text';
import MessageBubble from './components/molecules/MessageBubble/MessageBubble';
import ChatHistory from './components/organisms/ChatHistory/ChatHistory';



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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-md space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="space-y-6 mb-4">
        <ChatHistory messages={messages} />
          <MessageBubble
            type="agent"
            message="Hello! How can I help you today?"
            timestamp="10:00 AM"
          />
          
          <MessageBubble
            type="user"
            message="Hi! I have a question about the service."
            timestamp="10:01 AM"
          />
          
          <MessageBubble
            type="agent"
            message="Of course! I'd be happy to help. What would you like to know?"
            timestamp="10:02 AM"
          />
        </div>
        
        <div className="flex gap-2 pt-4">
     
          <Text variant="user">
            Hello! How can I help you today?
          </Text>

          <Input 
            value={inputValue}
            onChange={setInputValue}
            placeholder="Type something..."
          />
          <Button onClick={() => setInputValue('')}>
            Send
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
