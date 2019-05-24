/**
 * @fileoverview Users Entities Reducer
 */
import { Reducer } from 'redux';

import { RootAction } from '../../actions';
import mergeEntities from '../../mergeEntities';
import { IUser } from '../../../models/User';

import isSuccessAction from '../../isSuccessAction';
import { Omit } from '../../../types';

interface UserEntity extends Omit<IUser, 'roles'> {
  roles?: string;
}

interface UserEntities {
  [key: string]: UserEntity;
}

type State = UserEntities;

const initialState = {};

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  if (isSuccessAction(action)) {
    const { users } = action.payload.entities;
    if (users) {
      return mergeEntities<State>(state, users);
    }
  }
  return state;
};

export default reducer;
