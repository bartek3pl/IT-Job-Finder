import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App';
import initialState from './store/filter/initialState';
import './index.scss';

const store = configureStore(initialState);

const container = document.getElementById('container');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
