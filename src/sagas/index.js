import { takeLatest } from 'redux-saga/effects';
import { FETCH_ARTICLES } from '../actions/home';
import { fetchArticles } from './fetchArticles';

export default function* rootSaga() {
  yield takeLatest(FETCH_ARTICLES, fetchArticles);
}
