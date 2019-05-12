/**
 * @fileoverview Roles Entities Reducer
 */
import { Reducer } from 'redux';

import { RootAction } from '../../actions';
import { NormalizedData } from '../../NormalizedData';
import mergeEntities from '../../mergeEntities';
import { IRole } from '../../../models/Role';

interface RoleEntity extends IRole {}
interface RoleEntities {
  [key: string]: RoleEntity;
}

type State = RoleEntities;

const initialState = {};

type SuccessAction = { payload: NormalizedData };

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  console.log(action);
  // UnionTypeのままだとpayloadを見つけられないのでType assertionを使う
  if (
    (action as SuccessAction).payload &&
    (action as SuccessAction).payload.entities
  ) {
    const { roles } = (action as SuccessAction).payload.entities;
    if (roles) {
      console.log('merge roles entities');
      return mergeEntities<State>(state, roles);
    }
  }
  return state;
};

export default reducer;
