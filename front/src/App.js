import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { Box, Grid, grommet, Grommet } from 'grommet';

import EditOpenSpace from '#components/EditOpenSpace';
import Home from '#components/Home';
import Login from '#components/Login';
import OpenSpace from '#components/OpenSpace';
import EditTalk from '#components/EditTalk';
import MyTalks from '#components/MyTalks';
import MyProps from '#helpers/MyProps';
import { AuthProvider } from '#helpers/useAuth';
import useSize from '#helpers/useSize';
import Header from '#shared/Header';

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
BoxBrand.propTypes = { children: MyProps.children };

const MainLayout = ({ children }) => {
  const { areas, columns, pad } = useMainLayout();
  return (
    <Box fill background="light-3" overflow="auto">
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
    </Box>
  );
};
MainLayout.propTypes = { children: MyProps.children.isRequired };

const App = () => (
  <Grommet full theme={grommet}>
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
