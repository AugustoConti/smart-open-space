import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { Box, Grid, grommet, Grommet } from 'grommet';
import PropTypes from 'prop-types';

import { AuthProvider } from './helpers/useAuth';
import EditOpenSpace from './components/EditOpenSpace';
import Header from './components/shared/Header';
import Home from './components/Home';
import Login from './components/Login';
import OpenSpace from './components/OpenSpace';
import EditTalk from './components/EditTalk';
import useSize from './helpers/useSize';
import MyTalks from './components/MyTalks';

toast.configure();

const layoutSmall = {
  areas: [['header'], ['main']],
  columns: ['flex'],
  pad: { horizontal: 'medium' },
};

const layoutMedium = {
  areas: [['headerL', 'header', 'headerR'], ['l', 'main', 'r']],
  columns: ['flex', 'large', 'flex'],
  pad: undefined,
};

const layoutLarge = {
  ...layoutMedium,
  columns: ['flex', 'xlarge', 'flex'],
};

const useMainLayout = () => {
  const size = useSize();
  // eslint-disable-next-line no-nested-ternary
  return size === 'small' ? layoutSmall : size === 'medium' ? layoutMedium : layoutLarge;
};

const BoxBrand = ({ children, ...props }) => (
  <Box background="brand" {...props}>
    {children}
  </Box>
);

BoxBrand.defaultProps = { children: [] };

BoxBrand.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const MainLayout = ({ children }) => {
  const { areas, columns, pad } = useMainLayout();

  return (
    <Grid areas={areas} columns={columns} fill rows={['xxsmall', 'flex']}>
      <BoxBrand gridArea="headerL" />
      <BoxBrand gridArea="headerR" />
      <BoxBrand gridArea="header" pad={pad}>
        <Route path="/" component={Header} />
      </BoxBrand>
      <Box gridArea="main" pad={pad}>
        <div>{children}</div>
      </Box>
    </Grid>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

const App = () => (
  <Grommet full theme={grommet} style={{ backgroundColor: 'hsl(24, 20%, 95%)' }}>
    <Router>
      <AuthProvider>
        <MainLayout>
          <Switch>
            <Route path="/os/:id/mis-charlas" exact component={MyTalks} />
            <Route path={['/newTalk/:id', '/editTalk/:id']} exact component={EditTalk} />
            <Route path={['/new', '/edit/:id']} exact component={EditOpenSpace} />
            <Route path="/os/:id" exact component={OpenSpace} />
            <Route path={['/login', '/register']} exact component={Login} />
            <Route path="/" exact component={Home} />
            {/* <Route component={Page404} /> */}
          </Switch>
        </MainLayout>
      </AuthProvider>
    </Router>
  </Grommet>
);

export default App;
