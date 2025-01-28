import { forwardRef } from 'react';
import { Paper, Group, Stack, Text } from '@mantine/core';
import Avatar from '../../atoms/Avatar/Avatar';
import { motion } from 'framer-motion';
import { MessageBubbleProps } from './MessageBubble.types';


const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ type, message, timestamp, 'data-testid': dataTestId = 'message-bubble' }, ref) => {
    const isUser = type === 'user';

    // Options pour l'avatar utilisateur :
    const userAvatarOptions = [
      "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=b6e3f4",                    // Style aventurier
      "https://api.dicebear.com/7.x/big-ears-neutral/svg?seed=Felix&backgroundColor=b6e3f4",             // Style moderne
      "https://api.dicebear.com/7.x/miniavs/svg?seed=Felix&backgroundColor=b6e3f4",                      // Style minimaliste
      "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Felix",                                           // Style emoji
      "https://api.dicebear.com/7.x/personas/svg?seed=Felix&backgroundColor=b6e3f4"                      // Style persona
    ];

    // Choisissez l'option que vous préférez en changeant l'index (0-4)
    const selectedUserAvatar = userAvatarOptions[2];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Group 
          justify={isUser ? 'flex-end' : 'flex-start'} 
          align="flex-start" 
          ref={ref}
          data-testid={dataTestId}
        >
          {!isUser && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Avatar
                src="https://robohash.org/assistant?set=set1&size=150x150&bgset=bg1"
                alt="Assistant Avatar"
                size="md"
                styles={(theme) => ({
                  root: {
                    border: `2px solid ${theme.colors.cyan[5]}`,
                    background: theme.colors.cyan[1],
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.2s ease'
                    }
                  }
                })}
              />
            </motion.div>
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Avatar
                src={selectedUserAvatar}
                alt="User Avatar"
                size="md"
                styles={(theme) => ({
                  root: {
                    border: `2px solid ${theme.colors.blue[5]}`,
                    background: theme.colors.blue[1],
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.2s ease'
                    }
                  }
                })}
              />
            </motion.div>
          )}
        </Group>
      </motion.div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;