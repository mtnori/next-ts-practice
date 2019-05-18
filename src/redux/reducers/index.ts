/**
 * @fileoverview Root reducer
 */
import { combineReducers } from 'redux';

import users from './users';
import entities from './entities';
import fetchStatus from './fetchStatus';

const rootReducer = combineReducers({
  users,
  entities,
  fetchStatus
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
