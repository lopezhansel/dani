import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/about' component={About} />
  </Route>
);