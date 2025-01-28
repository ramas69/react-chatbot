import { Message } from '../../../types/chat.types';

export interface ChatTemplateProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClear: () => void;
  isLoading?: boolean;
  'data-testid'?: string;
} 