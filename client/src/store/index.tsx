import { createStore, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@store/rootReducer';

const consoleMessages: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const {} = store.getState();

  console.groupCollapsed(`dispatching action => ${action.type}`);

  // console.log('%c userReducers', 'font-weight: bold', userReducers);

  console.groupEnd();

  return result;
};

export default (rootInitialState = {}) =>
  applyMiddleware(thunk, consoleMessages)(createStore)(
    rootReducer,
    rootInitialState
  );
