import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App';
import './index.scss';

const container = document.getElementById('container');

ReactDOM.render(<App />, container);
