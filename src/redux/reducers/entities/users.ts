import { Reducer } from 'redux';

import { RootAction } from '../../actions';
import { NormalizedData } from '../../NormalizedData';
import mergeEntities from '../../mergeEntities';
import { User } from '../../../models/User';

interface UserEntity extends User {}
interface UserEntities {
  [key: string]: UserEntity;
}

type State = UserEntities;

const initialState = {};

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  if ((<{ payload: NormalizedData }>action).payload) {
    return mergeEntities<State>(
      state,
      (<{ payload: NormalizedData }>action).payload.entities.users
    );
  }
  return state;
};

export default reducer;
