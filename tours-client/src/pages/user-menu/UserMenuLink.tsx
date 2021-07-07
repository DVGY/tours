import React, { ReactText } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChakraLink,
  Divider,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  FlexProps,
  Stack,
  Icon,
  Spacer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import { ImProfile } from 'react-icons/im';
import { MdSettings, MdSecurity } from 'react-icons/md';

const UserMenuLinks = [
  { name: 'Profile', toLink: '/user/profile', icon: ImProfile },
  { name: 'Security', toLink: '/user/security', icon: MdSecurity },
  { name: 'Settings', toLink: '/user/settings', icon: MdSettings },
];

const UserMenuLink: React.FC = () => {
  return (
    <Flex flexDirection='column'>
      {UserMenuLinks.map(({ name, toLink, icon }) => (
        <Link to={toLink} key={name}>
          <UserMenuLinkItem icon={icon}>{name}</UserMenuLinkItem>
          <Divider />
        </Link>
      ))}
    </Flex>
  );
};

interface UserMenuLinkItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const UserMenuLinkItem: React.FC<UserMenuLinkItemProps> = ({
  icon,
  children,
  ...rest
}) => {
  return (
    <Flex
      align='center'
      p='4'
      mx='4'
      borderRadius='lg'
      role='group'
      cursor='pointer'
      _hover={{
        bg: 'teal.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr='4'
          fontSize='16'
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default UserMenuLink;
