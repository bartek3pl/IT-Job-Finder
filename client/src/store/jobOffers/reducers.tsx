import { Action } from 'redux';
import C from './constants';
import initialState from './initialState';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    /*
    case C.OPEN_NOTIFICATION:
      return {
        ...state,
        opened: true,
      };
    */
    default:
      return state;
  }
};
