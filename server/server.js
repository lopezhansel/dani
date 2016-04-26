import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import  swig from 'swig';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

process.env.NODE_ENV = 'production';
process.env.UV_THREADPOOL_SIZE=100;

import React from 'react';
import ReactDOM from 'react-dom/server';
let Router = require('react-router');
let routes = require('../app/routes');

var app = express();

const compiler = webpack(webpackConfig);
// I'm Using Gulp To Watch and Compile, Since I want to combine gulp-nodemon & browser-sync/live-reload
app.use(webpackDevMiddleware(compiler, { noInfo: true} ));
app.use(webpackHotMiddleware(compiler));

app.set('port', process.env.PORT || 2000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('app/views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found');
    }
  });
});
console.log(app.get('env'));
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
