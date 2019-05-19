/**
 * @fileoverview Users Result reducer
 */
import { Reducer } from 'redux';

import { FETCH_SUCCESS, CREATE_SUCCESS } from '../constants/users';
import mergeResult from '../mergeResult';
import { RootAction } from '../actions';

type State = string[];
const initialState = [] as string[];

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
    case CREATE_SUCCESS:
      return mergeResult(state, action.payload.result);
    default: {
      return state;
    }
  }
};

export default reducer;
