import { Map } from 'immutable';

const initialState = Map({});

const merge = (state: Map<string, any>, action: any) => {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.users) {
    return state.mergeDeep(payload.entities.users);
  }
  return state;
};

const reducer = (state: Map<string, any> = initialState, action: any) => {
  return merge(state, action);
};
export default reducer;
