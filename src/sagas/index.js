import { takeLatest } from 'redux-saga/effects';
import { FETCH_ARTICLES, FETCH_FLITERED_ARTICLES } from '../actions/home';
import { fetchArticles } from './fetchArticles';
import { fetchFilteredArticles } from './fetchFilteredArticles';

export default function* rootSaga() {
  yield takeLatest(FETCH_ARTICLES, fetchArticles);
  yield takeLatest(FETCH_FLITERED_ARTICLES, fetchFilteredArticles);
}
