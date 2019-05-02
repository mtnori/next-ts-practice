import { combineReducers } from 'redux-immutable';
import entities from './entities';
import users from './users';

const rootReducer = combineReducers({
  users,
  entities
});

export default rootReducer;
