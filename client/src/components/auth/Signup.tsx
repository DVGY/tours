import { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Stack,
  InputLeftElement,
  Box,
  Text,
  InputRightElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, LockIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Link as ReactRouterLink,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { InputControl, SubmitButton } from 'react-hook-form-chakra';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useActionsBind } from '../../hooks/useActionsBind';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ShowError from '../app-state/ShowError';

const defaultValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

// We're using yup validation for this demo but you can choose any other react hook form supported validation provider
const validationSchema = Yup.object({
  username: Yup.string(),
  email: Yup.string(),
  password: Yup.string(),
  passwordConfirm: Yup.string(),
});

interface FormData {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

const Signup = (): JSX.Element => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { signupUser } = useActionsBind();
  const { loading, isAuthenticated, error } = useTypedSelector(
    (reduxStore) => reduxStore.auth
  );
  const { state } = useLocation();
  const navigate = useNavigate();
  const buttonSize = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
  });

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const redirectTo = state ? state.from.pathname : state;

      navigate(redirectTo ?? '/trips');
    }
  }, [isAuthenticated, navigate, loading, state]);

  const handleShowClick = () => setShowPassword(!showPassword);

  const onSubmit = async ({
    email,
    username,
    password,
    passwordConfirm,
  }: FormData) => {
    console.log(email, username, password, passwordConfirm);

    if (!email || !username || !password || !passwordConfirm) {
      return;
    }

    signupUser(username, email, password, passwordConfirm);
  };

  return (
    <Flex
      flexDirection='column'
      height='100vh'
      width={'100%'}
      backgroundColor='gray.200'
      justifyContent='start'
      alignItems='center'
      marginTop={[16, 16, 16, 20, 20, 20]}
      marginBottom={[16, 16, 16, 20, 20, 20]}
      py={4}
      as='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack flexDir='column' width={'40%'}>
        <Box>
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
              Sign Up
            </Text>
            <InputControl
              name='username'
              inputProps={{
                placeholder: 'Username',
                type: 'text',
                isRequired: true,
              }}
              control={control}
              fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
              leftElement={
                <InputLeftElement
                  top={'50%'}
                  transform={'translate(0%,-50%)'}
                  pointerEvents='none'
                >
                  <FiUser stroke='#38B2AC' fill='#38B2AC' />
                </InputLeftElement>
              }
            />
            <InputControl
              name='email'
              inputProps={{
                placeholder: 'Email',
                type: 'email',
                isRequired: true,
              }}
              control={control}
              fontSize={['sm', 'sm', 'lg', 'lg', 'xl', '2xl']}
              leftElement={
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
              }
            />

            <InputControl
              name='password'
              inputProps={{
                type: showPassword ? 'text' : 'password',
                placeholder: 'Password',
                minLength: 8,
              }}
              isRequired={true}
              control={control}
              fontSize={['xs', 'xs', 'xs', 'md', 'xl', '2xl']}
              rightElement={
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
              }
              leftElement={
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
              }
            />
            <InputControl
              name='passwordConfirm'
              inputProps={{
                type: showPassword ? 'text' : 'password',
                placeholder: 'Confirm Password',
                minLength: 8,
              }}
              isRequired={true}
              control={control}
              fontSize={['xs', 'xs', 'xs', 'md', 'xl', '2xl']}
              rightElement={
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
              }
              leftElement={
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
              }
            />
            <SubmitButton
              variant='solid'
              colorScheme='teal'
              width='full'
              borderRadius={0}
              size={buttonSize}
              control={control}
            >
              SIGN UP
            </SubmitButton>
            {error && <ShowError {...error} />}
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
              <ReactRouterLink to='/login'>
                <Text
                  as='u'
                  color='teal.400'
                  fontSize={['xs', 'xs', 'xs', 'md', 'md', 'md']}
                >
                  Login
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
              variant='solid'
              onClick={() => {
                setFormData({
                  ...formData,
                  email: 'guest-session@gmail.com',
                  password: 'guest1234',
                });
              }}
              colorScheme='teal'
              width='full'
              size={buttonSize}
            >
              GUEST LOGIN
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
