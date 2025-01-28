import { forwardRef, useEffect, useRef } from 'react';
import { Paper, Group, Title, Text } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import ChatHistory from '../../organisms/ChatHistory/ChatHistory';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Avatar from '../../atoms/Avatar/Avatar';

interface ChatTemplateProps {
  messages: Array<{
    id: string;
    content: string;
    type: 'user' | 'agent';
    timestamp: string;
  }>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  'data-testid'?: string;
}

const ChatTemplate = forwardRef<HTMLDivElement, ChatTemplateProps>(
  ({ messages, inputValue, onInputChange, onSend, isLoading = false, 'data-testid': dataTestId = 'chat-template' }, ref) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (inputValue.trim()) {
          onSend();
        }
      }
    };

    return (
      <div className="h-screen w-full overflow-hidden" data-testid={dataTestId} ref={ref}>
        <Paper shadow="md" radius={0} className="flex flex-col h-full">
          <Group p="md" className="border-b border-gray-200 bg-white shrink-0">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant"
              alt="Assistant"
              size="md"
            />
            <div className="min-w-0">
              <Title order={5} className="truncate">AI Assistant</Title>
              <Text size="sm" c="dimmed">Online</Text>
            </div>
          </Group>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-4 max-w-3xl mx-auto">
              <ChatHistory messages={messages} />
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4 shrink-0">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
              <Input
                value={inputValue}
                onChange={onInputChange}
                placeholder="Type your message..."
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                size="md"
                radius="xl"
                className="w-[80%]"
                autoFocus
              />
              <Button 
                onClick={onSend}
                disabled={isLoading || !inputValue.trim()}
                loading={isLoading}
                size="md"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                className="w-[20%]"
              >
                <IconSend size={20} />
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
);

ChatTemplate.displayName = 'ChatTemplate';

export default ChatTemplate;