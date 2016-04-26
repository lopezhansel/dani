import React from 'react';
import {Router,browserHistory  } from 'react-router';
import ReactDOM from 'react-dom';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
// let history = createBrowserHistory();

ReactDOM.render(<Router history={browserHistory } >{routes}</Router>, document.getElementById('app'));
