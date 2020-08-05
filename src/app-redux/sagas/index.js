import {all, takeLatest} from 'redux-saga/effects';
import types from '../types';
import {test} from './user';

export default function* rootSaga() {
  yield all([takeLatest(types.TEST, test)]);
}
