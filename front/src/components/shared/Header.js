import React, { useContext } from 'react';

import { Box, Button, Menu, ResponsiveContext, Text } from 'grommet';
import { FormDown, Menu as MenuIcon, Run } from 'grommet-icons';
import PropTypes from 'prop-types';

import RowBetween from './RowBetween';
import { useAuth } from '../../helpers/useAuth';

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

const Header = ({ history }) => {
  const size = useContext(ResponsiveContext);
  const { getUser, logout } = useAuth();
  const user = getUser();
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

  return (
    <RowBetween as="header" fill>
      <Box>
        <Button
          hoverIndicator
          label={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Text color="light-1" size="large">
              Smart Open Space
            </Text>
          }
          onClick={() => history.push('/')}
          plain
        />
      </Box>
      {isLogged ? (
        <Menu plain items={menuItems} size="medium">
          {({ drop, hover }) => {
            // eslint-disable-next-line no-nested-ternary
            const color = hover && !drop ? 'accent-1' : !drop ? 'light-2' : '';
            return size === 'small' ? (
              <SmallMenu color={color} />
            ) : (
              <LargeMenu color={color} name={user.name} />
            );
          }}
        </Menu>
      ) : (
        <Button label="Ingresar" onClick={() => history.push('/login')} />
      )}
    </RowBetween>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
