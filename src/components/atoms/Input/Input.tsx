import { forwardRef } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, placeholder = 'Type a message...', disabled = false, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
        aria-label="Chat message input"
        data-testid="chat-input"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;