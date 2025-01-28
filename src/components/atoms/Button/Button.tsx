import { forwardRef } from 'react';
import { Button as MantineButton } from '@mantine/core';
import { ButtonProps } from './Button.types';

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