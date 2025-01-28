import React, { useEffect, useRef } from 'react';
import MessageBubble from '../../molecules/MessageBubble/MessageBubble';
interface Message {
  id: string;
  content: string;
  type: 'user' | 'agent';
  timestamp: string;
}

interface ChatHistoryProps {
  messages: Message[];
  'data-testid'?: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
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
      </div>
    </div>
  );
};

export default ChatHistory;