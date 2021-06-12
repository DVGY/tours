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
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, LockIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Link as ReactRouterLink,
  useHistory,
  useLocation,
} from 'react-router-dom';

type LocationState = {
  from: {
    pathname: string;
  };
};

import { useActionsBind } from '../hooks/useActionsBind';
import { useTypedSelector } from '../hooks/useTypedSelector';

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
  const { state } = useLocation<LocationState>();
  const histoy = useHistory();

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
      return histoy.push(redirectTo);
    }

    return histoy.push('/trips');
  };

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
      justifyContent='start'
      alignItems='center'
      py={4}
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Box maxW={{ base: '95%', sm: '90%', md: '500px' }}>
          <form onSubmit={onSubmit}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <Text fontSize='3xl' color='teal.400'>
                Sign Up
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='teal.400' />
                  </InputLeftElement>
                  <Input
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
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='teal.400' />
                  </InputLeftElement>
                  <Input
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
                  <InputLeftElement pointerEvents='none' color='gray.300'>
                    <LockIcon color='teal.400' />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={onChange}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? (
                        <ViewOffIcon color='teal.400' />
                      ) : (
                        <ViewIcon color='teal.400' />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300'>
                    <LockIcon color='teal.400' />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    name='passwordConfirm'
                    value={passwordConfirm}
                    onChange={onChange}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? (
                        <ViewOffIcon color='teal.400' />
                      ) : (
                        <ViewIcon color='teal.400' />
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
              >
                SIGN UP
              </Button>
              <Flex justifyContent='space-between' alignContent='space-between'>
                <ReactRouterLink to='/forgotPassword'>
                  <Text fontSize='xs'>Forgot password? </Text>
                </ReactRouterLink>
                <ReactRouterLink to='/login'>
                  <Text fontSize='xs'>Login</Text>
                </ReactRouterLink>
              </Flex>
              <Flex justifyContent='center' alignContent='space-between'>
                <Text textAlign='center' fontSize='xs'>
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
