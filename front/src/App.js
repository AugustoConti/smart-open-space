import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { grommet, Grommet } from 'grommet';

import EditOpenSpace from './components/EditOpenSpace';
import Home from './components/Home';

const App = () => (
  <Grommet full theme={grommet} style={{ backgroundColor: 'hsl(24, 20%, 95%)' }}>
    <Router>
      <Switch>
        <Route path={['/new', '/edit/:id']} component={EditOpenSpace} />
        <Route path="/" exact component={Home} />
        {/* <Route component={Page404} /> */}
      </Switch>
    </Router>
  </Grommet>
);

export default App;
