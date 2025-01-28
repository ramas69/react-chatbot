import { forwardRef } from 'react';
import { Paper, Group, Stack, Text } from '@mantine/core';
import Avatar from '../../atoms/Avatar/Avatar';

interface MessageBubbleProps {
  type: 'user' | 'agent';
  message: string;
  timestamp: string;
  'data-testid'?: string;
}

const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ type, message, timestamp, 'data-testid': dataTestId = 'message-bubble' }, ref) => {
    const isUser = type === 'user';

    return (
      <Group 
        justify={isUser ? 'flex-end' : 'flex-start'} 
        align="flex-start" 
        ref={ref}
        data-testid={dataTestId}
      >
        {!isUser && (
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant"
            alt="Assistant Avatar"
          />
        )}
        
        <Stack gap="xs" style={{ maxWidth: '70%' }}>
          <Paper
            p="sm"
            radius="lg"
            bg={isUser ? 'blue.6' : 'gray.1'}
            c={isUser ? 'white' : 'dark'}
            withBorder={!isUser}
          >
            {message}
          </Paper>
          <Text size="xs" c="dimmed" ta={isUser ? 'right' : 'left'}>
            {timestamp}
          </Text>
        </Stack>

        {isUser && (
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            alt="User Avatar"
          />
        )}
      </Group>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;