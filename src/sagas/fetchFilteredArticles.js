import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  articlesNetworkStateChange,
  storeArticles,
  storeFilteredArticles
} from '../actions';
import NetWorkState from '../constants/NetWorkState';
import { NewsApi } from '../api';

export function* fetchFilteredArticles(action) {
  yield put(articlesNetworkStateChange(NetWorkState.LOADING));
  try {
    api = new NewsApi();
    const res = yield call(api.searchHeadlines, action.query);
    yield put(storeFilteredArticles(res.data.articles));
    yield put(articlesNetworkStateChange(NetWorkState.COMPLETE));
  } catch (error) {
    console.log('error fetching data', error);
    yield put(articlesNetworkStateChange(NetWorkState.ERROR));
  }
}
