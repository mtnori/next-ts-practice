import { User } from '../../models/User';
import { Omit } from '../../../types';

export interface UserEntity extends Omit<User, 'roles'> {
  roles: string[];
}

export interface UserEntities {
  [key: string]: UserEntity;
}

const initialState = {};

const merge = (state: UserEntities, action: any): UserEntities => {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.users) {
    return payload.entities.users;
  }
  return state;
};

const reducer = (
  state: UserEntities = initialState,
  action: any
): UserEntities => {
  return merge(state, action);
};
export default reducer;
