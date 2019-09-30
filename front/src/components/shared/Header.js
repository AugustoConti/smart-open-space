import React from 'react';

import { Box, Button, Menu, Text, Image } from 'grommet';
import { FormDown, Menu as MenuIcon, Run } from 'grommet-icons';
import PropTypes from 'prop-types';

import RowBetween from './RowBetween';
import useAuth, { useUser } from '#helpers/useAuth';
import useSize from '#helpers/useSize';

import logo from '#assets/logo.svg';

const SmallMenu = ({ color }) => (
  <Box direction="row" pad="medium" justify="end">
    <MenuIcon color={color} />
  </Box>
);
SmallMenu.propTypes = { color: PropTypes.string.isRequired };

const LargeMenu = ({ color, name = '' }) => (
  <Box direction="row" gap="xsmall" pad="small">
    <Text color={color}>{name}</Text>
    <FormDown color={color} />
  </Box>
);
LargeMenu.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const LogoSmall = () => (
  <Box height="xxsmall" width="xxsmall" round="small" pad="xxsmall" background="accent-1">
    <Image fit="cover" src={logo} />
  </Box>
);

const Header = ({ history }) => {
  const size = useSize();
  const { logout } = useAuth();
  const user = useUser();
  const isLogged = !!user;
  const menuItems = [
    // {
    //   label: 'Help',
    //   onClick: () => {
    //     history.push('/');
    //   },
    // },
    {
      label: (
        <Box alignSelf="center" pad={size === 'small' ? 'medium' : 'xsmall'}>
          Salir
        </Box>
      ),
      icon: (
        <Box alignSelf="center">
          <Run color="status-critical" />
        </Box>
      ),
      onClick: () => {
        logout().then(() => history.push('/login'));
      },
    },
  ];

  const ButtonHome = () => (
    <Button
      fill="vertical"
      hoverIndicator
      label={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <RowBetween pad="xxsmall" fill="vertical">
          <LogoSmall />
          {size !== 'small' && (
            <Text color="light-1" size="xlarge" margin={{ left: 'xsmall' }}>
              Smart-OS
            </Text>
          )}
        </RowBetween>
      }
      onClick={() => history.push('/')}
      plain
    />
  );

  const MyMenu = () =>
    isLogged ? (
      <Menu plain items={menuItems} size="medium">
        {({ drop, hover }) => {
          // eslint-disable-next-line no-nested-ternary
          const color = hover && !drop ? 'accent-1' : !drop ? 'light-2' : '';
          return size === 'small' && !drop ? (
            <SmallMenu color={color} />
          ) : (
            <LargeMenu color={color} name={user.name} />
          );
        }}
      </Menu>
    ) : (
      <Button label="Ingresar" onClick={() => history.push('/login')} />
    );

  return (
    <RowBetween as="header" fill>
      <ButtonHome />
      <MyMenu />
    </RowBetween>
  );
};

Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Header;
