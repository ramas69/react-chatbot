import React from 'react';
import Avatar from '../../atoms/Avatar/Avatar';
import Text from '../../atoms/Text/Text';

interface MessageBubbleProps {
  message: string;
  type: 'user' | 'agent';
  timestamp?: string;
  'data-testid'?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  type,
  timestamp,
  'data-testid': dataTestId = 'message-bubble'
}) => {
  const isUser = type === 'user';

  return (
    <div
      data-testid={dataTestId}
      className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Avatar
        radius="xl"
        color={isUser ? 'blue' : 'gray'}
        data-testid={`${dataTestId}-avatar`}
      />
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <Text variant={type} data-testid={`${dataTestId}-text`}>
          {message}
        </Text>
        {timestamp && (
          <span className="text-xs text-gray-400 mt-1" data-testid={`${dataTestId}-timestamp`}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;