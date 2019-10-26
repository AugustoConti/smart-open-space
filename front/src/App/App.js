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

const App = () => (
  <Grommet full theme={grommet}>
    <Router>
      <AuthProvider>
        <MainLayout>
          <Switch>
            <Route path="/os/:id/projector" exact component={OSProjector} />
            <Route path="/os/:id/myTalks" exact component={MyTalks} />
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
