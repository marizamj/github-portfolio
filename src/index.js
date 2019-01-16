import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/index.css';
import App from './containers/App';

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route exact path="/:userName" component={App} />
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById('root')
);
