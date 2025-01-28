export type MessageType = 'user' | 'agent';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: string;
}

export interface ChatContextType {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  setInputValue: (value: string) => void;
  sendMessage: () => Promise<void>;
  clearHistory: () => void;
} 