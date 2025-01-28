import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mantine/core';
import ChatTemplate from '../../templates/ChatTemplate/ChatTemplate';
import { useChat } from '../../../contexts/ChatContext';

const ChatPage = () => {
  const { messages, inputValue, isLoading, setInputValue, sendMessage, clearHistory } = useChat();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="absolute top-4 right-4 z-10">
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
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatPage;