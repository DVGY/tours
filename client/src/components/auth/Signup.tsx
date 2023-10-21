import React from 'react';
import { useState } from 'react';
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  Text,
  InputRightElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, LockIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Link as ReactRouterLink,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

// type LocationState = {
//   from: {
//     pathname: string;
//   };
// };

import { useActionsBind } from '../../hooks/useActionsBind';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Signup = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [isGuestLogin, setIsGuestLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { loginUser, signupUser } = useActionsBind();
  const { loading } = useTypedSelector((reduxStore) => reduxStore.auth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const buttonSize = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
  });

  const { username, email, password, passwordConfirm } = formData;

  const handleShowClick = () => setShowPassword(!showPassword);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    isGuestLogin
      ? await loginUser(email, password)
      : await signupUser(username, email, password, passwordConfirm);

    const redirectTo = state ? state.from.pathname : state;

    if (redirectTo && !loading) {
      return navigate(redirectTo);
    }

    return navigate('/trips');
  };

  return (
    <Flex
      flexDirection='column'
      height='100vh'
      backgroundColor='gray.200'
      justifyContent='start'
      alignItems='center'
      marginTop={[16, 16, 16, 20, 20, 20]}
      py={4}
    >
      <Stack flexDir='column' mb='2' mt={24}>
        <Box>
          <form onSubmit={onSubmit}>
            <Stack
              spacing={4}
              px={[4, 4, 4, 6, 6, 6]}
              py={[4, 4, 4, 6, 6, 6]}
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <Text
                fontSize={['3xl', '3xl', '3xl', '3xl', '4xl', '4xl']}
                textAlign='center'
                color='teal.400'
              >
                Sign Up
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    top={'50%'}
                    transform={'translate(0%,-50%)'}
                    pointerEvents='none'
                  >
                    <FiUser stroke='#38B2AC' fill='#38B2AC' />
                  </InputLeftElement>
                  <Input
                    py={[4, 4, 4, 6, 6, 8]}
                    fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                    type='text'
                    name='username'
                    value={username}
                    placeholder='Your Name'
                    onChange={onChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    top={'50%'}
                    transform={'translate(0%,-50%)'}
                    pointerEvents='none'
                  >
                    <EmailIcon
                      fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                      color='teal.400'
                    />
                  </InputLeftElement>
                  <Input
                    py={[4, 4, 4, 6, 6, 8]}
                    fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                    type='email'
                    name='email'
                    value={email}
                    placeholder='email address'
                    onChange={onChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    top={'50%'}
                    transform={'translate(0%,-50%)'}
                    pointerEvents='none'
                    color='gray.300'
                  >
                    <LockIcon
                      fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                      color='teal.400'
                    />
                  </InputLeftElement>
                  <Input
                    py={[4, 4, 4, 6, 6, 8]}
                    fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={onChange}
                  />
                  <InputRightElement
                    top={'50%'}
                    transform={'translate(0%,-50%)'}
                    width='4.5rem'
                  >
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? (
                        <ViewOffIcon
                          fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                          color='teal.400'
                        />
                      ) : (
                        <ViewIcon
                          fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                          color='teal.400'
                        />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    top={'50%'}
                    transform={'translate(0%,-50%)'}
                    pointerEvents='none'
                    color='gray.300'
                  >
                    <LockIcon
                      fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                      color='teal.400'
                    />
                  </InputLeftElement>
                  <Input
                    py={[4, 4, 4, 6, 6, 8]}
                    fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    name='passwordConfirm'
                    value={passwordConfirm}
                    onChange={onChange}
                  />
                  <InputRightElement
                    top={'50%'}
                    transform={'translate(0%,-50%)'}
                    width='4.5rem'
                  >
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? (
                        <ViewOffIcon
                          fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                          color='teal.400'
                        />
                      ) : (
                        <ViewIcon
                          fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                          color='teal.400'
                        />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
                size={buttonSize}
              >
                SIGN UP
              </Button>
              <Flex justifyContent='space-between' alignContent='space-between'>
                <ReactRouterLink to='/forgot-password'>
                  <Text
                    as='u'
                    color='teal.400'
                    fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
                  >
                    Forgot password?{' '}
                  </Text>
                </ReactRouterLink>
                <ReactRouterLink to='/login'>
                  <Text
                    as='u'
                    color='teal.400'
                    fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
                  >
                    Login
                  </Text>
                </ReactRouterLink>
              </Flex>
              <Flex justifyContent='center' alignContent='space-between'>
                <Text
                  textAlign='center'
                  fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
                >
                  Or
                </Text>
              </Flex>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                onClick={() => {
                  setIsGuestLogin(true);
                  setFormData({
                    ...formData,
                    email: 'guest-session@gmail.com',
                    password: 'guest1234',
                  });
                }}
                colorScheme='teal'
                width='full'
                size={buttonSize}
              >
                GUEST LOGIN
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
