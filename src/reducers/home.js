import {
  ARTICLES_LOADING,
  ARTICLES_LOAD_COMPLETE,
  ARTICLES_LOAD_FAILED,
  STORE_ARTICLES,
  STORE_FLITERED_ARTICLES,
  CLEAR_FLITERED_ARTICLES
} from '../actions/home';
import { NetWorkState } from '../constants';

const INITIAL_STATE = {
  networkState: NetWorkState.EMPTY,
  articles: [],
  filteredAtricles: []
};

export const homeReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case ARTICLES_LOADING:
      return {
        ...state,
        networkState: NetWorkState.LOADING
      };
    case ARTICLES_LOAD_COMPLETE:
      return {
        ...state,
        networkState: NetWorkState.COMPLETE
      };
    case STORE_ARTICLES:
      return {
        ...state,
        articles: action.articles
      };
    case ARTICLES_LOAD_FAILED:
      return {
        ...state,
        networkState: NetWorkState.ERROR
      };
    case STORE_FLITERED_ARTICLES:
      return {
        ...state,
        filteredAtricles: action.articles
      };
    case CLEAR_FLITERED_ARTICLES:
      return {
        ...state,
        filteredAtricles: []
      };
  }

  return state;
};
