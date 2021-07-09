import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Divider, Flex, Center } from '@chakra-ui/react';

import UserSettings from '../../components/user-menu/UserSettings';
import UserProfile from '../../components/user-menu/UserProfile';

import UserMenuLink from '../../components/user-menu/UserMenuLink';
import UserSecurity from '../../components/user-menu/UserSecurity';

const UserMenu: FC = () => {
  return (
    <Flex marginTop={20}>
      <UserMenuLink />
      <Center width='5%'>
        <Divider orientation='vertical' />
      </Center>
      {/* <Route exact path='/user'></Route>  */}
      <Switch>
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
      </Switch>
    </Flex>
  );
};

export default UserMenu;
