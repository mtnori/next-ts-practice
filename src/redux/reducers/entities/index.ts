/**
 * @fileoverview Entities reducer
 */
import { combineReducers } from 'redux';

import users from './users';
import roles from './roles';

const entitiesReducer = combineReducers({
  users,
  roles
});

export default entitiesReducer;

export type EntitiesState = ReturnType<typeof entitiesReducer>;
