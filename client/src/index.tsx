import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';
import './index.scss';

const store = configureStore();

const container = document.getElementById('container');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
