import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const consoleMessages: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const { filterReducers } = store.getState();

  console.groupCollapsed(`dispatching action => ${action.type}`);

  console.log('%c filterReducers', 'font-weight: bold', filterReducers);

  console.groupEnd();

  return result;
};

export default (rootInitialState = {}) =>
  applyMiddleware(thunk, consoleMessages)(createStore)(
    rootReducer,
    rootInitialState
  );
