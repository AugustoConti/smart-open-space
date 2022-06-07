import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { grommet, Grommet } from 'grommet';

import { AuthProvider } from '#helpers/useAuth';

import EditOpenSpace from './EditOpenSpace';
import EditTalk from './EditTalk';
import Home from './Home';
import Login from './Login';
import MainLayout from './MainLayout';
import MyTalks from './MyTalks';
import OpenSpace from './OpenSpace';
import OSProjector from './OSProjector';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';
import Schedule from './OpenSpace/schedule/Schedule';

const Routes = () => (
  <Switch>
    <Route path="/os/:id/projector" exact component={OSProjector} />
    <Route path="/os/:id/myTalks" exact component={MyTalks} />
    <Route path="/newTalk/:id" exact component={EditTalk} />
    <Route path="/os/:id/editTalk/:talkId" exact component={EditTalk} />
    <Route path={['/new', '/edit/:id']} exact component={EditOpenSpace} />
    <Route path="/os/:id/schedule" exact component={Schedule} />
    <Route path="/os/:id" exact component={OpenSpace} />
    <Route path={['/login', '/register']} exact component={Login} />
    <Route path="/" exact component={Home} />
    {/* <Route component={Page404} /> */}
  </Switch>
);

const App = () => (
  <Grommet full theme={grommet}>
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <MainLayout header={<Route path="/" component={Header} />}>
            <Routes />
          </MainLayout>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  </Grommet>
);

export default App;
