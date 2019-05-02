import { combineReducers } from 'redux-immutable';
import users from './users';
import roles from './roles';

const entities = combineReducers({
  users,
  roles
});

export default entities;
