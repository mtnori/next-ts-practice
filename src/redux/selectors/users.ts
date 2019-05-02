import { createSelector } from 'reselect';
import { List } from 'immutable';

import { StateMap } from '../State';
import usersEntities from './entities/users';
import rolesEntities from './entities/roles';

import User from '../models/User';
import Role from '../models/Role';

const getResult = (state: StateMap) => state.get('users').toList();

const getUsersResult = createSelector(
  getResult,
  usersEntities.getUsers,
  rolesEntities.getRoles,
  (result, users, roles) => {
    return result.map(entityId => {
      const user = users[entityId];
      const roleList = (user.roles || []).map((roleId: string) => {
        const role = roles[roleId];
        return Role.makeRole(role);
      });
      return User.makeUser({
        ...user,
        roles: List(roleList)
      });
    });
  }
);

export default {
  getUsersResult
};
