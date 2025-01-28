import React, { useEffect, useRef } from 'react';
import MessageBubble from '../../molecules/MessageBubble/MessageBubble';
import { motion } from 'framer-motion';

import { ChatHistoryProps } from './ChatHistory.types';


const LoadingDots = () => (
  <motion.div className="flex space-x-2 justify-center py-4">
    {[0, 1, 2].map((dot) => (
      <motion.div
        key={dot}
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: dot * 0.2
        }}
      />
    ))}
  </motion.div>
);

const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
  isLoading = false,
  'data-testid': dataTestId = 'chat-history'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      data-testid={dataTestId}
      className="h-[400px] overflow-y-auto rounded-lg bg-gray-50 custom-scrollbar"
    >
      <div className="p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            Commencez une conversation...
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              type={message.type}
              message={message.content}
              timestamp={message.timestamp}
              data-testid={`message-${message.id}`}
            />
          ))
        )}
        {isLoading && <LoadingDots />}
      </div>
    </div>
  );
};

export default ChatHistory;