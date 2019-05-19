/**
 * @fileoverview Users FetchStatus Reducer
 */
import { Reducer } from 'redux';

import { RootAction } from '../../actions';
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CREATE,
  CREATE_SUCCESS,
  CREATE_FAILURE
} from '../../constants/users';

interface State {
  loaded: boolean;
  loading: boolean;
  saved: boolean;
  saving: boolean;
}

const initialState = {
  loaded: false,
  loading: false,
  saved: false,
  saving: false
};

const reducer: Reducer<State, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return Object.assign({
        ...state,
        loading: true
      });
    case FETCH_SUCCESS:
      return Object.assign({
        ...state,
        loaded: true,
        loading: false
      });
    case FETCH_FAILURE:
      return Object.assign({
        ...state,
        loaded: false,
        loading: false
      });
    case CREATE:
      return Object.assign({
        ...state,
        saving: true
      });
    case CREATE_SUCCESS:
      return Object.assign({
        ...state,
        saved: true,
        saving: false
      });
    case CREATE_FAILURE:
      return Object.assign({
        ...state,
        saved: false,
        saving: false
      });
    default:
      return state;
  }
};

export default reducer;
