/**
 * @fileoverview Users Entities Reducer
 */
import { Reducer } from 'redux';

import { RootAction } from '../../actions';
import { NormalizedData } from '../../NormalizedData';
import mergeEntities from '../../mergeEntities';
import { IUser } from '../../../models/User';

interface UserEntity extends IUser {}
interface UserEntities {
  [key: string]: UserEntity;
}

type State = UserEntities;

const initialState = {};

type SuccessAction = { payload: NormalizedData };

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  // UnionTypeのままだとpayloadを見つけられないのでType assertionを使う
  if (
    (action as SuccessAction).payload &&
    (action as SuccessAction).payload.entities
  ) {
    const { users } = (action as SuccessAction).payload.entities;
    if (users) {
      return mergeEntities<State>(state, users);
    }
  }
  return state;
};

export default reducer;
