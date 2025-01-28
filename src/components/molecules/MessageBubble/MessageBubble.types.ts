import { Message } from '../../../types/chat.types';

export interface MessageBubbleProps {
  type: Message['type'];
  message: string;
  timestamp: string;
  'data-testid'?: string;
} 