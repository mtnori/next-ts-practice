/**
 * @fileoverview Users Saga
 */
import { call, put, takeEvery } from 'redux-saga/effects';

import { FETCH } from '../constants/users';
import { fetchSuccess, fetchFailure } from '../actions/users';
import * as API from '../../api/users';

function* index() {
  // ユーザー一覧の取得
  const { payload, error } = yield call(API.getUsers);

  if (payload && !error) {
    // 成功のアクションを発行
    yield put(fetchSuccess(payload));
  } else {
    // 失敗のアクションを発行
    yield put(fetchFailure(error));
  }
}

// FETCHが実行されるたびにindexタスクを起動する
const saga = [takeEvery(FETCH, index)];
export default saga;
