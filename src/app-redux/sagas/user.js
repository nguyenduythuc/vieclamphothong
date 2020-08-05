/**
 * @flow
 */

import {delay} from 'redux-saga/effects';

export function* test() {
  yield delay(300);
  console.log('test');
}
