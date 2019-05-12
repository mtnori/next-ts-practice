/**
 * @fileoverview Root reducer
 */
import { combineReducers } from 'redux';

import users from './users';
import entities from './entities';

const rootReducer = combineReducers({
  users,
  entities
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
