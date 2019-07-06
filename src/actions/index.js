import {
  FETCH_ARTICLES,
  STORE_ARTICLES,
  ARTICLES_LOADING,
  ARTICLES_LOAD_FAILED,
  ARTICLES_LOAD_COMPLETE
} from './home';
import NetWorkState from '../constants/NetWorkState';

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
