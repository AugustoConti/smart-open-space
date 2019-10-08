import React from 'react';

import { Box, Button, Menu, Text, Image } from 'grommet';
import { FormDown, Menu as MenuIcon, Run } from 'grommet-icons';
import PropTypes from 'prop-types';

import logo from '#assets/logo.svg';
import MyProps from '#helpers/MyProps';
import useAuth, { useUser } from '#helpers/useAuth';
import useSize from '#helpers/useSize';
import Row from './Row';
import RowBetween from './RowBetween';

const SmallMenu = ({ color }) => (
  <Box pad="medium">
    <MenuIcon color={color} />
  </Box>
);
SmallMenu.propTypes = { color: PropTypes.string.isRequired };

const LargeMenu = ({ color, name, pad }) => (
  <Row gap="xsmall" pad={pad}>
    <Text color={color}>{name}</Text>
    <FormDown color={color} />
  </Row>
);
LargeMenu.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pad: PropTypes.string.isRequired,
};

const LogoSmall = () => (
  <Box height="xxsmall" width="xxsmall" round="large" pad="xxsmall" background="accent-1">
    <Image fit="contain" src={logo} />
  </Box>
);

const HomeButton = ({ onClick }) => {
  const size = useSize();
  return (
    <Button fill="vertical" hoverIndicator onClick={onClick} plain>
      <RowBetween pad="xxsmall" fill="vertical">
        <LogoSmall />
        {size !== 'small' && (
          <Text color="light-1" size="xlarge" margin={{ left: 'xsmall' }}>
            Smart-OS
          </Text>
        )}
      </RowBetween>
    </Button>
  );
};
HomeButton.propTypes = { onClick: PropTypes.func.isRequired };

const MyMenu = ({ history, user }) => {
  const size = useSize();
  const { logout } = useAuth();
  const menuItems = [
    // {
    //   label: 'Help',
    //   onClick: () => {
    //     history.push('/');
    //   },
    // },
    {
      label: (
        <Row pad={size === 'small' ? 'medium' : 'xsmall'}>
          <Run color="status-critical" />
          Salir
        </Row>
      ),
      onClick: () => logout().then(() => history.push('/login')),
    },
  ];
  return (
    <Menu plain items={menuItems} size="medium">
      {({ drop, hover }) => {
        // eslint-disable-next-line no-nested-ternary
        const color = hover && !drop ? 'accent-1' : !drop ? 'light-2' : '';
        return size === 'small' && !drop ? (
          <SmallMenu color={color} />
        ) : (
          <LargeMenu
            color={color}
            name={user.name}
            pad={size === 'small' ? 'medium' : 'small'}
          />
        );
      }}
    </Menu>
  );
};
MyMenu.propTypes = {
  history: MyProps.history,
  user: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

const Header = ({ history, location: { pathname } }) => {
  const user = useUser();
  const isLogged = !!user;
  const inLogin = pathname === '/login';
  return (
    <RowBetween as="header" fill>
      <HomeButton onClick={() => history.push('/')} />
      {isLogged ? (
        <MyMenu history={history} user={user} />
      ) : (
        !inLogin && <Button label="Ingresar" onClick={() => history.push('/login')} />
      )}
    </RowBetween>
  );
};
Header.propTypes = { history: MyProps.history, location: MyProps.location };

export default Header;
