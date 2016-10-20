import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import NewClient from './components/NewClient';
import CheckClient from './components/CheckClient';


render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage} />
      <Route path="newClient" component={NewClient} />
      <Route path="oneClientInfo" component={CheckClient} />
    </Route>
  </Router>,
  document.getElementById('root')
);
