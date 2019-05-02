import { Map } from 'immutable';

const initialState = Map({});

const merge = (state: Map<string, any>, action: any) => {
  const { payload } = action;
  if (payload && payload.entities && payload.entities.roles) {
    return state.mergeDeep(payload.entities.roles);
  }
  return state;
};

const reducer = (state: Map<string, any> = initialState, action: any) => {
  return merge(state, action);
};
export default reducer;
