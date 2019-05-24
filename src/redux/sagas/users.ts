/**
 * @fileoverview Users Saga
 */
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { FETCH, CREATE } from '../constants/users';
import {
  fetchSuccess,
  fetchFailure,
  create,
  createSuccess,
  createFailure
} from '../actions/users';
import * as API from '../../api/users';
import schemas from '../schemas';

function* indexTask() {
  try {
    // ユーザー一覧の取得
    const response = yield call(API.getUsers);
    const normalizedData = normalize(response, [schemas.user]);
    // 成功のアクションを発行
    yield put(fetchSuccess(normalizedData));
  } catch (error) {
    // 失敗のアクションを発行
    yield put(fetchFailure(error));
  }
}

export function* createTask() {
  while (true) {
    const action: ReturnType<typeof create> = yield take(CREATE);
    try {
      // ユーザーの登録
      const response = yield call(
        API.createUser,
        action.payload,
        action.meta.token
      );
      const normalizedData = normalize(response, schemas.user);
      // 成功のアクションを発行
      yield put(createSuccess(normalizedData));
    } catch (error) {
      // 失敗のアクションを発行
      yield put(createFailure(error));
    }
  }
}

// FETCHが実行されるたびにindexタスクを起動する
const saga = [takeEvery(FETCH, indexTask), takeEvery(CREATE, createTask)];
export default saga;
