import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Divider, Flex, Center } from '@chakra-ui/react';

import UserSettings from '../../components/user-menu/UserSettings';
import UserProfile from '../../components/user-menu/UserProfile';

import UserMenuLink from '../../components/user-menu/UserMenuLink';
import UserSecurity from '../../components/user-menu/UserSecurity';

const UserMenu: FC = () => {
  return (
    <Flex
      marginTop={[16, 16, 16, 20, 20, 20]}
      py={[10, 10, 10, 16, 20, 20]}
      justifyContent={[
        'center',
        'center',
        'center',
        'inherit',
        'inherit',
        'inherit',
      ]}
    >
      <UserMenuLink />
      <Center
        width='5%'
        display={['none', 'none', 'none', 'inherit', 'inherit', 'inherit']}
      >
        <Divider orientation='vertical' />
      </Center>
      {/* <Route exact path='/user'></Route>  */}
      <Routes>
        <Route path='/user/profile'>
          <UserProfile />
        </Route>
        <Route path='/user/security'>
          <UserSecurity />
        </Route>

        <Route path='/user/settings'>
          <UserSettings />
        </Route>
        {/* <Route>
          <NotFound />
        </Route> */}
      </Routes>
    </Flex>
  );
};

export default UserMenu;
