import { forwardRef } from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonProps extends Omit<MantineButtonProps, 'onClick'> {
  onClick?: () => void;
  'data-testid'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, 'data-testid': dataTestId = 'button', ...props }, ref) => {
    return (
      <MantineButton
        ref={ref}
        onClick={onClick}
        data-testid={dataTestId}
        {...props}
      >
        {children}
      </MantineButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;