import { forwardRef } from 'react';
import { Avatar as MantineAvatar, AvatarProps as MantineAvatarProps } from '@mantine/core';

interface AvatarProps extends Omit<MantineAvatarProps, 'src'> {
  src?: string;
  alt?: string;
  'data-testid'?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    src, 
    alt = 'Avatar', 
    'data-testid': dataTestId = 'avatar',
    ...props 
  }, ref) => {
    return (
      <MantineAvatar
        ref={ref}
        src={src}
        alt={alt}
        data-testid={dataTestId}
        radius="xl"
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;