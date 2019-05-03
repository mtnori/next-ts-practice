import { combineReducers } from 'redux-immutable';

import companies from './companies';
import users from './users';
import roles from './roles';

const entities = combineReducers({
  companies,
  users,
  roles
});

export default entities;
