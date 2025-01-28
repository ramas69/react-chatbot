import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatTemplate from '../../templates/ChatTemplate/ChatTemplate';
const agentResponses = {
  greeting: [
    "Bonjour! Comment puis-je vous aider aujourd'hui?",
    "Salut! Je suis là pour répondre à vos questions.",
    "Bonjour! En quoi puis-je vous être utile?"
  ],
  default: [
    "Je comprends. Pouvez-vous me donner plus de détails?",
    "Intéressant. Que souhaitez-vous savoir de plus?",
    "Je peux vous aider avec ça. Que voulez-vous savoir exactement?"
  ],
  farewell: [
    "Au revoir! N'hésitez pas si vous avez d'autres questions.",
    "Merci de votre visite! Passez une excellente journée!",
    "Au revoir! J'espère avoir pu vous aider."
  ]
};

const getRandomResponse = (type: keyof typeof agentResponses) => {
  const responses = agentResponses[type];
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    type: 'user' | 'agent';
    timestamp: string;
  }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateAgentResponse = useCallback((userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    let responseType: keyof typeof agentResponses = 'default';

    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
      responseType = 'greeting';
    } else if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye')) {
      responseType = 'farewell';
    }

    return getRandomResponse(responseType);
  }, []);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      type: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // simule le délai de réponse de l'agent
    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAgentResponse(userMessage.content),
        type: 'agent' as const,
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, Math.random() * 1000 + 500); 
  }, [inputValue, isLoading, generateAgentResponse]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <ChatTemplate
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatPage;