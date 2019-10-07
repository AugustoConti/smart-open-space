import React from 'react';

import { Box, Button, Menu, Text, Image } from 'grommet';
import { FormDown, Menu as MenuIcon, Run } from 'grommet-icons';
import PropTypes from 'prop-types';

import RowBetween from './RowBetween';
import logo from '#assets/logo.svg';
import useAuth, { useUser } from '#helpers/useAuth';
import useSize from '#helpers/useSize';

const SmallMenu = ({ color }) => (
  <Box direction="row" pad="medium" justify="end">
    <MenuIcon color={color} />
  </Box>
);
SmallMenu.propTypes = { color: PropTypes.string.isRequired };

const LargeMenu = ({ color, name, pad }) => (
  <Box direction="row" gap="xsmall" pad={pad}>
    <Text color={color}>{name}</Text>
    <FormDown color={color} />
  </Box>
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

const MyMenu = ({ history, location: { pathname } }) => {
  const size = useSize();
  const { logout } = useAuth();
  const user = useUser();
  const isLogged = !!user;
  const inLogin = pathname === '/login';
  const menuItems = [
    // {
    //   label: 'Help',
    //   onClick: () => {
    //     history.push('/');
    //   },
    // },
    {
      label: (
        <Box
          alignSelf="center"
          direction="row"
          pad={size === 'small' ? 'medium' : 'xsmall'}
        >
          <Run color="status-critical" />
          Salir
        </Box>
      ),
      onClick: () => logout().then(() => history.push('/login')),
    },
  ];
  return isLogged ? (
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
  ) : (
    !inLogin && <Button label="Ingresar" onClick={() => history.push('/login')} />
  );
};
MyMenu.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

const Header = ({ history, location }) => (
  <RowBetween as="header" fill>
    <HomeButton onClick={() => history.push('/')} />
    <MyMenu history={history} location={location} />
  </RowBetween>
);
Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape().isRequired,
};

export default Header;
