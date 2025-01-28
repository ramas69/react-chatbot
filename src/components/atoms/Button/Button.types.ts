import { ButtonProps as MantineButtonProps } from '@mantine/core';

export interface ButtonProps extends Omit<MantineButtonProps, 'onClick'> {
  onClick?: () => void;
  'data-testid'?: string;
} 