import { Map } from 'immutable';
import * as users from '../constants/users';

const initialState = Map({});

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case users.FETCH_SUCCESS:
      return state.merge(action.payload);
    default:
      return state;
  }
};
export default reducer;
