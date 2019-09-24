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

toast.configure();

const useMainLayout = () => {
  const size = useSize();

  const layoutSmall = {
    areas: [
      { name: 'header', start: [0, 0], end: [0, 0] },
      { name: 'main', start: [0, 1], end: [0, 1] },
    ],
    columns: ['flex'],
    pad: { horizontal: 'medium' },
  };

  const layoutLarge = {
    areas: [
      { name: 'headerBGL', start: [0, 0], end: [0, 0] },
      { name: 'header', start: [1, 0], end: [1, 0] },
      { name: 'headerBGR', start: [2, 0], end: [2, 0] },
      { name: 'main', start: [1, 1], end: [1, 1] },
    ],
    columns: ['flex', 'large', 'flex'],
    pad: undefined,
  };

  return size === 'small' ? layoutSmall : layoutLarge;
};

const MainLayout = ({ children }) => {
  const { areas, columns, pad } = useMainLayout();

  return (
    <Grid areas={areas} columns={columns} fill rows={['xxsmall', 'flex']}>
      <Box background="brand" gridArea="headerBGL" />
      <Box background="brand" gridArea="headerBGR" />
      <Box background="brand" gridArea="header" pad={pad}>
        <Route path="/" component={Header} />
      </Box>
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
            <Route path={['/newTalk/:id', '/editTalk/:id']} component={EditTalk} />
            <Route path={['/new', '/edit/:id']} component={EditOpenSpace} />
            <Route path="/os/:id" component={OpenSpace} />
            <Route path={['/login', '/register']} component={Login} />
            <Route path="/" exact component={Home} />
            {/* <Route component={Page404} /> */}
          </Switch>
        </MainLayout>
      </AuthProvider>
    </Router>
  </Grommet>
);

export default App;
