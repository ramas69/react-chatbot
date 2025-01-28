import { forwardRef } from 'react';
import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';

interface TextProps extends Omit<MantineTextProps, 'children'> {
  children: React.ReactNode;
  'data-testid'?: string;
  variant?: 'user' | 'agent' | 'default';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ 
    children, 
    'data-testid': dataTestId = 'text',
    variant = 'default',
    className,
    ...props 
  }, ref) => {
    const variantStyles = {
      user: 'bg-blue-500 text-white rounded-lg py-2 px-3 max-w-[80%] ml-auto',
      agent: 'bg-gray-100 text-gray-800 rounded-lg py-2 px-3 max-w-[80%]',
      default: ''
    } as const;

    return (
      <MantineText
        ref={ref}
        data-testid={dataTestId}
        className={`${variantStyles[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </MantineText>
    );
  }
);

Text.displayName = 'Text';

export default Text;