import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { articlesNetworkStateChange, storeArticles } from '../actions';
import NetWorkState from '../constants/NetWorkState';

export function* fetchArticles() {
  yield put(articlesNetworkStateChange(NetWorkState.LOADING));
  try {
    const res = yield call(
      axios.get,
      'https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=9b64bcfe576047ba8e5bb7fd24c9e526'
    );
    yield put(storeArticles(res.data.articles));
    yield put(articlesNetworkStateChange(NetWorkState.COMPLETE));
  } catch (error) {
    console.log('error fetching data', error);
    yield put(articlesNetworkStateChange(NetWorkState.ERROR));
  }
}
