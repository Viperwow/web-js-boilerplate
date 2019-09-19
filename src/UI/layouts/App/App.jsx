import React from 'react';
import {
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import {getHistory} from 'src/helpers/history';
import Layout from 'src/UI/layouts/Layout';

const App = () => (
  <Router history={getHistory()}>
    <Switch>
      <Route path="/" render={Layout} />
    </Switch>
  </Router>
);

export default App;
