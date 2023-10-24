import React, { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Flex,
  Stack,
  FormControl,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ImUser } from 'react-icons/im';
import { EmailIcon } from '@chakra-ui/icons';

import useAPI from '../../hooks/useAPI';
import Loading from '../../components/app-state/Loading';
import { useActionsBind } from '../../hooks/useActionsBind';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ShowError from '../app-state/ShowError';

const UserProfile: FC = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
  });
  const { updatedUserProfile } = useActionsBind();
  const { loading: loadingUpdateUserAPI } = useTypedSelector(
    (reduxStore) => reduxStore.auth
  );
  const { response, error, loading } = useAPI({
    resource: 'users/me',
  });
  const buttonSize = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
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

    setUserProfile({
      ...userProfile,
      [key]: event.target.value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Todo A function to check whether name and email changed ?
    updatedUserProfile(name, email);
  };

  if (loading || loadingUpdateUserAPI) {
    return (
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        h='100vh'
      >
        <Loading />
      </Flex>
    );
  }

  if (error) {
    const { data } = error;
    const errorData = JSON.stringify(data);

    return <ShowError error={errorData} />;
  }
  if (response) {
    return (
      <Flex
        p='3'
        pt={['6rem', '7rem', '8rem', '9rem', '10rem', '12rem']}
        h={'100vh'}
        flexDirection='column'
      >
        <Stack
          spacing={4}
          p={['1rem', '1rem', '1rem', '2rem', '2rem', '2rem']}
          backgroundColor='white'
        >
          <Avatar
            name='Gauravi '
            src='https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          />
        </Stack>
        <form onSubmit={onSubmit}>
          <Stack
            spacing={4}
            p={['1rem', '1rem', '1rem', '2rem', '2rem', '2rem']}
            backgroundColor='white'
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  top={'50%'}
                  transform={'translate(0%,-50%)'}
                  pointerEvents='none'
                >
                  <ImUser color='black' />
                </InputLeftElement>
                <Input
                  type='text'
                  placeholder='User Name'
                  name='name'
                  value={name}
                  py={[4, 4, 4, 6, 6, 8]}
                  fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
                  onChange={(e) => onChange(e)}
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
                    color='black'
                  />
                </InputLeftElement>
                <Input
                  type='email'
                  placeholder='User Email'
                  name='email'
                  value={email}
                  py={[4, 4, 4, 6, 6, 8]}
                  fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
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
              size={buttonSize}
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
