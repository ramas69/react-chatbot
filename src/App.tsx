import { useState } from 'react'
import { Paper, ScrollArea } from '@mantine/core'

import './App.css'
import Input from './components/atoms/Input/Input';
import Button from './components/atoms/Button/Button';
import Avatar from './components/atoms/Avatar/Avatar';
import Text from './components/atoms/Text/Text';
import MessageBubble from './components/molecules/MessageBubble/MessageBubble';
function App() {
  const [inputValue, setInputValue] = useState('');



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-md space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="space-y-6 mb-4">
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
          <Avatar src="https://github.com/joaovitor.png" alt="User Avatar" />
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
