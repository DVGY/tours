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
import { Link as ReactRouterLink } from 'react-router-dom';

import { useActionsBind } from '../hooks/useActionsBind';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleShowClick = () => setShowPassword(!showPassword);

  const { loginUser } = useActionsBind();

  const { data, error, loading } = useTypedSelector(
    (reduxStore) => reduxStore.auth
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    setformData({
      ...formData,
      [key]: event.target.value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submitting');
    loginUser(email, password);
  };

  console.log(data, error, loading);

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
              <Text fontSize='3xl' color='gray.300'>
                Login
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='gray.300' />
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
                    <LockIcon color='gray.300' />
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
                        <ViewOffIcon color='gray.300' />
                      ) : (
                        <ViewIcon color='gray.300' />
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
                <ReactRouterLink to='/forgotPassword'>
                  <Text fontSize='xs'>Forgot password? </Text>
                </ReactRouterLink>
                <ReactRouterLink to='/signup'>
                  <Text fontSize='xs'>Sign Up </Text>
                </ReactRouterLink>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
