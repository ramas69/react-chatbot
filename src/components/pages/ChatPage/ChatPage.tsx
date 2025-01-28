import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import ChatTemplate from '../../templates/ChatTemplate/ChatTemplate';
import { getChatResponse } from '../../../services/ChatService';
import { useLocalStorage } from '../../../hooks/useLocalStorage';


type Message = {
  id: string;
  content: string;
  type: 'user' | 'agent';
  timestamp: string;
};

const STORAGE_KEY = 'chat_history';

const ChatPage = () => {
  const { value: messages, setValue: setMessages, clearStorage: clearHistory } = useLocalStorage<Message[]>(STORAGE_KEY);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      type: 'user',
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(userMessage.content);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: 'agent',
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setMessages((prev: Message[]) => [...prev, agentMessage]);
    } catch (error) {
      notifications.show({
        title: 'Erreur',
        message: 'Impossible de générer une réponse.',
        color: 'red'
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, setMessages]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="absolute top-4 right-4 z-10 flex gap-4 items-center">
          <Button
            onClick={clearHistory}
            variant="light"
            color="red"
            disabled={isLoading || messages.length === 0}
          >
            Effacer l'historique
          </Button>
        </div>

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