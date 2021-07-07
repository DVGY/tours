import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { Divider, Flex, Center } from '@chakra-ui/react';

import UserSettings from './UserSettings';
import UserProfile from './UserProfile';
import NotFound from '../../components/not-found/NotFound';
import UserMenuLink from './UserMenuLink';
import UserSecurity from './UserSecurity';

const UserMenu: FC = () => {
  const location = useLocation();
  const history = useHistory();

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
