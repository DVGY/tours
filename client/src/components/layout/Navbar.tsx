import { ReactNode } from 'react';
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
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useActionsBind } from '../../hooks/useActionsBind';
import { OrganisationSVG } from '../svgs/OrganisationSVG';

const Links = [
  { name: 'Dashboard', toLink: '/dashboard' },

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
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const NavLink = ({ children, toLink, isOpen, onClose, onOpen }: INavLink) => (
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
    onClick={isOpen ? onClose : onOpen}
  >
    <Text fontSize={['lg', 'lg', 'lg', 'xl', '2xl', '2xl']}>{children}</Text>
  </ChakraLink>
);

export default function Navbar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logoutUser } = useActionsBind();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const avatarSize = useBreakpointValue({
    base: 'sm',
    md: 'sm',
    lg: 'md',
    '2xl': 'lg',
  });

  const handleLogout = async (): Promise<void> => {
    await logoutUser();
    return navigate('/login');
  };

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={[4, 4, 4, 6, 8, 8]}
        mx='auto'
        position='fixed'
        left={0}
        right={0}
        top={0}
        zIndex={3}
      >
        <Flex
          h={[16, 16, 16, 20, 28, 28]}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <IconButton
            size='lg'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={[8, 8, 8, 10, 12, 14]} alignItems={'center'}>
            <Box>
              <Link to='/'>
                <Icon
                  as={OrganisationSVG}
                  w={{ base: 7, sm: 7, md: 8, lg: 10, xl: 14, '2xl': 16 }}
                  h={{ base: 7, sm: 7, md: 8, lg: 10, xl: 14, '2xl': 16 }}
                />
              </Link>
            </Box>
            <IconButton
              as='a'
              href='https://github.com/DVGY/tours'
              target='_blank'
              aria-label='GitHub'
              icon={<FaGithub fontSize='25px' />}
            />

            <HStack
              as={'nav'}
              spacing={[4, 4, 4, 6, 6, 8]}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(({ name, toLink }) => (
                <NavLink
                  key={name}
                  toLink={toLink}
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                >
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
                {isAuthenticated
                  ? null
                  : AuthLinks.map(({ name, toLink }) => (
                      <NavLink
                        key={name}
                        toLink={toLink}
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpen={onOpen}
                      >
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
                    // size={{base:'sm'}}
                    size={avatarSize}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                ></MenuButton>
                <MenuList>
                  <Link to='/user/profile'>
                    <MenuItem fontSize={['md', 'md', 'md', 'lg', 'lg', 'lg']}>
                      Profile
                    </MenuItem>
                  </Link>
                  <Link to='/user/security'>
                    <MenuItem fontSize={['md', 'md', 'md', 'lg', 'lg', 'lg']}>
                      Security
                    </MenuItem>
                  </Link>
                  <Link to='/user/settings'>
                    <MenuItem fontSize={['md', 'md', 'md', 'lg', 'lg', 'lg']}>
                      Settings
                    </MenuItem>
                  </Link>
                  <Link to='/user/bookings'>
                    <MenuItem fontSize={['md', 'md', 'md', 'lg', 'lg', 'lg']}>
                      Bookings
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem
                    fontSize={['md', 'md', 'md', 'lg', 'lg', 'lg']}
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }} zIndex={3}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ name, toLink }) => (
                <NavLink
                  key={name}
                  toLink={toLink}
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                >
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {isAuthenticated
                ? null
                : AuthLinks.map(({ name, toLink }) => (
                    <NavLink
                      key={name}
                      toLink={toLink}
                      isOpen={isOpen}
                      onClose={onClose}
                      onOpen={onOpen}
                    >
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
