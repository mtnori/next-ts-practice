/**
 * @fileoverview FetchStatus reducer
 */
import { combineReducers } from 'redux';

import users from './users';

const fetchStatusReducer = combineReducers({
  users
});

export default fetchStatusReducer;

export type FetchStatusState = ReturnType<typeof fetchStatusReducer>;
