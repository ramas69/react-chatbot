import { useState } from 'react'

import './App.css'
import Input from './components/atoms/Input/Input';
import Button from './components/atoms/Button/Button';
import Avatar from './components/atoms/Avatar/Avatar';
import Text from './components/atoms/Text/Text';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow">
        <div className="space-y-4">
            <Text variant="agent">
              Hello! How can I help you today?
            </Text>
            
            <Text variant="user">
              Hi! I have a question about the service.
            </Text>
            
            <Text variant="agent">
              Of course! I'd be happy to help. What would you like to know?
            </Text>
          </div>
          <Avatar radius="xl" color="blue" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">User</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input 
            value={inputValue}
            onChange={setInputValue}
            placeholder="Type something..."
          />
          <Button onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
