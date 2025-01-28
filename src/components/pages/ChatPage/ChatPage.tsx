import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mantine/core';
import ChatTemplate from '../../templates/ChatTemplate/ChatTemplate';
import { useChat } from '../../../contexts/ChatContext';
import { notifications } from '@mantine/notifications';


const ChatPage = () => {
  const { messages, inputValue, isLoading, setInputValue, sendMessage, clearHistory } = useChat();

  const handleClear = () => {
    if (window.confirm('Voulez-vous vraiment effacer toute la conversation ?')) {
      clearHistory();
      notifications.show({
        title: 'Succès',
        message: 'La conversation a été effacée',
        color: 'green',
        autoClose: 2000,
        position: 'bottom-center' as const,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.green[1],
            borderColor: theme.colors.green[6],
            
            '&::before': { backgroundColor: theme.colors.green[6] },
          },
          title: { color: theme.colors.green[9] },
          description: { color: theme.colors.green[9] },
          closeButton: {
            color: theme.colors.green[9],
            '&:hover': { backgroundColor: theme.colors.green[2] },
          },
        }),
      });
    }
  };

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
            onClick={handleClear}
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
          onClear={handleClear}
          isLoading={isLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatPage;