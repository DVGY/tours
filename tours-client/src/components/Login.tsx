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
  const buttonSize = useBreakpointValue({
    base: 'sm',
    md: 'sm',
    lg: 'lg',
  });

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
      width='100%'
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
                Login
              </Text>
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
                    type='email'
                    placeholder='email address'
                    name='email'
                    value={email}
                    fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    name='password'
                    value={password}
                    fontSize={['xs', 'xs', 'xs', 'md', 'xl', '2xl']}
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
                LOGIN
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
                <ReactRouterLink to='/signup'>
                  <Text
                    as='u'
                    color='teal.400'
                    fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
                  >
                    Sign Up{' '}
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
                onClick={() =>
                  setFormData({
                    email: 'guest-session@gmail.com',
                    password: 'guest1234',
                  })
                }
                variant='solid'
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

export default Login;
