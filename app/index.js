import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './Login';
import Success from './Success';
import { requiredAuth } from './authentication';

render(
  <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/success" component={Success} onEnter={requiredAuth}/>
  </Router>, document.getElementById('app')
)
