/**
 * @fileoverview Users FetchStatus Reducer
 */
import { Reducer } from 'redux';

import { RootAction } from '../../actions';
import { FETCH_SUCCESS } from '../../constants/users';

interface State {
  submitting: boolean;
}

const initialState = {
  submitting: false
};

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return Object.assign({
        ...state,
        submitting: true
      });
    default:
      return state;
  }
};

export default reducer;
