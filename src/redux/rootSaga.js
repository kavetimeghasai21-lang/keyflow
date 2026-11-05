import { all } from 'redux-saga/effects';
import { typingSaga } from './typingSaga';

export default function* rootSaga() {
  yield all([
    typingSaga(),
  ]);
}