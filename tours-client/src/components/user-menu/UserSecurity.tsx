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
  useBreakpointValue,
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
  const buttonSize = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
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
        <Stack
          spacing={4}
          p={['1rem', '1rem', '1rem', '2rem', '2rem', '2rem']}
          backgroundColor='white'
        >
          <Text>Update Password </Text>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                top={'50%'}
                transform={'translate(0%,-50%)'}
                pointerEvents='none'
              >
                <LockIcon
                  fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                  color='black'
                />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Current Password'
                name='passwordCurrent'
                py={[4, 4, 4, 6, 6, 8]}
                fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                value={passwordCurrent}
                onChange={onChange}
              />
              <InputRightElement
                top={'50%'}
                transform={'translate(0%,-50%)'}
                width={'4.5rem'}
              >
                <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                  {showPassword ? (
                    <ViewOffIcon
                      fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                      color='black'
                    />
                  ) : (
                    <ViewIcon
                      fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                      color='black'
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
                  color='black'
                />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='New Password'
                name='passwordNew'
                py={[4, 4, 4, 6, 6, 8]}
                fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                value={passwordNew}
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
                      color='black'
                    />
                  ) : (
                    <ViewIcon
                      fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                      color='black'
                    />
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
              <InputLeftElement
                top={'50%'}
                transform={'translate(0%,-50%)'}
                pointerEvents='none'
                color='gray.300'
              >
                <LockIcon
                  fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                  color='black'
                />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirm New Password'
                name='passwordNewConfirm'
                py={[4, 4, 4, 6, 6, 8]}
                fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                value={passwordNewConfirm}
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
                      color='black'
                    />
                  ) : (
                    <ViewIcon
                      fontSize={['xs', 'xs', 'xs', 'md', 'xl', 'xl']}
                      color='black'
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
            Update Password
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default UserSecurity;
