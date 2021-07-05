import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChakraLink,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import { ReactComponent as OrganisationLogo } from '../assets/tour-bus.svg';
import Loading from './app-state/Loading';

import useAuth from '../hooks/useAuth';
import { useActionsBind } from '../hooks/useActionsBind';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Links = [
  { name: 'Dashboard', toLink: '/dashboard' },
  { name: 'Projects', toLink: '/projects' },
  { name: 'Team', toLink: '/team' },
  { name: 'Trips', toLink: '/trips' },
];
const AuthLinks = [
  { name: 'Login', toLink: '/login' },
  { name: 'Signup', toLink: '/signup' },
];

interface INavLink {
  children: ReactNode;
  toLink: string;
  key: string;
}

const NavLink = ({ children, toLink }: INavLink) => (
  <ChakraLink
    as={Link}
    to={toLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </ChakraLink>
);

export default function Navbar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logoutUser } = useActionsBind();
  const { loading } = useTypedSelector((reduxStore) => reduxStore.auth);
  const { isAuthenticated } = useAuth();
  const histoy = useHistory();

  const handleLogout = async (): Promise<void> => {
    await logoutUser();
    return histoy.push('/login');
  };

  if (loading) {
    <Loading />;
  }

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        mx='auto'
        position='fixed'
        left={0}
        right={0}
        top={0}
        zIndex={1}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size='lg'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link to='/'>
                <Icon
                  as={OrganisationLogo}
                  w={{ base: 7, sm: 7, md: 8, lg: 10 }}
                  h={{ base: 7, sm: 7, md: 8, lg: 10 }}
                />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(({ name, toLink }) => (
                <NavLink key={name} toLink={toLink}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <HStack spacing={8} alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {AuthLinks.map(({ name, toLink }) => (
                  <NavLink key={name} toLink={toLink}>
                    {name}
                  </NavLink>
                ))}
              </HStack>
            </HStack>

            {isAuthenticated && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                >
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ name, toLink }) => (
                <NavLink key={name} toLink={toLink}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {AuthLinks.map(({ name, toLink }) => (
                <NavLink key={name} toLink={toLink}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
