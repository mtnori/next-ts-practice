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

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  // UnionTypeのままだとpayloadを見つけられないのでType assertionを使う
  if (
    (<{ payload: NormalizedData }>action).payload &&
    (<{ payload: NormalizedData }>action).payload.entities
  ) {
    const { users } = (<{ payload: NormalizedData }>action).payload.entities;
    if (users) {
      return mergeEntities<State>(state, users);
    }
  }
  return state;
};

export default reducer;
