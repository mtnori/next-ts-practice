/**
 * @fileoverview Users Saga
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { FETCH } from '../constants/users';
import { fetchSuccess, fetchFailure } from '../actions/users';
import * as API from '../../api/users';
import schemas from '../schemas';

function* index() {
  // ユーザー一覧の取得
  const { payload, error } = yield call(API.getUsers);

  console.log('fire!!');

  if (payload && !error) {
    const normalizedData = normalize(payload, [schemas.user]);
    // 成功のアクションを発行
    yield put(fetchSuccess(normalizedData));
  } else {
    // 失敗のアクションを発行
    yield put(fetchFailure(error));
  }
}

// FETCHが実行されるたびにindexタスクを起動する
const saga = [takeEvery(FETCH, index)];
export default saga;
