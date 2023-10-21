import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const SocialMediaLinks: React.FC<ButtonGroupProps> = (props) => (
  <ButtonGroup variant='ghost' color='gray.600' {...props}>
    <IconButton
      as='a'
      href='#'
      aria-label='LinkedIn'
      icon={<FaLinkedin fontSize='20px' />}
    />
    <IconButton
      as='a'
      href='https://github.com/DVGY/tours'
      target='_blank'
      aria-label='GitHub'
      icon={<FaGithub fontSize='20px' />}
    />
    <IconButton
      as='a'
      href='#'
      aria-label='Twitter'
      icon={<FaTwitter fontSize='20px' />}
    />
  </ButtonGroup>
);
