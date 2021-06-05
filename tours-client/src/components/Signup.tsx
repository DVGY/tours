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
  Link,
  FormControl,
  Text,
  InputRightElement,
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, LockIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

const Signup = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

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
          <form>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <Text fontSize='3xl' color='gray.300'>
                Sign Up
              </Text>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='gray.300' />
                  </InputLeftElement>
                  <Input type='email' placeholder='email address' />
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
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300'>
                    <LockIcon color='gray.300' />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
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
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
