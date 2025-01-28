import { useState } from 'react'

import './App.css'
import Input from './components/atoms/Input/Input';
import Button from './components/atoms/Button/Button';

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
        <div className="flex gap-2">
        <Input 
          value={inputValue}
          onChange={setInputValue}
          placeholder="Type something..."
        />
          <Button 
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            data-testid="send-button"
          >
            Send
          </Button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
