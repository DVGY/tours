import React, { FC, useState } from 'react';
import {
  Box,
  Avatar,
  Flex,
  Text,
  Stack,
  FormControl,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { ImUser } from 'react-icons/im';
import { EmailIcon, LockIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

const UserSecurity: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onChange = () => {
    console.log('object');
  };
  const onSubmit = () => {
    console.log('');
  };
  const handleShowClick = () => {
    console.log('');
  };
  return (
    <Flex p='3' flexDirection='column'>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} p='1rem' backgroundColor='white'>
          <Text>Update Password </Text>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <LockIcon color='black' />
              </InputLeftElement>
              <Input
                type='password'
                placeholder='Enter Current Password'
                name='currentPassword'
                // value={username}
                onChange={onChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                  {showPassword ? (
                    <ViewOffIcon color='black' />
                  ) : (
                    <ViewIcon color='black' />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents='none' color='gray.300'>
                <LockIcon color='black' />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='New Password'
                name='password'
                // value={password}
                onChange={onChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                  {showPassword ? (
                    <ViewOffIcon color='black' />
                  ) : (
                    <ViewIcon color='black' />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text color='black' fontSize='xs'>
              Password length should be more than 8
            </Text>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents='none' color='gray.300'>
                <LockIcon color='black' />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirm New Password'
                name='password'
                // value={password}
                onChange={onChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                  {showPassword ? (
                    <ViewOffIcon color='black' />
                  ) : (
                    <ViewIcon color='black' />
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
            Update Password
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default UserSecurity;
