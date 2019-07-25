import {
  FETCH_ARTICLES,
  STORE_ARTICLES,
  ARTICLES_LOADING,
  ARTICLES_LOAD_FAILED,
  ARTICLES_LOAD_COMPLETE,
  FETCH_FLITERED_ARTICLES,
  STORE_FLITERED_ARTICLES,
  CLEAR_FLITERED_ARTICLES
} from './home';
import NetWorkState from '../constants/NetWorkState';
import { SET_COUNTRY_CODE } from './settings';

export const fetchArticles = () => {
  return {
    type: FETCH_ARTICLES
  };
};

export const storeArticles = articles => {
  return {
    type: STORE_ARTICLES,
    articles
  };
};

export const articlesNetworkStateChange = articlesNetworkState => {
  switch (articlesNetworkState) {
    case NetWorkState.LOADING:
      return {
        type: ARTICLES_LOADING
      };

    case NetWorkState.ERROR:
      return {
        type: ARTICLES_LOAD_FAILED
      };

    case NetWorkState.COMPLETE:
      return {
        type: ARTICLES_LOAD_COMPLETE
      };
  }
};

export const fetchFilteredArticles = query => {
  return {
    type: FETCH_FLITERED_ARTICLES,
    query
  };
};

export const storeFilteredArticles = articles => {
  return {
    type: STORE_FLITERED_ARTICLES,
    articles
  };
};

export const clearFilteredArticles = () => {
  return {
    type: CLEAR_FLITERED_ARTICLES
  };
};

export const setCountryCode = code => {
  return {
    type: SET_COUNTRY_CODE,
    code
  };
};
