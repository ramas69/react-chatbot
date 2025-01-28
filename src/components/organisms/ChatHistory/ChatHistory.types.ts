import { Message } from '../../../types/chat.types';

export interface ChatHistoryProps {
  messages: Message[];
  isLoading?: boolean;
  'data-testid'?: string;
} 