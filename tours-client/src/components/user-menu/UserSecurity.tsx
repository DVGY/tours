import React, { FC, useState } from 'react';
import {
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

import { LockIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import Axios from '../../utils/Axios';
import { localStorageProxy } from '../../utils/localStorageProxy';

const UserSecurity: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    passwordCurrent: '',
    passwordNew: '',
    passwordNewConfirm: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    setPassword({
      ...password,
      [key]: event.target.value,
    });
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      password: password.passwordNew,
      passwordConfirm: password.passwordNew,
      passwordCurrent: password.passwordCurrent,
    };
    const resource = 'users/updatePassword';
    const response = await Axios({
      url: resource,
      method: 'PATCH',
      data: body,
    });

    setPassword({
      passwordCurrent: '',
      passwordNew: '',
      passwordNewConfirm: '',
    });

    const { token } = response.data;

    localStorageProxy.setItem('authtoken', token);
  };
  const { passwordNew, passwordCurrent, passwordNewConfirm } = password;
  const handleShowClick = () => setShowPassword(!showPassword);

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
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Current Password'
                name='passwordCurrent'
                value={passwordCurrent}
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
                name='passwordNew'
                value={passwordNew}
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
                name='passwordNewConfirm'
                value={passwordNewConfirm}
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
