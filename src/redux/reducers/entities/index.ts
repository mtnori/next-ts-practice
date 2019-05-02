import { combineReducers } from 'redux-immutable';
import users from './users';

const entities = combineReducers({
  users
});

export default entities;
