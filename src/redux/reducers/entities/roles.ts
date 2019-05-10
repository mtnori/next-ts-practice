import { Role } from '../../../models/Role';

export interface RoleEntity extends Role {}

export interface RoleEntities {
  [key: string]: RoleEntity;
}

const initialState = {};

const merge = (state: RoleEntities, action: any): RoleEntities => {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.roles) {
    return payload.entities.roles;
  }
  return state;
};

const reducer = (
  state: RoleEntities = initialState,
  action: any
): RoleEntities => {
  return merge(state, action);
};
export default reducer;
