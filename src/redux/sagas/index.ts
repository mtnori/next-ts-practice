import { all } from 'redux-saga/effects';
import users, { createTask } from './users';

function* rootSaga() {
  yield all([...users, createTask]);
}
export default rootSaga;
