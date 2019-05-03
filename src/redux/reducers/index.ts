import { combineReducers } from 'redux-immutable';
import entities from './entities';

import companies from './companies';
import users from './users';

const rootReducer = combineReducers({
  companies,
  users,
  entities
});

export default rootReducer;
