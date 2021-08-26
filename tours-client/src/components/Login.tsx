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
  useLocation,
  useHistory,
} from 'react-router-dom';

import { useActionsBind } from '../hooks/useActionsBind';
import { useTypedSelector } from '../hooks/useTypedSelector';

type LocationState = {
  from: {
    pathname: string;
  };
};

const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { loginUser } = useActionsBind();
  const { loading, error } = useTypedSelector((reduxStore) => reduxStore.auth);
  const { state } = useLocation<LocationState>();
  const histoy = useHistory();

  const { email, password } = formData;

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
    await loginUser(email, password);

    const redirectTo = state ? state.from.pathname : state;

    if (redirectTo && !loading) {
      return histoy.push(redirectTo);
    }

    return histoy.push('/trips');
  };

  if (error) {
    console.log(error);
  }

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
        mt={24}
      >
        <Box maxW={{ base: '95%', sm: '90%', md: '500px' }}>
          <form onSubmit={onSubmit}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <Text
                fontSize={['xs', 'xs', 'xs', 'md', 'md', '3xl']}
                textAlign='center'
                color='teal.400'
              >
                Login
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='teal.400' />
                  </InputLeftElement>
                  <Input
                    type='email'
                    placeholder='email address'
                    name='email'
                    value={email}
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
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
              >
                LOGIN
              </Button>
              <Flex justifyContent='space-between' alignContent='space-between'>
                <ReactRouterLink to='/forgot-password'>
                  <Text as='u' color='teal.400' fontSize='xs'>
                    Forgot password?{' '}
                  </Text>
                </ReactRouterLink>
                <ReactRouterLink to='/signup'>
                  <Text as='u' color='teal.400' fontSize='xs'>
                    Sign Up{' '}
                  </Text>
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
                onClick={() =>
                  setFormData({
                    email: 'guest-session@gmail.com',
                    password: 'guest1234',
                  })
                }
                variant='solid'
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

export default Login;
