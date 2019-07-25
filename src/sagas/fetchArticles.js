import { call, put, select } from 'redux-saga/effects';
import { articlesNetworkStateChange, storeArticles } from '../actions';
import NetWorkState from '../constants/NetWorkState';
import { NewsApi } from '../api';

export function* fetchArticles() {
  const store = yield select();
  yield put(articlesNetworkStateChange(NetWorkState.LOADING));
  try {
    api = new NewsApi();
    const res = yield call(api.getTopHeadlines, store.settings.countryCode);
    yield put(storeArticles(res.data.articles));
    yield put(articlesNetworkStateChange(NetWorkState.COMPLETE));
  } catch (error) {
    console.log('error fetching data', error);
    yield put(articlesNetworkStateChange(NetWorkState.ERROR));
  }
}
