import { all } from 'redux-saga/effects';
import users from './users';

function* rootSaga() {
  yield all([...users]);
}
export default rootSaga;
