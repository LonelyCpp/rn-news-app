import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  articlesNetworkStateChange,
  storeArticles,
  storeFilteredArticles
} from '../actions';
import NetWorkState from '../constants/NetWorkState';

export function* fetchFilteredArticles(action) {
  yield put(articlesNetworkStateChange(NetWorkState.LOADING));
  try {
    const res = yield call(
      axios.get,
      `https://newsapi.org/v2/everything?q=${
        action.query
      }&from=2019-07-14&to=2019-07-14&sortBy=popularity&apiKey=9b64bcfe576047ba8e5bb7fd24c9e526`
    );
    yield put(storeFilteredArticles(res.data.articles));
    yield put(articlesNetworkStateChange(NetWorkState.COMPLETE));
  } catch (error) {
    console.log('error fetching data', error);
    yield put(articlesNetworkStateChange(NetWorkState.ERROR));
  }
}
