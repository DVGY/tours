import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Flex,
  Stack,
  FormControl,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { ImUser } from 'react-icons/im';
import { EmailIcon } from '@chakra-ui/icons';
import useAPI from '../../hooks/useAPI';
import Loading from '../../components/app-state/Loading';

const UserProfile: FC = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
  });

  const { response, error, loading } = useAPI({
    resource: '/users/me',
  });

  useEffect(() => {
    if (response) {
      const { users } = response.data;
      setUserProfile({
        name: users.name,
        email: users.email,
      });
    }
  }, [response]);

  const { name, email } = userProfile;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    console.log(event.target.value, event.target.name);
    setUserProfile({
      ...userProfile,
      [key]: event.target.value,
    });
  };
  const onSubmit = () => {
    console.log('');
  };

  if (loading) {
    <Loading />;
  }

  if (error) {
    // Show Error Component
    return <Box>Some Error Occured</Box>;
  }
  if (response) {
    return (
      <Flex p='3' flexDirection='column'>
        <Stack spacing={4} p='1rem' backgroundColor='white'>
          <Avatar
            name='Gauravi '
            src='https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          />
        </Stack>
        <form onSubmit={onSubmit}>
          <Stack spacing={4} p='1rem' backgroundColor='white'>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <ImUser color='black' />
                </InputLeftElement>
                <Input
                  type='text'
                  placeholder='User Name'
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <EmailIcon color='black' />
                </InputLeftElement>
                <Input
                  type='email'
                  placeholder='User Email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
              </InputGroup>
            </FormControl>

            <Button
              borderRadius={0}
              type='submit'
              variant='solid'
              colorScheme='teal'
              width='full'
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Flex>
    );
  }
  return null;
};

export default UserProfile;
