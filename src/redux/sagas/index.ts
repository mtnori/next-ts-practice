import { all, call, takeEvery, select } from 'redux-saga/effects';
import users, { createTask } from './users';

function* logger() {
  yield takeEvery('*', function* loggerTask(action) {
    const store = yield select();
    console.log('action:', JSON.stringify(action));
    if (process.browser) {
      console.log('store:', store);
    }
  });
}

function* rootSaga() {
  yield all([...users, createTask, call(logger)]);
}
export default rootSaga;
