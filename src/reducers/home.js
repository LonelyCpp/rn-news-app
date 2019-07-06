import { INCREMENT_COUNT, DECREMENT_COUNT } from '../actions/home';
import { NetWorkState } from '../constants';

const INITIAL_STATE = {
  networkState: NetWorkState.EMPTY,
  articles: []
};

export const homeReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return INITIAL_STATE;
  }
};
