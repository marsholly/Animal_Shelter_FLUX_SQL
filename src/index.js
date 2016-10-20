import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import NewClient from './components/NewClient';
import NewAnimal from './components/NewAnimal';
import CheckClient from './components/CheckClient';
import CheckAnimal from './components/CheckAnimal';
import ClientsList from './components/ClientsList';


render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage} />
      <Route path="newClient" component={NewClient} />
      <Route path="newAnimal" component={NewAnimal} />
      <Route path="oneClientInfo" component={CheckClient} />
      <Route path="newAnimalInfo" component={CheckAnimal} />
      <Route path="allClient" component={ClientsList} />
    </Route>
  </Router>,
  document.getElementById('root')
);
