/**
 * @fileoverview Root reducer
 */
import { combineReducers } from 'redux';

import users from './users';
import entities from './entities';
import fetchStatus from './fetchStatus';
import initialDatas from './initialDatas';

const rootReducer = combineReducers({
  users,
  entities,
  fetchStatus,
  initialDatas
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
