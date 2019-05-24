/**
 * @fileoverview Roles Entities Reducer
 */
import { Reducer } from 'redux';

import { RootAction } from '../../actions';
import mergeEntities from '../../mergeEntities';
import { IRole } from '../../../models/Role';

import isSuccessAction from '../../isSuccessAction';
import { Omit } from '../../../types';

interface RoleEntity extends Omit<IRole, 'users'> {
  users?: string[];
}
interface RoleEntities {
  [key: string]: RoleEntity;
}

type State = RoleEntities;

const initialState = {};

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  if (isSuccessAction(action)) {
    const { roles } = action.payload.entities;
    if (roles) {
      return mergeEntities<State>(state, roles);
    }
  }
  return state;
};

export default reducer;
